/**
 * temporary script for converting the old table to a bibtex file
 *
 * run from project root with `node scripts/csv-to-bibtex.js`
 *
 * TODO:
 * - [ ] parse bibtex into something we can work with, maybe use https://github.com/digitalheir/bibtex-js
 * - [ ] integrate urls, date, key into bibtex
 * - [ ] insert doi, abstract *if missing*
 * - [ ] remove this script after the migration is done
 * - [ ] remove the old table
 */



import { createReadStream, readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs'
import csv from 'fast-csv'
import { publicationSheet, pageUrl, pageTitle, memberConfig } from '../config.js'
import pkg from 'bibtex-tidy'
const { tidy } = pkg


// /**
//  * Formats bibtex for more beautiful and uniform display
//  *
//  * @see https://github.com/FlamingTempura/bibtex-tidy
//  * @param {string} key pub key (for debugging logs)
//  * @param {string} bibtexString bibtex string
//  */
// function formatBibtex(key, bibtexString) {
//     try {
//         const formatted = tidy(bibtexString, {
//             omit: ['address', 'location', 'isbn', 'timestamp'],
//             curly: true,
//             space: 4,
//             align: 13,
//             stripEnclosingBraces: true,
//             sortFields: true,
//             removeEmptyFields: true,
//             lowercase: true
//         })
//         return formatted.bibtex
//     } catch (e) {
//         // console.log(e);
//         console.warn(`Invalid bibtex for pub with key ${key}`)
//         console.log(bibtexString)
//         return bibtexString
//     }
// }

// Main loop
const publications = []
const stream = createReadStream(publicationSheet)
csv
    .parseStream(stream, { headers: true })
    .on('data', data => data.Title !== '' && publications.push(data))
    .on('end', createBibTex)

/**
 * Creates all HTML pages
*/
async function createBibTex() {
    const completeBibtex = []
    console.log(`${publications.length} publications`)
    // Sort by date descending, so newest at top of page
    publications.sort((a, b) => a.Date > b.Date ? -1 : 1).map(pub => {

        // get data from csv
        let bibString = pub['bibtex'] || ''
        const key = pub['Key (e.g. for file names)']
        const title = pub['Title']
        const year = pub.Date.slice(0, 4)
        const month = pub.Date.slice(6, 7)
        const url1 = pub['Publisher URL (official)']
        const url2 = pub['url2']
        const venue = pub['Submission Target']
        const notes = pub['notes']
        const abstract = pub['abstract']
        const doi = url1.includes('doi.org') ? url1 : ''

        // create full bibtex
        // console.log(bibString)

        // TODO: handle missing bibtex
        if (!bibString) {
            console.warn(`Missing bibtex for pub with key ${key} and title ${title}`)
            bibString = `\n% AUTO-CREATED BIBTEX FOR PUB WITH TITLE ${title}\n`
            bibString += `\n% ADAPT CITATION TYPE AND CHECK ALL FIELDS ${title}\n`
            bibString += `@misc{${key},\n  year=${year}`
            const authors = [
                ...pub['First Author'].split(',').map(d => d.trim()).filter(d => d.length),
                ...pub['Other Authors'].split(',').map(d => d.trim()).filter(d => d.length)
            ]
            bibString += `\n  author=${authors.join(', ')}`
        } else {
            // fix key
            const oldKey = bibString.substring(bibString.indexOf('{') + 1, bibString.indexOf(','))
            bibString = bibString.replace(oldKey, key)

            bibString = bibString.substring(0, bibString.lastIndexOf('}'))
        }

        if (doi) {
            bibString += `\n  doi = {${doi}},`
        }
        bibString += `\n  month = {${month}},`
        if (url2 || (url1 && !doi)) {
            bibString += `\n  url = {${url2 ?? url1}},`
        }
        if (notes) {
            bibString += `\n  note = {${notes}},`
        }
        bibString += `\n  series = {${venue}},`
        // TODO: check if abstract already in bibtex
        bibString += `\n  abstract = {${abstract}},`
        bibString += `\n}\n\n\n`
        console.log(bibString)
        // const bibtex = formatBibtex(pub.Key, bibString)
        // console.log(bibtex)

        completeBibtex.push(bibString)
    })
    writeFileSync('./temp_bibtex.bib', completeBibtex.join('\n\n'), 'utf8')
    console.log('Bibtex file created: temp_bibtex.bib')
}
