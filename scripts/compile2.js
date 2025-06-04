import { createReadStream, readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs'
import csv from 'fast-csv'
import QRCode from 'qrcode'
import { publicationSheet, pageUrl, pageTitle, memberConfig } from '../config.js'
import pkg from 'bibtex-tidy'
const { tidy } = pkg
import pkg2 from 'bibtex'
const { parseBibFile, normalizeFieldValue } = pkg2

// report missing info for publications
const REPORT_MISSING_INFO = false
// report when pdf is only given as link but not file
const REPORT_MISSING_PDF_FILES = false


/**
 * Generates the HTML <head> of a page
 * @param {string} title page title for <title>
 * @param {'.'|'..'} [path=.] either '.' for index.html or '..' for others
 * @returns {string} HTML code
*/
function htmlHead(title, path = '.') {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=100%, initial-scale=1">
    <title>${title}</title>
    <link rel="stylesheet" href="${path}/style.css">
    <link rel="shortcut icon" href="${path}/assets/img/misc/favicon.png">
    <link rel="icon" type="image/png" href="${path}/assets/img/misc/favicon.png" sizes="256x256">
    <link rel="apple-touch-icon" sizes="256x256" href="${path}/assets/img/misc/favicon.png">
  </head>
  `
}

/**
 * Generates the HTML header of a page
 * @param {'.'|'..'} [path=.] either '.' for index.html or '..' for others
 * @returns {string} HTML code
 */
function headerAndNav(path = '.') {
  return `
<div>
  <header>
    <div>
      <a href="${path}/index.html">
        <img class="logo" src="${path}/assets/img/misc/hci.svg" />
      </a>
    </div>
    <div>
      <nav>
      <ul>
        <li><a href="${path}/index.html#aboutus">about us</a></li>
        <li><a href="${path}/index.html#members">members</a></li>
        <li><a href="${path}/index.html#publications">publications</a></li>
      </ul>
      </nav>
    </div>
  </header>
</div>
`
}

/**
 * Generates the HTML footer of a page
 * @param {'.'|'..'} [path=.] either '.' for index.html or '..' for others
 * @returns {string} HTML code
 */
function footer(path = '.') {
  return `
<div style="text-align: center">
  <a href="${path}/imprint.html">Imprint / Legal Notice</a>
</div>
`
}

const allTeasers = new Set(readdirSync("assets/img/teaser"))
const allPeopleImages = new Set(readdirSync("assets/img/people"))
const allQRs = new Set(readdirSync("assets/img/qr"))
const allPdfs = new Set(readdirSync("assets/pdf"))
const allVideos = new Set(readdirSync("assets/video"))
const allSuppl = new Set(readdirSync("assets/suppl"))
const allPubHTML = new Set(readdirSync("pub"))

const nameMemberMap = new Map(memberConfig.map(d => [d.name, d]))

const publications = []

// Main loop
// TODO: old CSV version
const stream = createReadStream(publicationSheet)
csv
  .parseStream(stream, { headers: true })
  .on('data', data => data.Title !== '' && publications.push(data))
  .on('end', createPages)

// TODO: new bibtex version
// TODO: maybe better to use https://citation.js.org/api/0.7/
// import { parseBibFile, normalizeFieldValue } from "bibtex"

function main() {

  const bibFile = parseBibFile(`
    @InProceedings{realscience,
    author    = {Marteen Fredrik Adriaan ding de la Trumppert and مهدي N\\"allen and henQuq, jr, Mathize},
    title     = {You Won't Believe This Proof That {P} \\gtreqqless {NP} Using Super-{T}uring Computation Near Big Black Holes},
    booktitle = {Book of Qeq},
    month     = {September},
    year      = {2001},
    address   = {Dordrecht},
    publisher = {Willems Uitgeverij},
    url       = {https://github.com/digitalheir/},
    pages     = {6--9}
    }
    `)

  console.log(bibFile)

  const get = (entry, key) => normalizeFieldValue(entry.getField(key))

  for (const key in bibFile.entries$) {
    console.log(key)

    const entry = bibFile
      .getEntry(key)


    let month = get(entry, 'month')
    month = month.length === 1 ? `0${month}` : month

    const pub = {
      "Title": get(entry, 'title'),
      "Submission Target": get(entry, 'booktitle'),
      "Date": `${get(entry, 'year')}-${month}`,
      "First Author": '',
      "Other Authors": '',
      "Key (e.g. for file names)": key,
      "Publisher URL (official)": get(entry, 'doi'),
      "url2": get(entry, 'url2'),
      "PDF URL (public)": '',
      "Video": '',
      "Video2": '',
      "Supplemental": get(entry, 'suppl'),
      "Acknowledgements": get(entry, 'ack'),
      "Abstract": get(entry, 'abstract'),
      "bibtex": get(entry, 'bibtex'),
      "notes": get(entry, 'notes'),
      "funding": get(entry, 'funding')
    }
    console.log(pub)

    publications.push(pub)
  }




  // TODO:
  // createPages()
}
main()


/**
 * Creates all HTML pages
*/
async function createPages() {
  console.log(`${publications.length} publications`)
  console.log(allPdfs.size + ' pdfs')
  console.log(allTeasers.size + ' teasers')
  // Sort by date descending, so newest at top of page
  publications.sort((a, b) => a.Date > b.Date ? -1 : 1)
  // Member / author pages
  for (const member of memberConfig) {
    const authoredPubs = publications.filter(d =>
      d['First Author'].includes(member.name)
      || d['Other Authors'].includes(member.name)
    )
    createMemberPageHtml(member, authoredPubs)
  }
  // Main page and imprint
  createMainPageHtml(publications, memberConfig)
  createImprint()
  // Publication pages
  for (const pub of publications) {
    createPublicationPageHtml(pub)
  }
  // Export papers.json
  updateFile('papers.json', JSON.stringify(publications))
  // Create missing QR codes
  await createQRCodes(publications)
  // Detect missing and extra files
  reportMissingOrExtraInfo(publications)
}

/**
 * Creates HTML from the CSV data
 */
function createMainPageHtml(publications, memberConfig) {
  // pictures of members and links to their pages
  // for prof and postdocs, show titles
  const getMemberHtml = (config) => {
    return config.map(member => `
  <div>
    <a href="./members/${member.path}.html">
      <img class="avatar" src="./assets/img/people/small/${allPeopleImages.has(`${member.path}.jpg`) ? member.path : 'placeholder'}.jpg" loading="lazy" />
      <div>
        ${['professor', 'postdoc', 'associatedpostdoc', 'alumnusphd', 'alumnuspostdoc'].includes(member.role) ? member.title : member.name}
      </div>
    </a>
  </div>
  `).join('\n')
  }

  const memberList = getMemberHtml(memberConfig.filter(d => d.role === 'professor' | d.role === 'postdoc' | d.role === 'phd').sort((a, b) => {
    // sorting rules
    if (a.role === 'professor' && b.role === 'postdoc') {
      return -1
    } else if (a.role === 'postdoc' && b.role === 'professor') {
      return 1
    }

    if (a.role === 'professor' && b.role === 'phd') {
      return -1
    } else if (a.role === 'phd' && b.role === 'professor') {
      return 1
    }

    if (a.role === 'postdoc' && b.role === 'phd') {
      return -1
    } else if (a.role === 'phd' && b.role === 'postdoc') {
      return 1
    }

    // otherwise (same role) sort by name
    return a.name < b.name ? -1 : 1
  }))


  const associatedList = getMemberHtml(memberConfig.filter(d => d.role === 'associatedpostdoc' | d.role === 'associatedphd').sort((a, b) => {
    // sorting rules
    if (a.role === 'associatedpostdoc' && b.role === 'associatedphd') {
      return -1
    } if (a.role === 'associatedphd' && b.role === 'associatedpostdoc') {
      return 1
    }

    // otherwise (same roles) sort by name
    return a.name < b.name ? -1 : 1
  }))


  const alumniList = getMemberHtml(memberConfig.filter(d => d.role === 'alumnuspostdoc' | d.role === 'alumnusphd').sort((a, b) => {
    // sorting rules
    if (a.role === 'alumnuspostdoc' && b.role === 'alumnusphd') {
      return -1
    } if (a.role === 'alumnusphd' && b.role === 'alumnuspostdoc') {
      return 1
    }
    // otherwise (same roles) sort by name
    return a.name < b.name ? -1 : 1
  }))

  const html = `${htmlHead(pageTitle)}
<body>
  <a class="anchor" name="top"></a>
  <main>
    ${headerAndNav()}
    <div>
      <article><a class="anchor" name="aboutus"></a>
        ${readFileSync('./aboutus.html')}
      </article>
      <article> <a class="anchor" name="members"></a>
        <h1>Members</h1>
        <div class="memberList">
        ${memberList}
        </div>
        </article>
        <article>
        <h1>Associated Researchers</h1>
        <div class="memberList">
          ${associatedList}
        </div>
        </article>
        <article>
        <h1>Alumni</h1>
        <div class="memberList alumni">
          ${alumniList}
        </div>
      </article>
      <article> <a class="anchor" name="publications"></a>
        <h1>Publications</h1>
        ${createPublicationsHtml(publications)}
      </article>
      ${footer()}
    </div>
  </main>
</body>
</html>`
  updateFile('./index.html', html)
}

/**
 * Creates HTML for the imprint
 */
function createImprint() {
  const html = `${htmlHead(pageTitle)}
<body>
  <a class="anchor" name="top"></a>
  <main>
    ${headerAndNav('.')}
    <div>
      <article>
        ${readFileSync('./imprint_config.html')}
      </article>
    </div>
  </main>
</body>
</html>`
  updateFile('./imprint.html', html)
}

/**
 * Creates HTML from the CSV data
 */
function createMemberPageHtml(member, publications) {
  const title = `${member.title} | ${pageTitle}`
  const html = `${htmlHead(title, '..')}
<body>
  <a class="anchor" name="top"></a>
  <main>
    ${headerAndNav('..')}
    <div>
      <article><a class="anchor" name="aboutus"></a>
        <h1>${member.title}</h1>
        <div class="aboutMember">
          <div class="avatarAndBio">
            <img class="avatar" src="../assets/img/people/${allPeopleImages.has(`${member.path}.jpg`) ? member.path : 'placeholder'}.jpg" />
            <div class="bio">${member.bio}</div>
          </div>
          <div class="furtherInfo">
          ${member.research.length === 0 ? '' : `
            <div>
              <h2>Research Interests</h2>
              <ul>
                <li>${member.research.join("</li>\n<li>")}</li>
              </ul>
            </div>
            `}
            <div>
              <h2>Links</h2>
              <ul>
                <li>${member.links.map(d => `<a href="${d.url}" target="_blank" rel="noreferrer">${d.text}</a>`).join("</li>\n<li>")}</li>
              </ul>
            </div>
            ${member.projects.length === 0 ? '' : `
            <div>
            <h2>Projects &amp; Funding</h2>
            <ul>
              <li>${member.projects.map(d => `<a href="${d.url}" target="_blank" rel="noreferrer">${d.text}</a>`).join("</li>\n<li>")}</li>
            </ul>
          </div>
            `}
          </div>
        </div>
      </article>
      <article> <a class="anchor" name="publications"></a>
        <h1>Publications</h1>
        ${createPublicationsHtml(publications, member)}
        <div style="text-align: center">
          <img class="qr" src="../assets/img/qr/${member.path}.png"/>
        </div>
      </article>
      ${footer('..')}
    </div>
  </main>
</body>
</html>`
  const outFile = `./members/${member.path}.html`
  updateFile(outFile, html)
}

/**
 * Creates HTML for an Array of publications extracted from the CSV
 *
 * @param {object[]} publications publications
 * @param {object} [member=null] member config or null for main page? (affects paths)
 * @returns {string} HTML
 */
function createPublicationsHtml(publications, member = null) {
  const p = member ? '..' : '.'
  return publications.map((pub, i) => {
    const key = pub['Key (e.g. for file names)']
    const image = `${p}/assets/img/teaser/small/${key}.png`
    const year = pub.Date.slice(0, 4)
    const url1 = pub['Publisher URL (official)']
    const url2 = pub['url2']
    const venue = pub['Submission Target']
    const imageExists = allTeasers.has(`${key}.png`)
    // PDF, video, and supplemental might be a link instead of file
    let pdf = pub['PDF URL (public)']
    let pdfExists = allPdfs.has(`${key}.pdf`)
    if (!pdfExists && pdf && pdf !== '') {
      pdfExists = true
    } else {
      pdf = `${p}/assets/pdf/${key}.pdf`
    }
    let video = pub.Video
    let videoExists = allVideos.has(`${key}.mp4`)
    if (!videoExists && video && video !== '') {
      videoExists = true
    } else {
      video = `${p}/assets/video/${key}.mp4`
    }
    let suppl = pub.Supplemental
    let supplExists = allSuppl.has(`${key}.zip`)
    if (!supplExists && suppl && suppl !== '') {
      supplExists = true
    } else {
      suppl = `${p}/assets/suppl/${key}.zip`
    }
    const authors = [
      ...pub['First Author'].split(',').map(d => d.trim()).filter(d => d.length),
      ...pub['Other Authors'].split(',').map(d => d.trim()).filter(d => d.length)
    ]
    const authorHtml = authors.map(d => {
      // if this is the author's member page, make them bold
      const text = d === member?.name ? `<b>${d}</b>` : d
      // if author is a group member, link to their page
      if (nameMemberMap.has(d)) {
        return `<a href="${p}/members/${nameMemberMap.get(d).path}.html" target="_blank">${text}</a>`
      }
      return text
    }).join(', ')


    return `
  ${i === 0 || year !== publications[i - 1]['Date'].slice(0, 4)
        ? `<h2 class="yearHeading">${year}</h2>` : ''}
  <div class="paper" id="paper${key}">
    ${imageExists
        ? `
      <a href="${p}/pub/${key}.html" target="_blank">
        <img
          class="publicationImage"
          loading="lazy"
          src="${image}"
        />
      </a>`
        : ''
      }
    <div class="metaData ${imageExists ? '' : 'noImage'}">
      <h3>
        <a href="${p}/pub/${key}.html" target="_blank">
        ${pub['Title']}
        </a>
      </h3>
      <div class="authors">
        ${authorHtml}
      </div>
      <div>
        ${venue} (${year})
      </div>
      <div class="links">
        ${url1 && url1 !== '' ? `<a href="${url1}" target="_blank" rel="noreferrer">link</a>` : ''}
        ${url2 && url2 !== '' ? `<a href="${url2}" target="_blank" rel="noreferrer">link</a>` : ''}
        ${pdfExists ? `<a href="${pdf}" target="_blank" rel="noreferrer">PDF</a>` : ''}
        ${videoExists ? `<a href="${video}" target="_blank" rel="noreferrer">video</a>` : ''}
        ${supplExists ? `<a href="${suppl}" target="_blank" rel="noreferrer">supplemental</a>` : ''}
        ${pub.notes ? `<div>${pub.notes}</div>` : ''}
      </div>
    </div>
  </div>
  `
  }).join('')
}

/**
 * Creates the page for a single publication
 */
function createPublicationPageHtml(pub) {
  const key = pub['Key (e.g. for file names)']
  const year = pub.Date.slice(0, 4)
  const url1 = pub['Publisher URL (official)']
  const url2 = pub['url2']
  const venue = pub['Submission Target']
  const imageExists = allTeasers.has(`${key}.png`)
  // PDF, video, and supplemental might be a link instead of file
  let pdf = pub['PDF URL (public)']
  let pdfExists = allPdfs.has(`${key}.pdf`)
  if (!pdfExists && pdf && pdf !== '') {
    pdfExists = true
  } else {
    pdf = `../assets/pdf/${key}.pdf`
  }
  let video = pub.Video
  let videoExists = allVideos.has(`${key}.mp4`)
  if (!videoExists && video && video !== '') {
    videoExists = true
  } else {
    video = `../assets/video/${key}.mp4`
  }
  let suppl = pub.Supplemental
  let supplExists = allSuppl.has(`${key}.zip`)
  if (!supplExists && suppl && suppl !== '') {
    supplExists = true
  } else {
    suppl = `../suppl/${key}.zip`
  }
  // Create HTML
  const title = `${pub.Title} | ${pageTitle}`
  const html = `${htmlHead(title, '..')}
    <body>
      <a class="anchor" name="top"></a>
      <main>
        ${headerAndNav('..')}
        <div>
          <article><a class="anchor" name="publications"></a>
            <h1>${pub.Title}</h1>
            <div class="pubPageContent">
              ${imageExists ? `
              <a href="../assets/img/teaser/${key}.png" target="_blank" title="show image full size">
                <img id="image${key}" src="../assets/img/teaser/${key}.png"/>
              </a>` : ''}
              <div>
                <div>
                  <b>Authors.</b> ${pub['First Author']}${pub['Other Authors'] !== '' ? ',' : ''} ${pub['Other Authors']}
                </div>
                <div>
                  <b>Venue.</b> ${venue} (${year})
                </div>
                <div>
                  <b>Materials.</b>
                  ${url1 && url1 !== '' ? `<a href="${url1}" target="_blank" rel="noreferrer">link</a>` : ''}
                  ${url2 && url2 !== '' ? `<a href="${url2}" target="_blank" rel="noreferrer">link</a>` : ''}
                  ${pdfExists ? `<a href="${pdf}" target="_blank" rel="noreferrer">PDF</a>` : ''}
                  ${videoExists ? `<a href="${video}" target="_blank" rel="noreferrer">video</a>` : ''}
                  ${supplExists ? `<a href="${suppl}" target="_blank" rel="noreferrer">supplemental</a>` : ''}
                </div>
                ${pub['Abstract'] ? `<div class="abstract"><b>Abstract.</b> ${pub['Abstract']}</div>` : ''}
                ${pub.bibtex ? `<div class="bibtex"><textarea>${formatBibtex(key, pub.bibtex)}</textarea></div>` : ''}
                ${pub['Acknowledgements'] ? `<div class="abstract"><b>Acknowledgements.</b> ${pub['Acknowledgements']}</div>` : ''}
                ${pub.notes ? `<div>${pub.notes}</div>` : ''}
                <img class="qr" src="../assets/img/qr/${key}.png"/>
            </div>
          </article>
          ${footer('..')}
        </div>
      </main>
    </body>
    </html>`
  const outFile = `./pub/${pub['Key (e.g. for file names)']}.html`
  updateFile(outFile, html)
}

/**
 * Formats bibtex for more beautiful and uniform display
 *
 * @see https://github.com/FlamingTempura/bibtex-tidy
 * @param {string} key pub key (for debugging logs)
 * @param {string} bibtexString bibtex string
 */
function formatBibtex(key, bibtexString) {
  try {
    const formatted = tidy(bibtexString, {
      omit: ['address', 'location', 'isbn', 'timestamp'],
      curly: true,
      space: 4,
      align: 13,
      stripEnclosingBraces: true,
      sortFields: true,
      removeEmptyFields: true,
      lowercase: true
    })
    return formatted.bibtex
  } catch (e) {
    // console.log(e);
    console.warn(`Invalid bibtex for pub with key ${key}`)
    console.log(bibtexString)
    return bibtexString
  }
}

/**
 * Creates QR codes with awesome-qr (https://github.com/sumimakito/Awesome-qr.js)
 *
 * @param {object[]} publications publication data
 */
async function createQRCodes(publications) {
  let count = 0
  const dir = "./assets/img/qr"
  const options = {
    color: {
      dark: '#444',  // dots
      light: '#0000' // transparent background
    },
    errorCorrectionLevel: 'Q',
    scale: 12,
    margin: 0,

  }
  const expectedQRs = []
  // For publications
  for (const pub of publications) {
    const key = pub['Key (e.g. for file names)']
    const path = `${dir}/${key}.png`
    expectedQRs.push(`${key}.png`)
    // Check if QR code image already exists
    if (existsSync(path)) { continue }
    const url = `${pageUrl}/pub/${key}.html`
    QRCode.toFile(path, url, options)
    count++
  }
  // For people
  for (const m of memberConfig) {
    const path = `${dir}/${m.path}.png`
    expectedQRs.push(`${m.path}.png`)
    if (existsSync(path)) { continue }
    const url = `${pageUrl}/members/${m.path}.html`
    QRCode.toFile(path, url, options)
    count++
  }
  // Look for orphan QR code PNGs
  allQRs.delete('.gitkeep')
  for (const path of expectedQRs) {
    allQRs.delete(path)
  }
  if (allQRs.size > 0) {
    console.log(`\nextra QR code images:\n  ${[...allQRs].join("\n  ")}`)
  }
}

/**
 * Logs missing and extra files to the console as warnings
 * @param {object[]} publications publication data
 */
function reportMissingOrExtraInfo(publications) {
  // for each missing file we want to know who is responsible
  const memberNames = new Set(memberConfig.map(d => d.name))
  const getResp = (pub) => {
    const authors = [pub['First Author'], ...pub['Other Authors'].split(', ')]
    for (const author of authors) {
      if (memberNames.has(author)) {
        return author
      }
    }
    return ''
  }

  let missing = []
  for (const pub of publications) {
    const key = pub['Key (e.g. for file names)']
    // missing publication info
    if (REPORT_MISSING_INFO) {
      if (pub['Submission Target'] === '') {
        missing.push([`${key} info: submission target`, getResp(pub)])
      }
      if (pub['Publisher URL (official)'] === '') {
        missing.push([`${key} info: publisher url`, getResp(pub)])
      }
      if (pub['Abstract'] === '') {
        missing.push([`${key} info: abstract`, getResp(pub)])
      }
    }
    // missing files
    // publication teaser images
    if (!allTeasers.has(`${key}.png`)) {
      missing.push([`${key}.png (teaser)`, getResp(pub)])
    }
    // publication PDF, not necessary for datasets
    let pdf = pub['PDF URL (public)']
    if ((!pdf || pdf.trim() === '') && !allPdfs.has(`${key}.pdf`)) {
      // no link AND no file
      missing.push([`${key}.pdf (publication)`, getResp(pub)])
    } else if (REPORT_MISSING_PDF_FILES && !allPdfs.has(`${key}.pdf`)) {
      missing.push([`${key}.pdf (no pdf file - only link)`, getResp(pub)])
    }
  }
  // create report
  if (missing.length > 0) {
    missing.sort((a, b) => a[1] < b[1] ? -1 : 1)
    console.log(`\n\n\nmissing information and files:`)
    console.log(`\npublications:`)
    let last = ''
    for (const [file, member] of missing) {
      if (last !== member) {
        console.log('  ' + member)
      }
      console.log('    ' + file)
      last = member
    }
  }
  // extra files
  let extra = []
  const allKeys = new Set(publications.map(d => d['Key (e.g. for file names)']))
  const allFiles = [...allTeasers, ...allPdfs, ...allVideos, ...allSuppl, ...allPubHTML]
  const ignore = new Set(["small", "people", "misc"])
  for (const f of allFiles) {
    const key = f.slice(0, f.lastIndexOf("."))
    if (!allKeys.has(key) && !ignore.has(f)) {
      extra.push(f)
    }
  }
  if (extra.length > 0) {
    console.log(`\nextra files:\n  ${extra.sort().join("\n  ")}`)
  }
  if (missing.length > 0 || extra.length > 0) {
    console.log('\n  fill in missing info in\n    Papers.xlsx\n  put the missing files in:\n    .pdf   assets/pdf/\n    .png   assets/img/teaser/\n    .html  pub/')
  }

  // missing member info
  let missingInfo = false
  let firstPrint = true
  for (const member of memberConfig) {
    let missingForMember = []
    if (member.role && member.role.includes('alumnus')) {
      // ignore alumni
      continue
    }
    if (member.bio === '') {
      missingForMember.push('a bio')
    }
    if (!allPeopleImages.has(member.path + '.jpg')) {
      missingForMember.push('a profile picture')
    }
    if (member.research.length === 0) {
      missingForMember.push('research interests')
    }
    const links = member.links.map(d => d.text)
    if (!links.includes('University of Stuttgart website')) {
      missingForMember.push('a Uni link')
    }
    if (!links.includes('ORCID')) {
      missingForMember.push('an ORCID link')
    }
    if (!links.includes('Google Scholar')) {
      missingForMember.push('a scholar link')
    }
    if (missingForMember.length > 0) {
      if (firstPrint) {
        console.log(`\n\nmembers:`)
        firstPrint = false
      }
      missingInfo = true
      console.log(`  ${member.name} is missing`)
      missingForMember.forEach(element => {
        console.log('    ' + element)
      })
    }
  }
  if (missingInfo) {
    console.log('\n  add missing info in\n    config.js\n  add missing profile pictures in\n    assets/img/people')
  }
}

/**
 * Writes content to a file, but only if the content has changed or it does not
 * exist yet
 *
 * @param {string} path file path
 * @param {string} newContent the new content that would be written to the file
 */
function updateFile(path, newContent) {
  if (!existsSync(path)) {
    writeFileSync(path, newContent)
    return
  }
  const oldContent = readFileSync(path).toString()
  if (oldContent !== newContent) {
    writeFileSync(path, newContent)
  }
}
