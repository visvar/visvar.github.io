import { readdirSync } from 'fs';
import path from 'path';
import { Image } from 'image-js';


// TODO: for better quality, maybe implement a low level interpolation based on https://github.com/hughsk/bicubic
// TODO: or use opencv.js?
// https://docs.opencv.org/3.4/dc/de6/tutorial_js_nodejs.html
// https://stackoverflow.com/questions/62641640/image-resize-interpolation-with-pure-javascript




if (process.argv.length !== 4) {
    console.error('No directory or targetWidth argument given, run program as "node image-resizer.js ./dir 64" for rescaling images in ./dir to 64px');
    console.log(process.argv);
    process.exit(1);
}


const directory = process.argv[2];
const targetWidth = +process.argv[3];

rescale(directory, targetWidth);

async function rescale(directory, targetWidth) {
    console.log(`image-resizer.js, dir=${directory} width=${targetWidth}`);
    const files = readdirSync(directory);
    for (const file of files) {
        if (file === 'small') {
            // THis is the subdirectory "directory/small/"
            continue;
        }
        console.log(file);
        try {
            const image = await Image.load(path.join(directory, file));
            const processed = image.resize({
                width: targetWidth,
                // interpolation: 'bilinear',
            });
            processed.save(path.join(directory, 'small', file));
        } catch (error) {
            console.log('Error:');
            console.log(error.message);
        }
    }
}
