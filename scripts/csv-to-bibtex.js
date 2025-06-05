/**
 * temporary script for converting the old table to a bibtex file
 *
 * run from project root with `node scripts/csv-to-bibtex.js`
 *
 * TODO:
 * - [ ] remove this script after the migration is done
 * - [ ] remove the old table
 */



import { createReadStream, writeFileSync, unlink } from 'node:fs'
import csv from 'fast-csv'
import { publicationSheet } from '../config.js'
import pkg from 'bibtex-tidy'
const { tidy } = pkg
import bibtex from '@hygull/bibtex'

/**
 * Formats bibtex for more beautiful and uniform display
 *
 * @see https://github.com/FlamingTempura/bibtex-tidy
 * @param {string} bibtexString bibtex string
 */
function formatBibtex(bibtexString) {
    try {
        const formatted = tidy(bibtexString, {
            curly: true,
            space: 4,
            align: 14,
            stripEnclosingBraces: true,
            sortFields: true,
            removeEmptyFields: true,
            lowercase: true
        })
        return formatted.bibtex
    } catch (e) {
        console.warn('Invalid bibtex')
        throw e
    }
}

// Main loop
const publications = []
// create bib object
const bib = new bibtex();
const stream = createReadStream(publicationSheet)
csv
    .parseStream(stream, { headers: true })
    .on('data', data => data.Title !== '' && publications.push(data))
    .on('end', createBibTex)


async function createBibTex() {
    const completeBibtex = []
    console.log(`${publications.length} publications`)
    let count = 0
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
        const pdf = pub['PDF URL (public)']
        const venue = pub['Submission Target']
        const notes = pub['notes']
        const video = pub['Video']
        const video2 = pub['Video2']
        const suppl = pub['Supplemental']
        const acks = pub['Acknowledgements']
        const funding = pub['funding']
        const abstract = pub['Abstract']
        const doi = url1.includes('doi') ? url1 : ''

        // activate for easier tracking of conversion problems
        /*
        count += 1
        console.log()
        console.log(count)
        console.log(key)
        console.log(title)
        */

        // handle excel function-prevention-prefix
        if (bibString.startsWith("'")) {
            bibString = bibString.substring(1);
        }

        // write bibtex to temp file bc package wants it like that
        writeFileSync("tmp.bib", bibString)
        
        // convert bibtex text to object
        const bibArr = bib.getBibAsObject('tmp.bib');

        // fill bibtex
        bibArr['key'] = key
        bibArr['data']['author'] = pub['First Author'] + ', ' + pub['Other Authors']

        if (!bibArr['data']['title']) {
            bibArr['data']['title'] = title
        }

        if (!bibArr['data']['year']) {
            bibArr['data']['year'] = year
        }

        if (!bibArr['data']['month']) {
            bibArr['data']['month'] = month
        }

        if (doi) {
            bibArr['data']['doi'] = doi
        }

        if (bibArr['data']['doi']) {
            if (!bibArr['data']['doi'].includes('doi')) {
                console.log();
                console.log(title)
                console.log('has doi without link')
            }
        }
        // We have too many where no doi exists
        /*else {
            console.log();
            console.log(title)
            console.log('is missing a doi')
        }*/

        // Safe URLs only if they are not doi 
        if (url1 && !url1.includes('doi')) {
            bibArr['data']['url'] = url1
        }

        // Fill url before url2
        if (url2) {
            if (!url1 || url1.includes('doi')) {
                bibArr['data']['url'] = url2
            } else {
                bibArr['data']['url2'] = url2
            }

        }

        // Append custom notes to existing notes
        if (notes) {
            if (bibArr['data']['notes']) {
                console.log('notes already in ' + key)
                bibArr['data']['notes'] += '\n'
                bibArr['data']['notes'] += notes

            } else {
                bibArr['data']['notes'] = notes
            }
        }

        // Add our custom stuff

        if (video) {
            bibArr['data']['video'] = video
        }

        if (video2) {
            bibArr['data']['video2'] = video2
        }

        if (suppl) {
            bibArr['data']['suppl'] = suppl
        }

        if (acks) {
            bibArr['data']['acks'] = acks
        }

        if (funding) {
            bibArr['data']['funding'] = funding
        }

        if (pdf) {
            bibArr['data']['pdf'] = pdf
        }

        if (venue) {
            bibArr['data']['series'] = venue
        }

        if (abstract) {
            bibArr['data']['abstract'] = abstract
        }

        // try converting to catch error
        let bibCode = bib.getBibCodeFromObject(bibArr, 3);
        bibCode = formatBibtex(bibCode)

        completeBibtex.push(bibArr)
    })

    // Delete temporary bib file
    unlink('tmp.bib', (err) => {
        if (err) throw err;
    });

    // save json to check errors
    writeFileSync('./bibliography.json', JSON.stringify(completeBibtex, null, 4), 'utf8')

    // convert to bibtex string
    let bibCode = bib.getBibCodeFromObject(completeBibtex, 3)

    // format
    bibCode = formatBibtex(bibCode)
    
    // safe bibtex
    writeFileSync('./bibliography.bib', bibCode, 'utf8')
    //console.log(bibCode)    
}
