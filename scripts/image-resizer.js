import { readdirSync } from 'fs';
import path from 'path';
import { Image } from 'image-js';

const TARGET_WIDTH = 256;

rescale();

async function rescale() {
    const files = readdirSync('./img');
    for (const file of files) {
        if (file === 'small') {
            continue;
        }
        console.log(file);
        try {
            const image = await Image.load(path.join('img', file));
            const processed = image.resize({
                width: TARGET_WIDTH,
                interpolation: 'bilinear',
            });
            processed.save(path.join('img', 'small', file));
        } catch (error) {
            console.log(error.message);
        }
    }
}
