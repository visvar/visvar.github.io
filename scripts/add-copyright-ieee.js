import fs from 'fs';
import path from 'path';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

const copyrightText = "© 20XX IEEE.  Personal use of this material is permitted.  Permission from IEEE must be obtained for all other uses, in any current or future media, including reprinting/republishing this material for advertising or promotional purposes, creating new collective works, for resale or redistribution to servers or lists, or reuse of any copyrighted component of this work in other works.";

export async function handleIEEECopyright(path, year) {
    const newText = copyrightText.replace("20XX", year);
    if (!(await isCopyrightPresent(path, newText))) {
        console.log("Adding IEEE copyright note to "+path);
        await addCopyrightToPDF(path, newText);
    }
    else {
        // console.log("Copyright note already existing");
    }
}


/**
 * Checks if the copyright note has already been added to the PDF
 * by inspecting the document's title metadata.
 * @param {string} inputPath - Path to the PDF file.
 * @returns {Promise<boolean>} - True if the note is already present.
 */
async function isCopyrightPresent(inputPath) {
    const existingPdfBytes = fs.readFileSync(inputPath);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const subject = pdfDoc.getSubject();
    return subject === 'ieee-copyright-added';
}


/**
 * Adds a copyright note to the first page of a PDF and saves it.
 * Skips modification if the note is already present.
 * @param {string} inputPath - Path to the original PDF.
 * @param {string} outputPath - Path to save the modified PDF.
 * @param {string} copyrightText - The copyright note to add.
 * @param {string} year - The year to insert into the copyright text.
 */
async function addCopyrightToPDF(inputPath, copyrightText, year) {
    const existingPdfBytes = fs.readFileSync(inputPath);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    const { width, height } = firstPage.getSize();
    const fontSize = 10;
    const margin = 20;
    const maxWidth = width - 2 * margin;

    const newText = copyrightText.replace("20XX", year);
    const lines = wrapText(newText, font, fontSize, maxWidth);

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

    // Set metadata flag
    pdfDoc.setSubject('ieee-copyright-added');

    const modifiedPdfBytes = await pdfDoc.save();
    fs.writeFileSync(inputPath, modifiedPdfBytes);
    console.log(`✅ PDF saved to ${inputPath}`);
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
