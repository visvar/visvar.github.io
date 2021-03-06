import { createReadStream, readFileSync, writeFileSync, readdirSync } from 'node:fs'
import csv from 'fast-csv'
// import querystring from 'querystring';

const file = './Papers.csv'
const members = [
  'Aimee Sousa Calepso',
  'Alexander Achberger',
  'Frank Heyen',
  'Jonas Haischt',
  'Katrin Angerbauer',
  'Melissa Reinelt',
  'Michael Sedlmair',
  'Natalie Hube',
  'Quynh Ngo',
  'Rene Cutura',
  'Ruben Bauer',
  'Sebastian Rigling',
  'Simeon Rau',
  'Xingyao Yu',
]

const pageUrl = 'https://visvar.github.io'
const pageTitle = 'VISVAR Research Group, University of Stuttgart'

const memberPaths = members.map(member => {
  return member
    .trim()
    .split(' ')
    .join('_')
    .toLowerCase()
  // TODO: url encode!
})
// .map(d => querystring.stringify(d'));

const headerAndNav = `
<header>
  <div>
    <a href="${pageUrl}/">
      <h1 class="h1desktop"><div>VISVAR</div><div>Research</div><div>Group</div></h1>
      <h1 class="h1mobile">VISVAR</h1>
    </a>
  </div>
  <div>
    <nav>
      <ul>
        <li>
          <a href="${pageUrl}/#aboutus">about VISVAR</a>
        </li>
        <li>
          <a href="${pageUrl}/#publications">publications</a>
        </li>
        <li class="memberNav">
          <a href="${pageUrl}/#members">members</a>
        </li>
        <ul class="memberNav">
          ${members.map((d, i) => `
            <li><a href="${pageUrl}/members/${memberPaths[i]}.html">${d}</a></li>
          `).join('')}
        </ul>
      </ul>
    </nav>
  </div>
</header>`

const allImages = new Set(readdirSync("img"))
const allPdfs = new Set(readdirSync("pdf"))
const allVideos = new Set(readdirSync("video"))
const allSuppl = new Set(readdirSync("suppl"))
const publications = []
const stream = createReadStream(file)

// Main loop
csv
  .parseStream(stream, { headers: true })
  .on('data', data => data.Title !== '' && publications.push(data))
  .on('end', createPages)

/**
 * Creates all HTML pages
 */
function createPages () {
  console.log(`${publications.length} publications`)
  // Sort by date descending, so newest at top of page
  publications.sort((a, b) => a['Date'] > b['Date'] ? -1 : 1
  )
  // Main page
  createMainPageHtml(publications)
  // Member / author pages
  for (const [index, member] of members.entries()) {
    const authoredPubs = publications.filter(d => {
      return d['First Author'].includes(member)
        || d['Other Authors'].includes(member)
    })
    const fileName = memberPaths[index]
    createMemberPageHtml(member, fileName, authoredPubs)
  }
  // Publication pages
  for (const pub of publications) {
    createPublicationPageHtml(pub)
  }
  // Export papers.json
  writeFileSync('papers.json', JSON.stringify(publications))
  // Detect missing and extra files
  let missing = []
  let extra = []
  for (const pub of publications) {
    const key = pub['Key (e.g. for file names)']
    if (!allImages.has(`${key}.png`)) { missing.push(`${key}.png`) }
    let pdf = pub['PDF URL (public)']
    if ((!pdf || pdf === "") && !allPdfs.has(`${key}.pdf`)) { missing.push(`${key}.pdf`) }
  }
  console.log(`\nmissing files:\n${missing.join("\n")}`)
  const allKeys = new Set(publications.map(d => d['Key (e.g. for file names)']))
  const allFiles = [...allImages, ...allPdfs, ...allVideos, ...allSuppl]
  const ignore = new Set(["small", "people", "favicon.png", "visvar_logo.svg"])
  for (const f of allFiles) {
    const key = f.slice(0, f.lastIndexOf("."))
    if (!allKeys.has(key) && !ignore.has(f)) {
      extra.push(f)
    }
  }
  console.log(`\nextra files:\n${extra.join("\n")}`)
}

/**
 * Creates HTML from the CSV data
 */
function createMainPageHtml (published) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pageTitle}</title>
  <link rel="stylesheet" href="./style.css">
  <script src="./script.js"></script>
  <link rel="shortcut icon" href="./img/favicon.png">
  <link rel="icon" type="image/png" href="./img/favicon.png" sizes="256x256">
  <link rel="apple-touch-icon" sizes="256x256" href="./img/favicon.png">
