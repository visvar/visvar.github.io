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
        if (!file.includes('.')) {
            // Subdirectory or at least no image file
            continue;
        }
        console.log(file);
        try {
            const image = await Image.load(path.join(directory, file));
            const processed = image.resize({
                width: targetWidth,
                // Does not work-.-
                // interpolation: 'bilinear',
            });

            const w = processed.width;
            const h = processed.height;
            const factor = image.width / targetWidth;

            for (let x = 0; x < w; x++) {
                for (let y = 0; y < h; y++) {
                    const xOrig = x * factor;
                    const yOrig = y * factor;
                    const x1 = Math.floor(xOrig);
                    const x2 = Math.ceil(xOrig);
                    const y1 = Math.floor(yOrig);
                    const y2 = Math.ceil(yOrig);

                    const q11 = image.getPixelXY(x1, y1);
                    const q12 = image.getPixelXY(x1, y2);
                    const q21 = image.getPixelXY(x2, y1);
                    const q22 = image.getPixelXY(x2, y2);

                    // Interpolate seperately for RGBA
                    const interpolated = [0, 0, 0, 0];
                    for (let i = 0; i < 4; i++) {
                        const result = bilinearInterpolation(
                            xOrig, yOrig,
                            x1, x2,
                            y1, y2,
                            q11[i], q12[i], q21[i], q22[i]
                        );
                        interpolated[i] = Math.round(result);
                    }

                    // console.log(interpolated);
                    processed.setPixelXY(x, y, interpolated);
                }
            }

            processed.save(path.join(directory, 'small', file));
        } catch (error) {
            console.log('Error:');
            console.log(error.message);
        }
    }
}


// Linear interpolation
// https://en.wikipedia.org/wiki/Bilinear_interpolation
function bilinearInterpolation(x, y, x1, x2, y1, y2, q11, q12, q21, q22) {
    let f_xy1, f_xy2;
    if (x1 === x2) {
        f_xy1 = q11;
        f_xy2 = q22;
    } else {
        const dx = x2 - x1;
        f_xy1 = (x2 - x) / dx * q11 + (x - x1) / dx * q21;
        f_xy2 = (x2 - x) / dx * q12 + (x - x1) / dx * q22;
    }
    let f_xy;
    if (y1 === y2) {
        f_xy = f_xy1;
    } else {
        const dy = y2 - y1;
        f_xy = (y2 - y) / dy * f_xy1 + (y - y1) / dy * f_xy2;
    }
    return f_xy;
}

// Test with example from Wikipedia
// console.log(bilinearInterpolation(14.5, 20.2, 14, 15, 20, 21, 91, 162, 210, 95));
