import { readdirSync } from 'fs'
import path from 'path'
import { Image } from 'image-js'


convert()

async function convert() {
    console.log('image-to-png.js')
    const files = readdirSync('./assets/img/teaser')
    for (const file of files) {
        if (file === 'small') {
            continue
        }
        if (file.endsWith('.png')) {
            continue
        }
        console.log(file)
        try {
            const baseName = file.slice(0, file.lastIndexOf('.'))
            const image = await Image.load(path.join('assets/img', file))
            image.save(path.join('img', `${baseName}.png`))
        } catch (error) {
            console.log(error.message)
        }
    }
}
