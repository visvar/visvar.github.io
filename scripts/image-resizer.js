import { readdirSync } from 'fs'
import path from 'path'
import { readSync, writeSync } from 'image-js'


// Using alpha of image-js to able to use interpolation
// See https://github.com/image-js/image-js/issues/496#issuecomment-583258046
// https://github.com/image-js/image-js/issues/496#issuecomment-583483759

if (process.argv.length !== 4) {
  console.error('No directory or targetWidth argument given, run program as "node image-resizer.js ./dir 64" for rescaling images in ./dir to 64px')
  console.log(process.argv)
  process.exit(1)
}

const directory = process.argv[2]
const targetWidth = +process.argv[3]

rescale(directory, targetWidth)

async function rescale (directory, targetWidth) {
  console.log(`image-resizer.js, dir=${directory} width=${targetWidth}`)
  const files = readdirSync(directory)
  let noChange = 0
  for (const file of files) {
    if (!file.includes('.') || file.endsWith('.svg')) {
      // Subdirectory or at least no image file
      continue
    }
    try {
      const image = await readSync(path.join(directory, file))
      let processed
      if (image.width <= targetWidth) {
        // Only make smaller, not larger
        // console.log(`  image width ${image.width} <= target width ${targetWidth}, copying`)
        processed = image
      } else {
        processed = image.resize({
          width: targetWidth,
          interpolation: 'BICUBIC',
        })
      }
      // Compare to old one and do not overwrite if identical
      const outPath = path.join(directory, 'small', file)
      try {
        const old = await readSync(outPath)
        if (processed.data.length === old.data.length) {
          let identical = true
          for (let i = 0; i < processed.data.length; i++) {
            if (processed.data[i] !== old.data[i]) {
              identical = false
              break
            }
          }
          if (identical) {
            // console.log("  no change, skipping")
            noChange++
            continue
          }
        }
      } catch {
        // Doesn't matter, just write the image in case checking for identical fails
      }
      writeSync(outPath, processed)
    } catch (error) {
      console.log(`Error with ${file}:`)
      console.log(error.message)
    }
  }
}
