import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs'
import QRCode from 'qrcode'
import { pageUrl, pageTitle, allowedMissingPDF, allowedPDFLink, allowedArxiv, allowedMissingDOI, memberConfig } from '../config.js'
import pkg from 'bibtex-tidy'
import open from 'open'
const { tidy } = pkg
import bibtex from "@hygull/bibtex"

let printEmails = false
const argument = process.argv[2]

if (argument) {
  if (argument === 'email') {
    printEmails = true
  } else {
    console.log(`Received invalid argument ${argument} and ignoring it.`)
  }
}

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
const pubs_group = bib.getBibAsObject('./bibliography_group.bib')
const pubs_prior = bib.getBibAsObject('./bibliography_prior.bib')
const publications = pubs_group.concat(pubs_prior)

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
})

// Sort publications by year and month descending, then title ascending
pubs_group.sort((a, b) => {
  if (parseInt(a['data']['year']) !== parseInt(b['data']['year']))
    return parseInt(b['data']['year']) - parseInt(a['data']['year'])
  else if (parseInt(b['data']['month']) !== parseInt(a['data']['month']))
    return parseInt(b['data']['month']) - parseInt(a['data']['month'])
  return a['data']['title'].localeCompare(b['data']['title'])
})

pubs_prior.sort((a, b) => {
  if (parseInt(a['data']['year']) !== parseInt(b['data']['year']))
    return parseInt(b['data']['year']) - parseInt(a['data']['year'])
  else if (parseInt(b['data']['month']) !== parseInt(a['data']['month']))
    return parseInt(b['data']['month']) - parseInt(a['data']['month'])
  return a['data']['title'].localeCompare(b['data']['title'])
})

publications.sort((a, b) => {
  if (parseInt(a['data']['year']) !== parseInt(b['data']['year']))
    return parseInt(b['data']['year']) - parseInt(a['data']['year'])
  else if (parseInt(b['data']['month']) !== parseInt(a['data']['month']))
    return parseInt(b['data']['month']) - parseInt(a['data']['month'])
  return a['data']['title'].localeCompare(b['data']['title'])
})

console.log('\n\n')
console.log('Stats:')
console.log(`  ${publications.length} publications`)
console.log(`  ${allTeasers.size - 1} teasers`) // -1 for the 'small' folder
console.log(`  ${allPdfs.size} pdfs`)

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
  // Member / author pages
  for (const member of memberConfig) {
    const authoredPubsGroup = pubs_group.filter(d => d['data']['author'].includes(member.name))
    const authoredPubsPrior = pubs_prior.filter(d => d['data']['author'].includes(member.name))
    createMemberPageHtml(member, authoredPubsGroup, authoredPubsPrior)
  }

  // Main page and imprint
  createMainPageHtml(pubs_group, memberConfig)
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
    // Sorting rules: first professors, then postdocs, then phds
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

    // Sort members of the same role by name
    return a.name < b.name ? -1 : 1
  }))

  const associatedList = getMemberHtml(memberConfig.filter(d => d.role === 'associatedpostdoc' | d.role === 'associatedphd').sort((a, b) => {
    // Sorting rules: postdoc before phd
    if (a.role === 'associatedpostdoc' && b.role === 'associatedphd') {
      return -1
    } if (a.role === 'associatedphd' && b.role === 'associatedpostdoc') {
      return 1
    }

    // Sort members of the same role by name
    return a.name < b.name ? -1 : 1
  }))

  const alumniList = getMemberHtml(memberConfig.filter(d => d.role === 'alumnuspostdoc' | d.role === 'alumnusphd').sort((a, b) => {
    // Sorting rules: postdoc before phd
    if (a.role === 'alumnuspostdoc' && b.role === 'alumnusphd') {
      return -1
    } if (a.role === 'alumnusphd' && b.role === 'alumnuspostdoc') {
      return 1
    }

    // Sort members of the same role by name
    return a.name < b.name ? -1 : 1
  }))

  const html = `${htmlHead(pageTitle)}
<body>
  <main>
    ${headerAndNav('.', 'home')}
    <div>
      <article><a class="anchor" name="aboutus"></a>
        ${readFileSync('./aboutus.html')}
      </article>
      <article>
        <h1 id="members">Members</h1>
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
        <h1 id="publications">Publications</h1>
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
function createMemberPageHtml(member, authoredPubsGroup, authoredPubsPrior) {
  const title = `${member.title} | ${pageTitle}`
  var html = `${htmlHead(title, '..')}
