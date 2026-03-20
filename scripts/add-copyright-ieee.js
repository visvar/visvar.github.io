import fs from 'fs';
import path from 'path';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

const copyrightText = "© XXXX IEEE. Personal use of this material is permitted. Permission from IEEE must be obtained for all other uses, in any current or future media, including reprinting/republishing this material for advertising or promotional purposes, creating new collective works, for resale or redistribution to servers or lists, or reuse of any copyrighted component of this work in other works.";
const pathToPDFs = "./assets/pdf/";

/**
 * Adds a copyright note to the first page of a PDF and saves it.
 * Skips modification if the note is already present.
 * @param {string} inputPath - Path to the original PDF.
 * @param {string} outputPath - Path to save the modified PDF.
 * @param {string} copyrightText - The copyright note to add.
 * @param {string} year - The year to insert into the copyright text.
 */
async function addIEEECopyrightToPDF(inputPath, copyrightNotice) {
    try {
        const existingPdfBytes = fs.readFileSync(inputPath);    
    } catch (err) {
        console.log("Error: PDF file does not exist: " + inputPath);
        process.exit();
    }
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    const { width, height } = firstPage.getSize();
    const fontSize = 8;
    const margin = 20;
    const maxWidth = width - 2 * margin;

    const lines = wrapText(copyrightNotice, font, fontSize, maxWidth);

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
    console.log(`PDF saved`);
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

function main(args) {
    console.log("Adding IEEE copyright note to " + args[0] + " year " + args[1]);

    if (!args[1]) {
        console.log('Error: two arguments needed: citation key and publication year');
        process.exit();
    } else if (!args[1].match(/[0-9][0-9][0-9][0-9]/)) {
        console.log('Error: year needs to be a 4 digit number');
        process.exit();
    }

    const newText = copyrightText.replace("XXXX", args[1]);
    addIEEECopyrightToPDF(path.join(pathToPDFs, args[0]) + ".pdf", newText);
}

main(process.argv.slice(2));