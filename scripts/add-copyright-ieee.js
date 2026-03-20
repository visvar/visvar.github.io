import fs from 'fs';
import path from 'path';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';

const copyrightText = "© XXXX IEEE. Personal use of this material is permitted. Permission from IEEE must be obtained for all other uses, in any current or future media, including reprinting/republishing this material for advertising or promotional purposes, creating new collective works, for resale or redistribution to servers or lists, or reuse of any copyrighted component of this work in other works.";
const pdfPath = "./assets/pdf/";

/**
 * Adds a copyright note to the first page of a PDF and saves it.
 * Skips modification if the note is already present.
 * @param {string} inputPath - Path to the original PDF.
 * @param {string} year - The year to insert into the copyright text.
 */
async function addIEEECopyrightToPDF(inputPath, year) {
    console.log("Adding IEEE copyright note to " + path.basename(inputPath) + " year " + year);

    const existingPdfBytes = fs.readFileSync(inputPath);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    const { width, height } = firstPage.getSize();
    const fontSize = 8;
    const margin = 20;
    const maxWidth = width - 2 * margin;

    const lines = wrapText(copyrightText.replace("XXXX", year), font, fontSize, maxWidth);

    let y = height - margin - fontSize;
    for (const line of lines) {
        firstPage.drawText(line, {
            x: margin,
            y,
            size: fontSize,
            font,
            color: rgb(0, 0, 0),
        });
        y -= fontSize + 2;
    }

    const modifiedPdfBytes = await pdfDoc.save();
    fs.writeFileSync(inputPath, modifiedPdfBytes);
    console.log(path.basename(inputPath) + ' saved');
}

/**
 * Splits a long string into lines that fit within a given width.
 */
function wrapText(text, font, fontSize, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let line = '';

    for (const word of words) {
        const testLine = line ? `${line} ${word}` : word;
        const testWidth = font.widthOfTextAtSize(testLine, fontSize);
        if (testWidth <= maxWidth) {
            line = testLine;
        } else {
            lines.push(line);
            line = word;
        }
    }

    if (line) lines.push(line);
    return lines;
}

async function copyrightNoticeMissing(pdfPath, searchText) {
    try {
        const data = fs.readFileSync(pdfPath);
        const uint8Array = new Uint8Array(data);

        // In Node.js legacy build, we disable the worker for simplicity
        const loadingTask = pdfjs.getDocument({
            data: uint8Array,
            standardFontDataUrl: './node_modules/pdfjs-dist/standard_fonts/',
            verbosity: 0
        });

        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);
        const textContent = await page.getTextContent();

        let fullText = textContent.items.map(item => item.str).join(' ');
        fullText = fullText
            .replace(/\r?\n|\r/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();

        if (fullText.toLowerCase().includes(searchText.toLowerCase())) {
            console.log('Error: PDF already includes the copyright notice.');
            process.exit();
        }

    } catch (error) {
        console.error('PDF Error:', error.message);
        process.exit();
    }
}

function doesFileExist(filePath) {
    try {
        fs.readFileSync(filePath);
    } catch (err) {
        console.log('Error: PDF file does not exist: ' + filePath);
        process.exit();
    }
}

async function main(args) {
    let year = 0;

    if (args[0]) {
        if (args[0].match(/\d{4}/)) {
            year = args[0].match(/\d{4}/)[0]
        } else if (!args[1] || !args[1].match(/^\d{4}$/)) {
            console.log('Error: If the citation key does not include a year, you need to pass it as a second argument in the form of a 4-digit number.');
            process.exit();
        } else {
            year = args[1].match(/^\d{4}$/)[0]
        }
    } else {
        console.log('Error: Please supply a citation key.');
        process.exit();
    }

    let filePath = path.join(pdfPath, args[0]) + '.pdf';

    doesFileExist(filePath)
    await copyrightNoticeMissing(filePath, copyrightText.substring(13))

    addIEEECopyrightToPDF(filePath, year);
}

main(process.argv.slice(2));