<body>
  <main>
    ${headerAndNav('..', 'member', authoredPubsGroup.length, authoredPubsPrior.length)}
    <div>
      <article>
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
      </article>`

  if (authoredPubsGroup.length > 0) {
    html += `
      <article>
        <h1 id="publications">Publications</h1>
        ${createPublicationsHtml(authoredPubsGroup, member)}
      </article>`
  }
  if (authoredPubsPrior.length > 0) {
    html += `
      <article>
        <h1 id="formerpublications">Former Publications</h1>
        ${createPublicationsHtml(authoredPubsPrior, member)}
      </article>`
  }
  html += `
      <article>
        <div class="qrcontainer">
          <div class="qrtitle">Link to this page:</div>
          <img class="qrimage" src="../assets/img/qr/${member.path}.png"/>
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
    const footNoteIndices = pub['data']['footnoteindices']
    const footnoteText = pub['data']['footnotetext']
    const imageExists = allTeasers.has(`${key}.png`)

    // PDF, video, and supplemental might be a link instead of file
    let pdfLink = pub['data']['pdf']
    let pdfFile = allPdfs.has(`${key}.pdf`)
    let pdfIsLink = false
    if (!pdfFile && pdfLink) {
      pdfFile = true
      pdfIsLink = true
    } else {
      pdfLink = `${p}/assets/pdf/${key}.pdf`
    }

    let videoHTML = ''
    let videoLink = pub['data']['video']
    let videoFile = allVideos.has(`${key}.mp4`)
    if (videoFile) {
      videoHTML = `<a href="${p}/assets/video/${key}.mp4" target="_blank" rel="noreferrer">video</a>`
    } else if (videoLink) {
      if (videoLink.includes("youtube.com/embed")) {
        videoHTML = `<a href="https://www.youtube.com/watch?v=${videoLink.split("embed/")[1].split("?")[0]}" target="_blank" rel="noreferrer">video [link]</a>`
      } else {
        videoHTML = `<a href="${videoLink}" target="_blank" rel="noreferrer">video [link]</a>`
      }
    }

    let video2HTML = ''
    let video2Link = pub['data']['video2']
    let video2File = allVideos.has(`${key}_2.mp4`)
    if (video2File) {
      video2HTML = `<a href="${p}/assets/video/${key}_2.mp4" target="_blank" rel="noreferrer">video</a>`
    } else if (video2Link) {
      if (video2Link.includes("youtube.com/embed")) {
        video2HTML = `<a href="https://www.youtube.com/watch?v=${video2Link.split("embed/")[1].split("?")[0]}" target="_blank" rel="noreferrer">video [link]</a>`
      } else {
        video2HTML = `<a href="${video2Link}" target="_blank" rel="noreferrer">video [link]</a>`
      }
    }

    let supplLink = pub['data']['suppl']
    let supplFile = allSuppl.has(`${key}.zip`)
    let supplIsLink = false
    if (!supplFile && supplLink) {
      supplFile = true
      supplIsLink = true
    } else {
      supplLink = `${p}/assets/suppl/${key}.zip`
    }

    var footNoteIndicesList = []
    if (footNoteIndices) {
      footNoteIndicesList = footNoteIndices.split(',').map(Number)
    }

    const authors = pub['data']['author'].split(',').map(d => d.trim())
    const authorHtml = authors.map((d, i) => {
      // If this is the author's member page, make them bold
      var text = ''
      if (footNoteIndicesList.includes(i)) {
        text = d === member?.name ? `<b>${d}*</b>` : `${d}*`
      } else {
        text = d === member?.name ? `<b>${d}</b>` : `${d}`
      }
      // If author is a group member, link to their page
      if (nameMemberMap.has(d)) {
        return `<a href="${p}/members/${nameMemberMap.get(d).path}.html">${text}</a>`
      }
      return text
    }).join(', ')

    var badgesHTML = ''
    if (pub['data']['badge']) {
      pub['data']['badge'].split(',').forEach(badge => {
        badgesHTML += `<img style="height:1em; width:auto; vertical-align: sub;" src="${p}/assets/img/badges/${badge}.png"/> `
      });
    }

    return `
  ${i === 0 || year !== publications[i - 1]['data']['year']
        ? `<h2 class="yearHeading">${year}</h2>` : ''}
  <div class="paper" id="paper${key}">
    ${imageExists
        ? `
      <a href="${p}/pub/${key}.html">
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
        <a href="${p}/pub/${key}.html"> ${badgesHTML}${pub['data']['title']}
        </a>
      </h3>
      <div class="authors">
        ${authorHtml}
      </div>
        ${footNoteIndices ? `<div>*${footnoteText}</div>` : ''}
      <div>
        ${venue} (${year})
      </div>
      <div class="links">
        ${doi && doi !== '' ? `<a href="${doi}" target="_blank" rel="noreferrer">DOI</a>` : ''}
        ${url && url !== '' ? `<a href="${url}" target="_blank" rel="noreferrer">link</a>` : ''}
        ${url2 && url2 !== '' ? `<a href="${url2}" target="_blank" rel="noreferrer">link</a>` : ''}
        ${pdfFile ? pdfIsLink ? `<a href="${pdfLink}" target="_blank" rel="noreferrer">PDF [link]</a>` : `<a href="${pdfLink}" target="_blank" rel="noreferrer">PDF</a>` : ''}
        ${supplFile ? supplIsLink ? `<a href="${supplLink}" target="_blank" rel="noreferrer">supplemental [link]</a>` : `<a href="${supplLink}" target="_blank" rel="noreferrer">supplemental</a>` : ''}
        ${videoHTML}
        ${video2HTML}
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
  const footNoteIndices = pub['data']['footnoteindices']
  const footnoteText = pub['data']['footnotetext']
  const imageExists = allTeasers.has(`${key}.png`)

  // PDF, video, and supplemental might be a link instead of file
  let pdfLink = pub['data']['pdf']
  let pdfFile = allPdfs.has(`${key}.pdf`)
  let pdfIsLink = false
  if (!pdfFile && pdfLink) {
    pdfFile = true
    pdfIsLink = true
  } else {
    pdfLink = `../assets/pdf/${key}.pdf`
  }

  let videoHTML = ''
  let videoLink = pub['data']['video']
  let videoFile = allVideos.has(`${key}.mp4`)
  if (videoFile) {
    videoHTML = `<a href="../assets/video/${key}.mp4" target="_blank" rel="noreferrer">video</a>`
  } else if (videoLink) {
    if (videoLink.includes("youtube.com/embed")) {
      videoHTML = `<p><iframe width="560" height="315" src="${videoLink}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></p>`
    } else {
      videoHTML = `<a href="${videoLink}" target="_blank" rel="noreferrer">video [link]</a>`
    }
  }

  let video2HTML = ''
  let video2Link = pub['data']['video2']
  let video2File = allVideos.has(`${key}_2.mp4`)
  if (video2File) {
    video2HTML = `<a href="../assets/video/${key}_2.mp4" target="_blank" rel="noreferrer">video</a>`
  } else if (video2Link) {
    if (video2Link.includes("youtube.com/embed")) {
      video2HTML = `<p><iframe width="560" height="315" src="${video2Link}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></p>`
    } else {
      video2HTML = `<a href="${video2Link}" target="_blank" rel="noreferrer">video [link]</a>`
    }
  }

  let supplLink = pub['data']['suppl']
  let supplFile = allSuppl.has(`${key}.zip`)
  let supplIsLink = false
  if (!supplFile && supplLink) {
    supplFile = true
    supplIsLink = true
  } else {
    supplLink = `../assets/suppl/${key}.zip`
  }

  var footNoteIndicesList = []
  if (footNoteIndices) {
    footNoteIndicesList = footNoteIndices.split(',').map(Number)
  }

  const authors = pub['data']['author'].split(',').map(d => d.trim())
  const authorHtml = authors.map((d, i) => {
    // If this is the author's member page, make them bold
    var text = ''
    text = footNoteIndicesList.includes(i) ? `${d}*` : `${d}`

    // If author is a group member, link to their page
    if (nameMemberMap.has(d)) {
      return `<a href="../members/${nameMemberMap.get(d).path}.html">${text}</a>`
    }
    return text
  }).join(', ')

  var badgesHTML = ''
  if (pub['data']['badge']) {
    pub['data']['badge'].split(',').forEach(badge => {
      badgesHTML += ` <img style="height:1em; width:auto; vertical-align: sub;" src="../assets/img/badges/${badge}.png"/>`
    });
  }

  const title = `${pub['data']['title']}`

  const html = `${htmlHead(title, '..')}
    <body>
      <main>
        ${headerAndNav('..', 'publication')}
        <div>
          <article>
            <h1>${title}</h1>
            <div class="pubPageContent">
              ${imageExists ? `
              <a href="../assets/img/teaser/${key}.png" target="_blank" title="show image full size">
                <img class="teaser" id="image${key}" src="../assets/img/teaser/${key}.png"/>
              </a>` : ''}
              <div>
                <div class="authors">
                  <b>Authors.</b> ${authorHtml}
                </div>
                  ${footNoteIndices ? `<div>*${footnoteText}</div>` : ''}
                <div>
                  <b>Venue.</b> ${venue} (${year})
                </div>
                <div class="materials">
                  <b>Materials.</b>
                  ${doi && doi !== '' ? `<a href="${doi}" target="_blank" rel="noreferrer">DOI</a>` : ''}
                  ${url && url !== '' ? `<a href="${url}" target="_blank" rel="noreferrer">link</a>` : ''}
                  ${url2 && url2 !== '' ? `<a href="${url2}" target="_blank" rel="noreferrer">link</a>` : ''}
                  ${pdfFile ? pdfIsLink ? `<a href="${pdfLink}" target="_blank" rel="noreferrer">PDF [link]</a>` : `<a href="${pdfLink}" target="_blank" rel="noreferrer">PDF</a>` : ''}
                  ${supplFile ? supplIsLink ? `<a href="${supplLink}" target="_blank" rel="noreferrer">supplemental [link]</a>` : `<a href="${supplLink}" target="_blank" rel="noreferrer">supplemental</a>` : ''}
                  ${videoHTML}
                  ${video2HTML}
                </div>
                ${pub['data']['abstract'] ? `<div class="abstract"><b>Abstract.</b> ${pub['data']['abstract']}</div>` : ''}
                ${`<div class="bibtex"><textarea>${formatBibtex(pub['key'], bib.getBibCodeFromObject(pub, 3))}</textarea></div>`}
                ${pub['data']['acks'] ? `<div class="abstract"><b>Acknowledgements.</b> ${pub['data']['acks']}</div>` : ''}
                ${pub['data']['note'] ? `<div>${pub['data']['note']}
                  ${pub['data']['badge'] ? badgesHTML : ''}
                </div>` : ''}
                <div class="qrcontainer">
                  <div class="qrtitle">Link to this page:</div>
                  <img class="qrimage" src="../assets/img/qr/${key}.png"/>
                </div>
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

    <!-- OG Metadata -->
    <meta property="og:site_name" content="HCI VISUS" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${pageTitle}" />
    <meta property="og:url" content="https://visvar.github.io/" />
    <meta property="og:description" content="All about the people and their research at the HCI group at VISUS, University of Stuttgart." />
    <meta property="og:image" content="https://visvar.github.io/assets/img/misc/hcivisus.png" />
    <meta property="og:locale" content="EN" />

    <!-- Twitter card -->
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title"  content="${pageTitle}" />
    <meta name="twitter:description" content="All about the people and their research at the HCI group at VISUS, University of Stuttgart." />
    <meta name="twitter:image" content="https://visvar.github.io/assets/img/misc/hcivisus.png" />
  </head>
  `
}

