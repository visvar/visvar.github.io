import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs'
import QRCode from 'qrcode'
import { pageUrl, pageTitle, allowedMissingPDF, allowedArxiv, allowedMissingDOI, memberConfig } from '../config.js'
import pkg from 'bibtex-tidy'
const { tidy } = pkg
import bibtex from "@hygull/bibtex"

// Report when pdf is only given as link but not as a file
// const REPORT_MISSING_PDF_FILES = true

// Load files
const allTeasers = new Set(readdirSync("assets/img/teaser"))
const allPeopleImages = new Set(readdirSync("assets/img/people"))
const allQRs = new Set(readdirSync("assets/img/qr"))
const allPdfs = new Set(readdirSync("assets/pdf"))
const allVideos = new Set(readdirSync("assets/video"))
const allSuppl = new Set(readdirSync("assets/suppl"))
const allPubHTML = new Set(readdirSync("pub"))

// Load memberconfig
const nameMemberMap = new Map(memberConfig.map(d => [d.name, d]))

// Load publications
const bib = new bibtex()
const publications = bib.getBibAsObject('./bibliography.bib')

// Check the most important stuff
publications.forEach(pub => {
  if (!pub['data']['author'] || pub['data']['author'] === '') {
    console.log(`Publication ${pub['key']} is missing author(s)`)
    console.log('Compile panic')
    process.exit()
  }
  if (!pub['data']['title'] || pub['data']['title'] === '') {
    console.log(`Publication ${pub['key']} is missing a title`)
    console.log('Compile panic')
    process.exit()
  }
  if (!pub['data']['year'] || pub['data']['year'] === '') {
    console.log(`Publication ${pub['key']} is missing a year`)
    console.log('Compile panic')
    process.exit()
  }
  if (!pub['data']['month'] || pub['data']['month'] === '') {
    console.log(`Publication ${pub['key']} is missing a month`)
    console.log('Compile panic')
    process.exit()
  } else if (!/^\d+$/.test(pub['data']['month'])) {
    console.log(`Publication ${pub['key']}'s month is not numeric`)
    console.log('Compile panic')
    process.exit()
  }
});

createPages()

/*
 *
 * Main Content HTML Functions 
 *
 */

/**
 * Creates all HTML pages
*/
async function createPages() {
  console.log('\n\n')
  console.log('Stats:')
  console.log(`  ${publications.length} publications`)
  console.log(`  ${allTeasers.size - 1} teasers`) // -1 for the 'small' folder
  console.log(`  ${allPdfs.size} pdfs`)

  // Sort by date descending, so newest at top of page
  publications.sort((a, b) => {
    if (parseInt(a['data']['year']) !== parseInt(b['data']['year'])) return parseInt(b['data']['year']) - parseInt(a['data']['year']);
    return parseInt(b['data']['month']) - parseInt(a['data']['month'])
  });

  // Member / author pages
  for (const member of memberConfig) {
    const authoredPubs = publications.filter(d => d['data']['author'].includes(member.name))
    createMemberPageHtml(member, authoredPubs)
  }

  // Main page and imprint
  createMainPageHtml(publications, memberConfig)
  createImprint()

  // Publication pages
  for (const pub of publications) {
    createPublicationPageHtml(pub)
  }

  // Create missing QR codes
  await createQRCodes(publications)

  // Detect missing and extra files
  reportMissingOrExtraInfo(publications)
}

/**
 * Creates main page HTML
 */