</head>
<body>
  <a class="anchor" name="top"></a>
  <main>
    <div>
      ${headerAndNav}
    </div>
    <div>
      <article> <a class="anchor" name="aboutus"></a>
        ${readFileSync('./aboutus.html')}
      </article>
      <article> <a class="anchor" name="members"></a>
        <h1>Members</h1>
        <div class="memberList">
          ${members.map((member, index) => `
            <div>
              <a href="./members/${memberPaths[index]}.html">
                <img class="avatar" src="./img/people/small/${memberPaths[index]}.jpg" />
                <div>${member}</div>
              </a>
            </div>
            `).join('\n')}
        </div>
      </article>
      <article> <a class="anchor" name="publications"></a>
        <h1>Publications</h1>
        ${createPublicationsHtml(published)}
      </article>
    </div>
  </main>
</body>
</html>`
  writeFileSync('./index.html', html)
}

/**
 * Creates HTML from the CSV data
 */
function createMemberPageHtml (member, fileName, publications) {
  // Create HTML
  const publicationsHtml = createPublicationsHtml(publications, true)
  // Read nav and about us page
  let about = ''
  const aboutFile = `./about/${fileName}.html`
  try {
    about = readFileSync(aboutFile)
  } catch {
    console.warn(`No about found for ${member}, ${aboutFile} is missing`)
  }
  // Combine HTML
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${member} | ${pageTitle}</title>
  <link rel="stylesheet" href="../style.css">
  <script src="../script.js"></script>
  <link rel="shortcut icon" href="../img/favicon.png">
  <link rel="icon" type="image/png" href="../img/favicon.png" sizes="256x256">
  <link rel="apple-touch-icon" sizes="256x256" href="../img/favicon.png">
</head>
<body>
  <a class="anchor" name="top"></a>
  <main>
    <div>
      ${headerAndNav}
    </div>
    <div>
      <article> <a class="anchor" name="aboutus"></a>
        ${about}
      </article>
      <article> <a class="anchor" name="publications"></a>
        <h1>Publications</h1>
        ${publicationsHtml}
      </article>
    </div>
  </main>
</body>
</html>`
  const outFile = `./members/${fileName}.html`
  writeFileSync(outFile, html)
}

/**
 * Creates HTML for an Array of publications extracted from the CSV
 *
 * @param {object[]} publications publications
 * @param {boolean} [isMember=false] is this a member page?
 * @returns {string} HTML
 */
function createPublicationsHtml (publications, isMember = false) {
  const p = isMember ? '..' : '.'
  return publications.map((pub, i) => {
    const key = pub['Key (e.g. for file names)']
    const image = `${p}/img/small/${key}.png`
    const year = pub['Date'].slice(0, 4)
    const website = pub['Publisher URL (official)']
    const imageExists = allImages.has(`${key}.png`)
    // PDF, video, and supplemental might be a link instead of file
    let pdf = pub['PDF URL (public)']
    let pdfExists = allPdfs.has(`${key}.pdf`)
    if (!pdfExists && pdf && pdf !== '') {
      pdfExists = true
    } else {
      pdf = `${p}/pdf/${key}.pdf`
    }
    let video = pub['Video']
    let videoExists = allVideos.has(`${key}.mp4`)
    if (!videoExists && video && video !== '') {
      videoExists = true
    } else {
      video = `${p}/video/${key}.mp4`
    }
    let suppl = pub['Supplemental']
    let supplExists = allSuppl.has(`${key}.zip`)
    if (!supplExists && suppl && suppl !== '') {
      supplExists = true
    } else {
      suppl = `${p}/suppl/${key}.zip`
    }

    return `
  ${i === 0 || year !== publications[i - 1]['Date'].slice(0, 4)
        ? `<h2>${year}</h2>` : ''}
  <div class="paper small" id="paper${key}">
    ${imageExists
        ? `
      <img
        id="image${key}"
        title="Click to enlarge and show details"
        onclick="toggleClass('paper${key}', 'small'); toggleImageSize(this)"
        class="publicationImage small"
        src="${image}"
      />`
        : ''
      }
    <div class="metaData ${imageExists ? '' : 'noImage'}">
      <h3
        onclick="toggleClass('paper${key}', 'small'); toggleImageSize(image${key})"
        title="Click to show details"
      >
        ${pub['Title']}<a class="anchor" name="${key}"></a>
      </h3>
      <div>
        ${pub['First Author']}${pub['Other Authors'] !== '' ? ',' : ''} ${pub['Other Authors']}
      </div>
      <div>
        ${pub['Submission Target']} (${year}) ${pub['Type']}
        ${website && website !== '' ? `<a href="${website}" target="_blank">website</a>` : ''}
        ${pdfExists ? `<a href="${pdf}" target="_blank">PDF</a>` : ''}
        ${videoExists ? `<a href="${video}" target="_blank">video</a>` : ''}
        ${supplExists ? `<a href="${suppl}" target="_blank">supplemental</a>` : ''}
      </div>
    </div>
    <div class="info">
      ${pub['Abstract']
        ? `<h4>Abstract</h4><div class="abstract">${pub['Abstract']}</div>`
        : ''
      }
      ${pub['bibtex']
        ? `<h4>BibTex</h4><div class="bibtex"><textarea>${pub['bibtex'].trim()}</textarea></div>`
        : ''
      }
      ${pub['Acknowledgements']
        ? `<h4>Acknowledgements</h4><div class="abstract">${pub['Acknowledgements']}</div>`
        : ''
      }
      <div>
        <a href="${pageUrl}/pub/${key}.html" target="_blank">direct link</a>
      </div>
    </div>
  </div>
  `
  }).join('')
}