/**
 * Generates the HTML header of a page
 * @param {'.'|'..'} [path=.] either '.' for index.html or '..' for others
 * @returns {string} HTML code
 */
function headerAndNav(path = '.', pageType, groupPubs, priorPubs) {
  let html = `
  <div>
  <header>
    <div>
      <a href="${path}/index.html">
        <img class="logo" src="${path}/assets/img/misc/hci.svg" />
      </a>
    </div>
    <div>
      <nav>
        <ul>`
  if (pageType == 'home') {
    html += `
          <li><a href="${path}/index.html#aboutus">about us</a></li>
          <li><a href="${path}/index.html#members">members</a></li>
          <li><a href="${path}/index.html#publications">publications</a></li>`
  } else if (pageType == 'member') {
    html += `
          <li><a href="${path}/index.html">home</a></li>
          ${groupPubs > 0 ? `<li><a href="#publications">publications</a></li>` : ''}
          ${priorPubs > 0 ? `<li><a href="#formerpublications">former publications</a></li>` : ''}`
  } else {
    html += `
          <li><a href="${path}/index.html">home</a></li>`
  }
  html += `
        </ul>
      </nav>
    </div>
  </header>
</div>`

  return html
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
  <main>
    ${headerAndNav()}
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

  // Missing files and information
  let missingPublicationInfo = false
  let missingFiles = false
  let missingPdfFileGotLink = false
  let missingData = {}

  // Function to add an item to one of the two lists for a given key
  function addMissing(member, list, item) {
    if (!missingData[member]) {
      // Initialize the key with two empty lists if it doesn't exist
      missingData[member] = {
        personal: [],
        publication: [],
        pdfIsLink: false
      }
    }

    // Add the item to the specified list
    if (list === 'personal') {
      missingData[member].personal.push(item)
    } else if (list === 'publication') {
      missingData[member].publication.push(item)
    } else if (list === 'pdfIsLink') {
      missingData[member].pdfIsLink = true
    } else {
      console.error("Invalid list:", list)
    }
  }

  for (const pub of publications) {
    const key = pub['key']

    // Missing publication info
    if (!pub['data']['doi'] || pub['data']['doi'] === '') {
      if (!allowedMissingDOI.includes(key)) {
        missingPublicationInfo = true
        addMissing(getResp(pub), 'publication', `${key} is missing a doi`)
      }
    } else {
      if (!pub['data']['doi'].includes('http')) {
        missingPublicationInfo = true
        addMissing(getResp(pub), 'publication', `${key} the doi is not a link`)
      }
      if (pub['data']['doi'].toLowerCase().includes('arxiv') && !allowedArxiv.includes(key)) {
        missingPublicationInfo = true
        addMissing(getResp(pub), 'publication', `${key} the doi is not final but arxiv`)
      }
    }
    if (!pub['data']['venue'] || pub['data']['venue'] === '') {
      missingPublicationInfo = true
      addMissing(getResp(pub), 'publication', `${key} is missing a venue`)
    }
    if (!pub['data']['abstract'] | pub['data']['abstract'] === '') {
      missingPublicationInfo = true
      addMissing(getResp(pub), 'publication', `${key} is missing an abstract`)
    }
    if (pub['data']['badge'] && !pub['data']['note']) {
      missingPublicationInfo = true
      addMissing(getResp(pub), 'publication', `${key} is missing info about the badge in the note`)
    }

    // Missing files
    // Publication teaser images
    if (!allTeasers.has(`${key}.png`)) {
      missingFiles = true
      addMissing(getResp(pub), 'publication', `${key} is missing a teaser image`)
    }
    // Publication PDF
    let pdfLink = pub['data']['pdf']
    let pdfFile = allPdfs.has(`${key}.pdf`)

    // No file, no exception
    if (!pdfFile && !allowedMissingPDF.includes(key)) {
      // Is a link, but no exception
      if (pdfLink) {
        // link not allowed if not excepted and published since joining the group
        if (!allowedPDFLink.includes(key) && pubs_group.includes(pub)) {
          missingPdfFileGotLink = true
          addMissing(getResp(pub), 'publication', `${key} is missing a pdf file`)
          addMissing(getResp(pub), 'pdfIsLink', '')
        }
        // no pdf, not even a link
      } else {
        missingFiles = true
        if (pubs_prior.includes(pub)) {
          addMissing(getResp(pub), 'publication', `${key} is missing a pdf file or link`)
        } else {
          addMissing(getResp(pub), 'publication', `${key} is missing a pdf file`)
        }
      }
    }
  }

  // Missing member info
  let missingInfo = false
  for (const member of memberConfig) {
    if (member.role && member.role.includes('alumnus')) {
      // Ignore alumni
      continue
    }
    if (member.title === '') {
      missingInfo = true
      addMissing(member.name, 'personal', 'is missing a title')
    }
    if (member.role === '') {
      missingInfo = true
      addMissing(member.name, 'personal', 'is missing a role')
    }
    if (member.path === '') {
      missingInfo = true
      addMissing(member.name, 'personal', 'is missing a path')
    }
    if (member.bio.trim() === '') {
      missingInfo = true
      addMissing(member.name, 'personal', 'is missing a bio')
    }
    if (member.research.length === 0) {
      missingInfo = true
      addMissing(member.name, 'personal', 'is missing research interests')
    }
    const links = member.links.map(d => d.text)
    if (!links.includes('University of Stuttgart website')) {
      missingInfo = true
      addMissing(member.name, 'personal', 'is missing a University link')
    }
    if (!links.includes('ORCID')) {
      missingInfo = true
      addMissing(member.name, 'personal', 'is missing an ORCID link')
    }
    if (!links.includes('Google Scholar')) {
      missingInfo = true
      addMissing(member.name, 'personal', 'is missing a Google Scholar link')
    }
    if (!allPeopleImages.has(member.path + '.jpg')) {
      missingInfo = true
      addMissing(member.name, 'personal', 'is missing a profile picture')
    }
  }

  // Create Report
  if (printEmails) {
    console.log(`\n\n\nPreparing emails for missing files and information\n`)
    var subject = `\n\n\nNotification/ Reminder: Missing Information on the HCI website\n\n\n`
    for (const [member, value] of Object.entries(missingData)) {
      var recipient = member
      var body = `Dear ${member},\n`
      body += "\nThis is a friendly notice/ reminder that there is some information missing on the HCI website from your:\n"

      if (value.publication.length > 0) {
        if (value.publication.length > 1) {
          body += 'Publications:\n'
        } else {
          body += 'Publication:\n'
        }
        value.publication.forEach(info => {
          body += '    ' + info + '\n'
        })
      }

      if (value.personal.length > 0) {
        body += 'Profile:\n'
        value.personal.forEach(info => {
          body += '  ' + info + '\n'
        })
      }

      body += "\nPlease update the information/ upload the files as described in the readme\n"
      body += "(https://github.com/visvar/visvar.github.io/blob/main/README.md) as soon as possible.\n"
      if (value.pdfIsLink) {
        body += "\nPDFs should be available as files (for pubs since joining the group). For the PDFs that are only linked, please add them as files."
        body += "If you think this is not possible (e.g., bc of rights) check the publisher rules.\n"
        body += "Still not sure? Talk to Michael.\n"
        body += "It is not possible? Write me (with approval from Michael) and I will supress this request next time.\n"
      }
      body += "\nIf you have a question or encounter any problems, please reach out to me.\n"
      body += "\nBest\nChris"

      triggerEmail(member, subject, body)
    }
  } else {
    console.log(`\n\n\nmissing files and information:\n`)
    for (const [member, value] of Object.entries(missingData)) {
      console.log(member)

      if (value.publication.length > 0) {
        console.log('  Publications:')
        value.publication.forEach(info => {
          console.log('    ' + info)
        })
      }

      if (value.personal.length > 0) {
        console.log('  Profile:')
        value.personal.forEach(info => {
          console.log('    ' + info)
        })
      }
    }

    console.log("----------------------------------------------\n----------------------------------------------")

    if (missingPublicationInfo) {
      console.log('\nadd missing publication information in:\n  bibliography.bib')
    }
    if (missingFiles) {
      console.log("\nput missing...\n  PDF's in assets/pdf/\n  PNG's in assets/img/teaser/")
    }
    if (missingPdfFileGotLink) {
      console.log("\nadd files for pdfs that are linked (for group publications).")
      console.log("  If you think this is not possible (e.g., bc of rights) check the publisher rules.")
      console.log("  Still not sure? Talk to Michael.")
      console.log("  It is not possible? Write chris (with approval from Michael) and he will supress this request next time.")
    }
    if (missingInfo) {
      console.log('\nadd missing personal info in\n  config.js\nput missing profile pictures in\n  assets/img/people')
    }
  }
}

async function triggerEmail(recipient, subject, body) {
  const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${encodeURIComponent(body)}`;

  try {
    console.log(`Opening mail client for ${recipient}...`);
    await open(mailtoUrl, { wait: true });
    console.log("Success: OS received the command.");
  } catch (error) {
    console.error("Failed to open mail client:", error);
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
      omit: ['abstract', 'acks', 'address', 'badge', 'note', 'pdf', 'suppl', 'url2', 'venue', 'video', 'video2', 'footnoteindices', 'footnotetext'],
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
