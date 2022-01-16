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
    for (const file of files) {
        if (!file.includes('.') || file.endsWith('.svg')) {
            // Subdirectory or at least no image file
            continue
        }
        console.log(file)
        try {
            const image = await readSync(path.join(directory, file))
            const processed = image.resize({
                width: targetWidth,
                interpolation: 'BICUBIC',
            })
            const outPath = path.join(directory, 'small', file)
            writeSync(outPath, processed)
        } catch (error) {
            console.log('Error:')
            console.log(error.message)
        }
    }
}
