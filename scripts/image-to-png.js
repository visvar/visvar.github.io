import { readdirSync } from 'fs';
import path from 'path';
import { Image } from 'image-js';


rescale();

async function rescale() {
    console.log('image-to-png.js');
    const files = readdirSync('./img');
    for (const file of files) {
        if (file === 'small') {
            continue;
        }
        if (file.endsWith('.png')) {
            continue;
        }
        console.log(file);
        try {
            const baseName = file.slice(0, file.lastIndexOf('.'));
            const image = await Image.load(path.join('img', file));
            image.save(path.join('img', `${baseName}.png`));
        } catch (error) {
            console.log(error.message);
        }
    }
}