/**
 * Creates the page for a single publication
 */
function createPublicationPageHtml (pub) {
  const key = pub['Key (e.g. for file names)']
  const year = pub['Date'].slice(0, 4)
  const website = pub['Publisher URL (official)']
  const imageExists = allImages.has(`${key}.png`)
  // PDF, video, and supplemental might be a link instead of file
  let pdf = pub['PDF URL (public)']
  let pdfExists = allPdfs.has(`${key}.pdf`)
  if (!pdfExists && pdf && pdf !== '') {
    pdfExists = true
  } else {
    pdf = `../pdf/${key}.pdf`
  }
  let video = pub['Video']
  let videoExists = allVideos.has(`${key}.mp4`)
  if (!videoExists && video && video !== '') {
    videoExists = true
  } else {
    video = `../video/${key}.mp4`
  }
  let suppl = pub['Supplemental']
  let supplExists = allSuppl.has(`${key}.zip`)
  if (!supplExists && suppl && suppl !== '') {
    supplExists = true
  } else {
    suppl = `../suppl/${key}.zip`
  }
  // Create HTML
  const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${pub["Title"]} | ${pageTitle}</title>
      <link rel="stylesheet" href="../style.css">
      <script src="../script.js"></script>
      <link rel="shortcut icon" href="../img/favicon.png">
      <link rel="icon" type="image/png" href="../img/favicon.png" sizes="256x256">
      <link rel="apple-touch-icon" sizes="256x256" href="../img/favicon.png">
    </head>
    <body>
      <a class="anchor" name="top"></a>
      <main>
        <div>
          ${headerAndNav}
        </div>
        <div>
          <article> <a class="anchor" name="publications"></a>
            <h1>${pub["Title"]}</h1>
            <div class="pubPageContent">
              <div class="pubImage">
              ${imageExists ? `<img id="image${key}" src="../img/${key}.png"/>` : ''}
              </div>
              <div>
              ${pub['Submission Target']} (${year}) ${pub['Type']}
              </div>
              <h4>Authors</h4>
              <div>
              ${pub['First Author']}${pub['Other Authors'] !== '' ? ',' : ''} ${pub['Other Authors']}
              </div>
              <h4>Materials</h4>
              <div>
                ${website && website !== '' ? `<a href="${website}" target="_blank">website</a>` : ''}
                ${pdfExists ? `<a href="${pdf}" target="_blank">PDF</a>` : ''}
                ${videoExists ? `<a href="${video}" target="_blank">video</a>` : ''}
                ${supplExists ? `<a href="${suppl}" target="_blank">supplemental</a>` : ''}
              </div>
              ${pub['Abstract'] ? `<h4>Abstract</h4><div class="abstract">${pub['Abstract']}</div>` : ''}
              ${pub['bibtex'] ? `<h4>BibTex</h4><div class="bibtex"><textarea>${pub['bibtex'].trim()}</textarea></div>` : ''}
              ${pub['Acknowledgements'] ? `<h4>Acknowledgements</h4><div class="abstract">${pub['Acknowledgements']}</div>` : ''}
            </div>
          </div>
          </article>
        </div>
      </main>
    </body>
    </html>`
  const outFile = `./pub/${pub['Key (e.g. for file names)']}.html`
  writeFileSync(outFile, html)
}