function createMainPageHtml(publications, memberConfig) {
  // Pictures of members and links to their pages
  // For prof and postdocs, show titles
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
    // Sorting rules
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

    // Sort phd's by name
    return a.name < b.name ? -1 : 1
  }))


  const associatedList = getMemberHtml(memberConfig.filter(d => d.role === 'associatedpostdoc' | d.role === 'associatedphd').sort((a, b) => {
    // Sorting rules
    if (a.role === 'associatedpostdoc' && b.role === 'associatedphd') {
      return -1
    } if (a.role === 'associatedphd' && b.role === 'associatedpostdoc') {
      return 1
    }

    // Sort phd's by name
    return a.name < b.name ? -1 : 1
  }))


  const alumniList = getMemberHtml(memberConfig.filter(d => d.role === 'alumnuspostdoc' | d.role === 'alumnusphd').sort((a, b) => {
    // Sorting rules
    if (a.role === 'alumnuspostdoc' && b.role === 'alumnusphd') {
      return -1
    } if (a.role === 'alumnusphd' && b.role === 'alumnuspostdoc') {
      return 1
    }

    // Sort phd's by name
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
 * Creates member page HTML
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
 * Creates HTML for an array of publications
 *
 * @param {object[]} publications publications
 * @param {object} [member=null] member config or null for main page? (affects paths)
 * @returns {string} HTML
 */
function createPublicationsHtml(publications, member = null) {
  const p = member ? '..' : '.'

  return publications.map((pub, i) => {
    const key = pub['key']
    const image = `${p}/assets/img/teaser/small/${key}.png`
    const year = pub['data']['year']
    const doi = pub['data']['doi']
    const url = pub['data']['url']
    const url2 = pub['data']['url2']
    const venue = pub['data']['venue']
    const imageExists = allTeasers.has(`${key}.png`)

    // PDF, video, and supplemental might be a link instead of file
    let pdf = pub['data']['pdf']
    let pdfExists = allPdfs.has(`${key}.pdf`)
    if (!pdfExists && pdf) {
      pdfExists = true
    } else {
      pdf = `${p}/assets/pdf/${key}.pdf`
    }

    let video = pub['data']['video']
    let videoExists = allVideos.has(`${key}.mp4`)
    let videoEmbed = false
    if (!videoExists && video) {
      videoExists = true
      if (video.includes("youtube.com/embed")) {
        videoEmbed = true
      }
    } else {
      video = `${p}/assets/video/${key}.mp4`
    }
    let videoExists2 = false
    let video2 = pub['data']['video2']
    let videoEmbed2 = false
    if (video2) {
      videoExists2 = true
      if (video2.includes("youtube.com/embed")) {
        videoEmbed2 = true
      }
    }

    let suppl = pub['data']['suppl']
    let supplExists = allSuppl.has(`${key}.zip`)
    if (!supplExists && suppl) {
      supplExists = true
    } else {
      suppl = `${p}/assets/suppl/${key}.zip`
    }

    const authors = pub['data']['author'].split(',').map(d => d.trim())
    const authorHtml = authors.map(d => {
      // If this is the author's member page, make them bold
      const text = d === member?.name ? `<b>${d}</b>` : d
      // If author is a group member, link to their page
      if (nameMemberMap.has(d)) {
        return `<a href="${p}/members/${nameMemberMap.get(d).path}.html" target="_blank">${text}</a>`
      }
      return text
    }).join(', ')

    return `
  ${i === 0 || year !== publications[i - 1]['data']['year']
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
        ${pub['data']['badge'] ? `<img style="height:1em; width:auto; vertical-align: sub;" src="${p}/assets/img/badges/${pub['data']['badge']}.png"/> ` : ''}${pub['data']['title']}
        </a>
      </h3>
      <div class="authors">
        ${authorHtml}
      </div>
      <div>
        ${venue} (${year})
      </div>
      <div class="links">
        ${doi && doi !== '' ? `<a href="${doi}" target="_blank" rel="noreferrer">DOI</a>` : ''}
        ${url && url !== '' ? `<a href="${url}" target="_blank" rel="noreferrer">link</a>` : ''}
        ${url2 && url2 !== '' ? `<a href="${url2}" target="_blank" rel="noreferrer">link</a>` : ''}
        ${pdfExists ? `<a href="${pdf}" target="_blank" rel="noreferrer">PDF</a>` : ''}
        ${supplExists ? `<a href="${suppl}" target="_blank" rel="noreferrer">supplemental</a>` : ''}
        ${videoExists ? videoEmbed ? `<a href="https://www.youtube.com/watch?v=${video.split("embed/")[1].split("?")[0]}" target="_blank" rel="noreferrer">video</a>` : `<a href="${video}" target="_blank" rel="noreferrer">video</a>` : ''}
        ${videoExists2 ? videoEmbed2 ? `<a href="https://www.youtube.com/watch?v=${video2.split("embed/")[1].split("?")[0]}" target="_blank" rel="noreferrer">video</a>` : `<a href="${video2}" target="_blank" rel="noreferrer">video</a>` : ''}
      </div>
    </div>
  </div>
  `
  }).join('')
}

/**
 * Creates publication html page
 */
function createPublicationPageHtml(pub) {
  const key = pub['key']
  const year = pub['data']['year']
  const doi = pub['data']['doi']
  const url = pub['data']['url']
  const url2 = pub['data']['url2']
  const venue = pub['data']['venue']
  const imageExists = allTeasers.has(`${key}.png`)

  // PDF, video, and supplemental might be a link instead of file
  let pdf = pub['data']['pdf']
  let pdfExists = allPdfs.has(`${key}.pdf`)
  if (!pdfExists && pdf) {
    pdfExists = true
  } else {
    pdf = `../assets/pdf/${key}.pdf`
  }

  let video = pub['data']['video']
  let videoExists = allVideos.has(`${key}.mp4`)
  let videoEmbed = false
  if (!videoExists && video) {
    videoExists = true
    if (video.includes("youtube.com/embed")) {
      videoEmbed = true
    }
  } else {
    video = `../assets/video/${key}.mp4`
  }
  let videoExists2 = false
  let video2 = pub['data']['video2']
  let videoEmbed2 = false
  if (video2) {
    videoExists2 = true
    if (video2.includes("youtube.com/embed")) {
      videoEmbed2 = true
    }
  }

  let suppl = pub['data']['suppl']
  let supplExists = allSuppl.has(`${key}.zip`)
  if (!supplExists && suppl) {
    supplExists = true
  } else {
    suppl = `../assets/suppl/${key}.zip`
  }

  const title = `${pub['data']['title']}${pub['data']['badge'] ? ` <img style="height:1em; width:auto; vertical-align: sub;" src="../assets/img/badges/${pub['data']['badge']}.png"/>` : ''}`

  const html = `${htmlHead(title, '..')}
    <body>
      <a class="anchor" name="top"></a>
      <main>
        ${headerAndNav('..')}
        <div>
          <article><a class="anchor" name="publications"></a>
            <h1>${title}</h1>
            <div class="pubPageContent">
              ${imageExists ? `
              <a href="../assets/img/teaser/${key}.png" target="_blank" title="show image full size">
                <img id="image${key}" src="../assets/img/teaser/${key}.png"/>
              </a>` : ''}
              <div>
                <div>
                  <b>Authors.</b> ${pub['data']['author']}
                </div>
                <div>
                  <b>Venue.</b> ${venue} (${year})
                </div>
                <div>
                  <b>Materials.</b>
                  ${doi && doi !== '' ? `<a href="${doi}" target="_blank" rel="noreferrer">DOI</a>` : ''}
                  ${url && url !== '' ? `<a href="${url}" target="_blank" rel="noreferrer">link</a>` : ''}
                  ${url2 && url2 !== '' ? `<a href="${url2}" target="_blank" rel="noreferrer">link</a>` : ''}
                  ${pdfExists ? `<a href="${pdf}" target="_blank" rel="noreferrer">PDF</a>` : ''}
                  ${supplExists ? `<a href="${suppl}" target="_blank" rel="noreferrer">supplemental</a>` : ''}
                  ${videoExists ? videoEmbed ? `<p><iframe width="560" height="315" src="${video}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></p>` : `<a href="${video}" target="_blank" rel="noreferrer">video</a>` : ''}
                  ${videoExists2 ? videoEmbed2 ? `<p><iframe width="560" height="315" src="${video2}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></p>` : `<a href="${video2}" target="_blank" rel="noreferrer">video</a>` : ''}
                </div>
                ${pub['data']['abstract'] ? `<div class="abstract"><b>Abstract.</b> ${pub['data']['abstract']}</div>` : ''}
                ${`<div class="bibtex"><textarea>${formatBibtex(pub['key'], bib.getBibCodeFromObject(pub, 3))}</textarea></div>`}
                ${pub['data']['acks'] ? `<div class="abstract"><b>Acknowledgements.</b> ${pub['data']['acks']}</div>` : ''}
                ${pub['data']['note'] ? `<div>${pub['data']['note']}
                  ${pub['data']['badge'] ? `<img style="height:1em; width:auto; vertical-align: sub;" src="../assets/img/badges/${pub['data']['badge']}.png"/>` : ''}
                </div>` : ''}
                <img class="qr" src="../assets/img/qr/${key}.png"/>
            </div>
          </article>
          ${footer('..')}
        </div>
      </main>
    </body>
    </html>`
  const outFile = `./pub/${pub['key']}.html`
  updateFile(outFile, html)
}

/*
 *
 * Extra HTML Functions 
 *
 */

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

/*
 *
 * Helper Functions 
 *
 */

/**
 * Logs missing and extra files to the console as warnings
 * @param {object[]} publications publication data
 */
function reportMissingOrExtraInfo(publications) {
  // For each missing file we want to know who is responsible
  const memberNames = new Set(memberConfig.filter(d => d.role === 'professor' | d.role === 'postdoc' | d.role === 'phd' | d.role === 'associatedpostdoc' | d.role === 'associatedphd').map(d => d.name))
  const getResp = (pub) => {
    const authors = pub['data']['author'].split(', ')
    for (const author of authors) {
      if (memberNames.has(author)) {
        return author
      }
    }
    const alumniNames = new Set(memberConfig.filter(d => d.role === 'alumnuspostdoc' | d.role === 'alumnusphd').map(d => d.name))
    for (const author of authors) {
      if (alumniNames.has(author)) {
        return author
      }
    }
    return 'no author found'
  }

  // Extra files
  let extra = []
  const allKeys = new Set(publications.map(d => d['key']))
  const allFiles = [...allTeasers, ...allPdfs, ...allVideos, ...allSuppl, ...allPubHTML]
  const ignore = new Set(["small", "people", "misc"])
  for (const f of allFiles) {
    const key = f.slice(0, f.lastIndexOf("."))
    if (!allKeys.has(key) && !ignore.has(f)) {
      extra.push(f)
    }
  }
  // Extra QR codes
  for (const pub of publications) {
    const key = pub['key']
    allQRs.delete(`${key}.png`)
  }
  for (const m of memberConfig) {
    allQRs.delete(`${m.path}.png`)
  }
  allQRs.delete('.gitkeep')
  for (const qr of allQRs) {
    extra.push(qr)
  }
  // Print extra files report
  if (extra.length > 0) {
    console.log(`\n\nextra files:\n  ${extra.sort().join("\n  ")}`)
  }

  // Other missing files and information
  let missingPublicationInfo = false
  let missingFiles = false
  let missing = []

  for (const pub of publications) {
    const key = pub['key']

    // Missing publication info
    if (!pub['data']['doi'] || pub['data']['doi'] === '') {
      if (!allowedMissingDOI.includes(key)) {
        missingPublicationInfo = true
        missing.push([`${key} doi`, getResp(pub)])
      }
    } else {
      if (!pub['data']['doi'].includes('http')) {
        missingPublicationInfo = true
        missing.push([`${key} doi is not a link`, getResp(pub)])
      }
      if (pub['data']['doi'].toLowerCase().includes('arxiv') && !allowedArxiv.includes(key)) {
        missingPublicationInfo = true
        missing.push([`${key} doi is arxiv`, getResp(pub)])
      }
    }
    if (!pub['data']['venue'] || pub['data']['venue'] === '') {
      missingPublicationInfo = true
      missing.push([`${key} venue`, getResp(pub)])
    }
    if (!pub['data']['abstract'] | pub['data']['abstract'] === '') {
      missingPublicationInfo = true
      missing.push([`${key} abstract`, getResp(pub)])
    }
    if (pub['data']['badge'] && !pub['data']['note']) {
      missingPublicationInfo = true
      missing.push([`${key} please add info about the badge in the note`, getResp(pub)])
    }

    // Missing files
    // Publication teaser images
    if (!allTeasers.has(`${key}.png`)) {
      missingFiles = true
      missing.push([`${key}.png (teaser)`, getResp(pub)])
    }
    // Publication PDF
    let pdf = pub['data']['pdf']
    if ((!pdf) && !allPdfs.has(`${key}.pdf`) && !allowedMissingPDF.includes(key)) {
      // No link AND no file
      missingFiles = true
      missing.push([`${key}.pdf (publication)`, getResp(pub)])
    } /*else if (REPORT_MISSING_PDF_FILES && !allPdfs.has(`${key}.pdf`) && !allowedMissingPDF.includes(key)) {
      missing.push([`${key}.pdf (no pdf file - only link)`, getResp(pub)])
    }*/
  }

  // Create missing files and infornmation report
  if (missing.length > 0) {
    missing.sort((a, b) => a[1] < b[1] ? -1 : 1)
    console.log(`\n\nmissing information and files:`)
    let last = ''
    for (const [file, member] of missing) {
      if (last !== member) {
        console.log('  ' + member)
      }
      console.log('    ' + file)
      last = member
    }
    if (missingPublicationInfo) {
      console.log('\n  put missing publication information in:\n    bibliography.bib')
    }
    if (missingFiles) {
      console.log('\n  put missing files in:\n    .pdf   assets/pdf/\n    .png   assets/img/teaser/')
    }
  }

  // Missing member info
  let missingInfo = false
  let firstPrint = true
  for (const member of memberConfig) {
    let missingForMember = []
    if (member.role && member.role.includes('alumnus')) {
      // Ignore alumni
      continue
    }
    if (member.title === '') {
      missingForMember.push('a title')
    }
    if (member.role === '') {
      missingForMember.push('a role')
    }
    if (member.path === '') {
      missingForMember.push('a path')
    }
    if (member.bio === '') {
      missingForMember.push('a bio')
    }
    if (member.research.length === 0) {
      missingForMember.push('research interests')
    }
    const links = member.links.map(d => d.text)
    if (!links.includes('University of Stuttgart website')) {
      missingForMember.push('a University link')
    }
    if (!links.includes('ORCID')) {
      missingForMember.push('an ORCID link')
    }
    if (!links.includes('Google Scholar')) {
      missingForMember.push('a Google Scholar link')
    }
    if (!allPeopleImages.has(member.path + '.jpg')) {
      missingForMember.push('a profile picture')
    }

    // Create report
    if (missingForMember.length > 0) {
      if (firstPrint) {
        console.log(`\n\nmissing member information:`)
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
 * Formats bibtex for more beautiful and uniform display
 *
 * @see https://github.com/FlamingTempura/bibtex-tidy
 * @param {string} key pub key (for debugging logs)
 * @param {string} bibtexString bibtex string
 */
function formatBibtex(key, bibtexString) {
  try {
    const formatted = tidy(bibtexString, {
      omit: ['abstract', 'acks', 'address', 'badge', 'note', 'pdf', 'suppl', 'url2', 'venue', 'video', 'video2'],
      curly: true,
      space: 4,
      align: 14,
      stripEnclosingBraces: true,
      sortFields: true,
      removeEmptyFields: true,
      lowercase: true,
    })
    return formatted.bibtex
  } catch (e) {
    console.warn(`Invalid bibtex for pub with key ${key}`)
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
      dark: '#444',  // Dots
      light: '#0000' // Transparent background
    },
    errorCorrectionLevel: 'Q',
    scale: 12,
    margin: 0,
  }

  // For publications
  for (const pub of publications) {
    const key = pub['key']
    const path = `${dir}/${key}.png`
    // Check if QR code image already exists
    if (existsSync(path)) { continue }
    const url = `${pageUrl}/pub/${key}.html`
    QRCode.toFile(path, url, options)
    count++
  }

  // For people
  for (const m of memberConfig) {
    const path = `${dir}/${m.path}.png`
    // Check if QR code image already exists
    if (existsSync(path)) { continue }
    const url = `${pageUrl}/members/${m.path}.html`
    QRCode.toFile(path, url, options)
    count++
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
