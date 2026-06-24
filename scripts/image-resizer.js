import { mkdirSync, readFileSync, readdirSync, existsSync, writeFileSync } from "fs";
import path from 'path'
import crypto from 'crypto'
import { read, write } from 'image-js'

if (process.argv.length !== 4) {
  console.error('No directory or targetWidth argument given, run program as "node image-resizer.js ./dir 64" for rescaling images in ./dir to 64px')
  console.log(process.argv)
  process.exit(1)
}

const directory = process.argv[2]
const targetWidth = +process.argv[3]

await optimizeImagesFolder(directory, targetWidth);

// Helper to generate a file hash
function getFileHash(filePath) {
  const fileBuffer = readFileSync(filePath);
  return crypto.createHash('md5').update(fileBuffer).digest('hex');
}

async function optimizeImagesFolder(srcDir, targetWidth) {
  const destDir = path.join(directory, 'small')
  const manifestPath = path.join(destDir, 'images-manifest.json');

  // Ensure destination folder exists
  if (!existsSync(destDir)) {
    mkdirSync(destDir, { recursive: true });
  }

  // Load existing manifest or create a new one
  let manifest = {};
  if (existsSync(manifestPath)) {
    try {
      manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
    } catch (e) {
      console.warn("Malformed manifest found, resetting...");
    }
  }

  const files = readdirSync(srcDir);
  let manifestChanged = false;

  for (const file of files) {
    if (!/\.(jpg|jpeg|png|webp)$/i.test(file)) continue;

    const sourcePath = path.join(srcDir, file);
    const destPath = path.join(destDir, file);

    const currentHash = getFileHash(sourcePath);

    // Hash matches AND the reduced file exists
    if (manifest[file] === currentHash && existsSync(destPath)) {
      continue;
    }

    try {
      console.log(`[resizing] ${file}...`);

      const image = await read(sourcePath);
      let smallImage

      if (image.width <= targetWidth) {
        // Only make smaller, not larger
        smallImage = image
      } else {
        smallImage = image.resize({
          width: targetWidth,
          interpolation: 'BICUBIC',
        });
      }

      await write(destPath, smallImage);

      manifest[file] = currentHash;
      manifestChanged = true;
    } catch (err) {
      console.error(`Failed to process ${file}:`, err);
    }
  }

  // Update manifest if there are changes
  if (manifestChanged) {
    writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log(`[Image Optimization] Manifest updated.`);
  }
}