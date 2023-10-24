import { createReadStream, readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs'
import csv from 'fast-csv'
import { AwesomeQR } from 'awesome-qr'
import { publicationSheet, pageUrl, pageTitle, memberConfig } from '../config.js'
import { venueMap } from '../venues.js'
import pkg from 'bibtex-tidy'
const { tidy } = pkg

// report missing info for publications
const reportMissingInfo = false
// report when pdf is only given as link but not file
const reportPdfFileMissing = true
// log venues not defined in venues.js to the console
const reportUnknownVenues = false
// log resource URLs not defined in urlText() to the console
const reportUnknownUrls = false

/**
 * This will be added to every .html page
 */
const headerAndNav = `
<div>
  <header>
    <div>
      <a href="${pageUrl}/">
        <img class="logo" src="${pageUrl}/img/misc/visvar_logo.svg" />
      </a>
    </div>
    <div>
      <nav>
      <ul>
        <li><a href="${pageUrl}/#aboutus">about VISVAR</a></li>
        <li><a href="${pageUrl}/#publications">publications</a></li>
        <li><a href="${pageUrl}/#members">members</a></li>
      </ul>
      </nav>
    </div>
  </header>
</div>
`

/**
 * Generates the HTML head of a page
 * @param {string} title page title for <title>
 * @param {'.'|'..'} [path=.] either '.' for index.html or '..' for others
 * @returns {string} HTML code
 */
function htmlHead(title, path = '.') {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=500, initial-scale=1">
  <title>${title}</title>
  <link rel="stylesheet" href="${path}/style.css">
  <link rel="shortcut icon" href="${path}/img/misc/favicon.png">
  <link rel="icon" type="image/png" href="${path}/img/favicon.png" sizes="256x256">
  <link rel="apple-touch-icon" sizes="256x256" href="${path}/img/favicon.png">
</head>
`
}


const allImages = new Set(readdirSync("img"))
const allQRs = new Set(readdirSync("qr"))
const allPdfs = new Set(readdirSync("pdf"))
const allVideos = new Set(readdirSync("video"))
const allSuppl = new Set(readdirSync("suppl"))
const allPub = new Set(readdirSync("pub"))

// Main loop
const publications = []
const stream = createReadStream(publicationSheet)
csv
  .parseStream(stream, { headers: true })
  .on('data', data => data.Title !== '' && publications.push(data))
  .on('end', createPages)

/**
 * Creates all HTML pages
*/
async function createPages() {
  console.log(`${publications.length} publications`)
  console.log(allPdfs.size + ' pdfs')
  console.log(allImages.size + ' teasers')
  // Sort by date descending, so newest at top of page
  publications.sort((a, b) => a.Date > b.Date ? -1 : 1)
  // Member / author pages
  memberConfig
    .sort((a, b) => {
      // people with role first
      if (a.role && !b.role) {
        return -1
      } else if (!a.role && b.role) {
        return 1
      }
      // profs before postdocs
      if (a.role && b.role) {
        if (a.role === 'professor' && b.role === 'postdoc') {
          return -1;
        } else if (a.role === 'postdoc' && b.role === 'professor') {
          return 1
        }
      }
      // otherwise (no roles) sort by name
      return a.name < b.name ? -1 : 1
    })
  for (const member of memberConfig) {
    const authoredPubs = publications.filter(d =>
      d['First Author'].includes(member.name)
      || d['Other Authors'].includes(member.name)
    )
    createMemberPageHtml(member, authoredPubs)
  }
  // Main page
  createMainPageHtml(publications, memberConfig)
  // Publication pages
  for (const pub of publications) {
    createPublicationPageHtml(pub)
  }
  // Venue pages
  createVenuePages(venueMap)
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
  const html = `${htmlHead(pageTitle)}
<body>
  <a class="anchor" name="top"></a>
  <main>
    ${headerAndNav}
    <div>
      <article><a class="anchor" name="aboutus"></a>
        ${readFileSync('./aboutus.html')}
      </article>
      <article> <a class="anchor" name="members"></a>
        <h1>Members</h1>
        <div class="memberList">
          ${memberConfig.map(member => `
            <div>
              <a href="./members/${member.path}.html">
                <img class="avatar" src="./img/people/small/${member.path}.jpg" loading="lazy" />
                <div>${member.name}</div>
              </a>
            </div>
            `).join('\n')}
        </div>
      </article>
      <article> <a class="anchor" name="publications"></a>
        <h1>Publications</h1>
        ${createPublicationsHtml(publications)}
      </article>
    </div>
  </main>
</body>
</html>`
  updateFile('./index.html', html)
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
    ${headerAndNav}
    <div>
      <article><a class="anchor" name="aboutus"></a>
        <h1>${member.title}</h1>
        <div class="aboutMember">
          <div class="avatarAndBio">
            <img class="avatar" src="../img/people/${member.path}.jpg" />
            <div class="bio">${member.bio}</div>
          </div>
          <div class="furtherInfo">
            <div>
              <h2>Research Interests</h2>
              <ul>
                <li>${member.research.join("</li>\n<li>")}</li>
              </ul>
            </div>
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
        ${createPublicationsHtml(publications, true)}
      </article>
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
 * @param {boolean} [isMember=false] is this a member page? (affects paths)
 * @returns {string} HTML
 */
function createPublicationsHtml(publications, isMember = false) {
  const p = isMember ? '..' : '.'
  return publications.map((pub, i) => {
    const key = pub['Key (e.g. for file names)']
    const image = `${p}/img/small/${key}.png`
    const year = pub.Date.slice(0, 4)
    const url1 = pub['Publisher URL (official)']
    const url2 = pub['url2']
    const venue = pub['Submission Target']
    const imageExists = allImages.has(`${key}.png`)
    // PDF, video, and supplemental might be a link instead of file
    let pdf = pub['PDF URL (public)']
    let pdfExists = allPdfs.has(`${key}.pdf`)
    if (!pdfExists && pdf && pdf !== '') {
      pdfExists = true
    } else {
      pdf = `${p}/pdf/${key}.pdf`
    }
    let video = pub.Video
    let videoExists = allVideos.has(`${key}.mp4`)
    if (!videoExists && video && video !== '') {
      videoExists = true
    } else {
      video = `${p}/video/${key}.mp4`
    }
    let suppl = pub.Supplemental
    let supplExists = allSuppl.has(`${key}.zip`)
    if (!supplExists && suppl && suppl !== '') {
      supplExists = true
    } else {
      suppl = `${p}/suppl/${key}.zip`
    }

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
      <div>
        ${pub['First Author']}${pub['Other Authors'] !== '' ? ',' : ''} ${pub['Other Authors']}
      </div>
      <div>
        ${venueLink(venue, p)} (${year}) ${pub['Type']}
      </div>
      <div>
        ${url1 && url1 !== '' ? `<a href="${url1}" target="_blank">${urlText(url1)}</a>` : ''}
        ${url2 && url2 !== '' ? `<a href="${url2}" target="_blank">${urlText(url2)}</a>` : ''}
        ${pdfExists ? `<a href="${pdf}" target="_blank">PDF</a>` : ''}
        ${videoExists ? `<a href="${video}" target="_blank">video</a>` : ''}
        ${supplExists ? `<a href="${suppl}" target="_blank">supplemental</a>` : ''}
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
  const imageExists = allImages.has(`${key}.png`)
  // PDF, video, and supplemental might be a link instead of file
  let pdf = pub['PDF URL (public)']
  let pdfExists = allPdfs.has(`${key}.pdf`)
  if (!pdfExists && pdf && pdf !== '') {
    pdfExists = true
  } else {
    pdf = `../pdf/${key}.pdf`
  }
  let video = pub.Video
  let videoExists = allVideos.has(`${key}.mp4`)
  if (!videoExists && video && video !== '') {
    videoExists = true
  } else {
    video = `../video/${key}.mp4`
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
        ${headerAndNav}
        <div>
          <article><a class="anchor" name="publications"></a>
            <h1>${pub.Title}</h1>
            <div class="pubPageContent">
              ${imageExists ? `
              <a href="../img/${key}.png" target="_blank" title="show image full size">
                <img id="image${key}" src="../img/${key}.png"/>
              </a>` : ''}
              <div>
                <div>
                  <b>Authors.</b> ${pub['First Author']}${pub['Other Authors'] !== '' ? ',' : ''} ${pub['Other Authors']}
                </div>
                <div>
                  <b>Venue.</b> ${venueLink(venue, '..')} (${year}) ${pub['Type']}
                </div>
                ${pub.Type !== '' ? `
                <div>
                  <b>Type.</b> ${pub.Type}
                </div>
                `: ''}
                <div>
                  <b>Materials.</b>
                  ${url1 && url1 !== '' ? `<a href="${url1}" target="_blank">${urlText(url1)}</a>` : ''}
                  ${url2 && url2 !== '' ? `<a href="${url2}" target="_blank">${urlText(url2)}</a>` : ''}
                  ${pdfExists ? `<a href="${pdf}" target="_blank">PDF</a>` : ''}
                  ${videoExists ? `<a href="${video}" target="_blank">video</a>` : ''}
                  ${supplExists ? `<a href="${suppl}" target="_blank">supplemental</a>` : ''}
                </div>
                ${pub['Abstract'] ? `<div class="abstract"><b>Abstract.</b> ${pub['Abstract']}</div>` : ''}
                ${pub.bibtex ? `<div class="bibtex"><textarea>${formatBibtex(key, pub.bibtex)}</textarea></div>` : ''}
                ${pub['Acknowledgements'] ? `<div class="abstract"><b>Acknowledgements.</b> ${pub['Acknowledgements']}</div>` : ''}
                ${pub.notes ? `<div>${pub.notes}</div>` : ''}
                <img class="qr" src="../qr/${key}.png"/>
            </div>
          </article>
        </div>
      </main>
    </body>
    </html>`
  const outFile = `./pub/${pub['Key (e.g. for file names)']}.html`
  updateFile(outFile, html)
}

/**
 * For each venue in venues.js, create page with its information
 *
 * @param {Map} venueMap see venues.js
 */
function createVenuePages(venueMap) {
  for (const venue of venueMap.values()) {
    const title = `${venue.short} | ${pageTitle}`
    const html = `${htmlHead(title, '..')}
    <body>
      <a class="anchor" name="top"></a>
      <main>
        ${headerAndNav}
        <div>
          <article>
            <h1>${venue.name} (${venue.short})</h1>
            <div class="pubPageContent">
              ${venue.publisher.length ? `<div>Publisher: ${venue.publisher}<div>` : ''}
              ${venue.type.length ? `<div>Type: ${venue.type}<div>` : ''}
              <div>
                ${venue.url.length ? `<a href="${venue.url}" target="_blank">official website</a>` : ''}
                ${venue.resources.map(d => `<a href="${d.url}" target="_blank">${d.label}</a>`).join('')}
              </div>
            </div>
          </article>
        </div>
      </main>
    </body>
    </html>`
    const outFile = `./venue/${venue.pageUrl}.html`
    updateFile(outFile, html)
  }
}

/**
 * For "submission target", look up venues.js and link to the venue page if it exists
 * @param {*} venueShort
 */
function venueLink(venueShort, path = '.') {
  venueShort = venueShort.trim()
  if (venueMap.has(venueShort)) {
    const venue = venueMap.get(venueShort)
    return `<a href="${path}/venue/${venue.pageUrl}.html" target="_blank" title="${venue.name}">${venueShort}</a>`
  } else {
    if (reportUnknownVenues && path === '.' && venueShort !== '') {
      console.log('unknown venue', venueShort)
    }
    return venueShort
  }
}

/**
 * Chooses a different link text depending on the URL's domain.
 *
 * @param {string} url url
 * @returns {string} link text
 */
function urlText(url) {
  const u = url.toLowerCase()
  if (u.includes('doi.org')) { return 'DOI' }
  if (u.includes('acm.org')) { return 'ACM' }
  if (u.includes('ieee.org')) { return 'IEEE' }
  if (u.includes('eg.org')) { return 'Eurographics' }
  if (u.includes('arxiv.org')) { return 'arXiv' }
  if (u.includes('ismir.net')) { return 'ISMIR' }
  if (u.includes('springer.com')) { return 'Springer' }
  if (u.includes('wiley.com')) { return 'Wiley' }
  if (u.includes('degruyter.com')) { return 'De Gruyter' }
  if (reportUnknownUrls) {
    console.log('unknown url', url)
  }
  return 'link'
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
  const dir = "./qr"
  // const logo = readFileSync("./qr/_qrbg.png")
  const qrParams = {
    size: 420,
    margin: 0,
    colorDark: '#333',
    // logoImage: logo,
    // logoScale: 0.33,
    // logoMargin: 8,
    // logoCornerRadius: 70
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
    const buffer = await new AwesomeQR({ ...qrParams, text: url }).draw()
    writeFileSync(path, buffer)
    count++
  }
  // For people
  for (const m of memberConfig) {
    const path = `${dir}/${m.path}.png`
    expectedQRs.push(`${m.path}.png`)
    if (existsSync(path)) { continue }
    const url = `${pageUrl}/members/${m.path}.html`
    const buffer = await new AwesomeQR({ ...qrParams, text: url }).draw()
    writeFileSync(path, buffer)
    count++
  }
  // console.log(`\nCreated ${count} new QRs`)
  // Look for orphan QR code PNGs
  allQRs.delete('.gitkeep')
  allQRs.delete('_qrbg.png')
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
    if (reportMissingInfo) {
      if (pub['Submission Target'] === '') {
        missing.push([`${key} info: submission target`, getResp(pub)])
      }
      if (pub['Type'] === '') {
        missing.push([`${key} info: type`, getResp(pub)])
      }
      if (pub['Abstract'] === '') {
        missing.push([`${key} info: abstract`, getResp(pub)])
      }
      if (pub['bibtex'] === '') {
        missing.push([`${key} info: bixtex`, getResp(pub)])
      }
    }
    // missing files
    // publication teaser images
    if (!allImages.has(`${key}.png`)) { missing.push([`${key}.png (teaser)`, getResp(pub)]) }
    // publication PDF
    let pdf = pub['PDF URL (public)']
    if ((!pdf || pdf.trim() === '') && !allPdfs.has(`${key}.pdf`)) {
      // no link AND no file
      missing.push([`${key}.pdf (publication)`, getResp(pub)])
    } else if (reportPdfFileMissing && !allPdfs.has(`${key}.pdf`)) {
      missing.push([`${key}.pdf (no pdf file - only link)`, getResp(pub)])
    }
  }
  if (missing.length > 0) {
    missing.sort((a, b) => a[1] < b[1] ? -1 : 1)
    console.log(`\nmissing info/files:`)
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
  const allFiles = [...allImages, ...allPdfs, ...allVideos, ...allSuppl, ...allPub]
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
    console.log('\nfill in missing info in Papers.xlsx\nfor files, look inside the following folders depending on file type:\n.pdf   pdf/\n.png   img/\n.html  pub/')
  }
  // missing member info
  console.log()
  let missingInfo = false
  for (const member of memberConfig) {
    if (member.bio === '') {
      console.log(`${member.name} is missing a bio`)
      missingInfo = true
    }
    if (member.research.length === 0) {
      console.log(`${member.name} is missing research interests`)
      missingInfo = true
    }
    const links = member.links.map(d => d.text)
    if (!links.includes('University of Stuttgart website')) {
      console.log(`${member.name} is missing an Uni link`)
      missingInfo = true
    }
    if (!links.includes('ORCID')) {
      console.log(`${member.name} is missing an ORCID link`)
      missingInfo = true
    }
    if (!links.includes('Google Scholar')) {
      console.log(`${member.name} is missing a scholar link`)
      missingInfo = true
    }
  }
  if (missingInfo) {
    console.log('\nadd missing info in config.js')
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
