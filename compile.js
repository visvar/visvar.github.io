import { createReadStream, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import csv from 'fast-csv';
// import querystring from 'querystring';

const file = './Papers.csv';
const members = [
    'Aimee Sousa Calepso',
    'Alexander Achberger',
    'Frank Heyen',
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
];

const pageUrl = 'https://visvar.github.io';
const pageTitle = 'VISVAR Research Group, University of Stuttgart';

const memberPaths = members.map(member => {
    return member
        .trim()
        .split(' ')
        .join('_')
        .toLowerCase();
    // TODO: url encode!
});
// .map(d => querystring.stringify(d'));

const headerAndNav = `
<header>
    <div>
        <a href="${pageUrl}/">
            <h1 class="h1desktop">
                <div>
                    VISVAR
                </div>
                <div>
                    Research
                </div>
                <div>
                    Group
                </div>
            </h1>
            <h1 class="h1mobile">
                VISVAR
            </h1>
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
                        <li>
                            <a href="${pageUrl}/members/${memberPaths[i]}.html">
                                ${d}
                            </a>
                        </li>
                    `).join('')}
                </ul>
            </ul>
        </nav>
    </div>
</header>`;


const stream = createReadStream(file);
const papers = [];

// Main loop
csv
    .parseStream(stream, { headers: true })
    .on('data', data => data.Title !== '' && papers.push(data))
    .on('end', createPages);


/**
 * Creates all HTML pages
 */
function createPages() {
    console.log(`${papers.length} papers`);
    // Sort by date descending, so newest at top of page
    papers.sort((a, b) => a['Date'] > b['Date'] ? -1 : 1
    );
    // Main page
    createMainPageHtml(papers);
    // Member / author pages
    for (const [index, member] of members.entries()) {
        const authoredPapers = papers.filter(d => {
            return d['First Author'].includes(member)
                || d['Other Authors'].includes(member);
        });
        const fileName = memberPaths[index];
        createMemberPageHtml(member, fileName, authoredPapers);
    }
    // Export papers.json
    writeFileSync('papers.json', JSON.stringify(papers));
}

/**
 * Creates HTML from the CSV data
 */
function createMainPageHtml(published) {
    // Create HTML
    const papersHtml = createPublicationsHtml(published);
    // Read nav and about us page
    const aboutUs = readFileSync('./aboutus.html');
    // Create member list with avatars
    const memberList = createMemberListHtml();
    // Combine HTML
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
                ${aboutUs}
            </article>
            <article> <a class="anchor" name="members"></a>
                <h1>Members</h1>
                <div class="memberList">
                    ${memberList}
                </div>
            </article>
            <article> <a class="anchor" name="publications"></a>
                <h1>Publications</h1>
                ${papersHtml}
            </article>
        </div>
    </main>
</body>
</html>`;
    writeFileSync('./index.html', html);
    console.log(`Wrote index.html`);
}

/**
 * Creates HTML for an Array of papers extracted from the CSV
 *
 * @param {object[]} papers papers
 * @param {boolean} [isMember=false] is this a member page?
 * @returns {string} HTML
 */
function createPublicationsHtml(papers, isMember = false) {
    return papers.map((d, i) => {
        const key = d['Key (e.g. for file names)'];
        const image = `${isMember ? '..' : '.'}/img/small/${key}.png`;
        const year = d['Date'].slice(0, 4);
        const type = d['Type'];
        const publisher = d['Publisher URL (official)'];
        const supplemental = d['Supplemental'];
        // See if files are there
        const imageExists = existsSync(join('img', `${key}.png`));
        // PDF and video might be a link instead of file
        let pdf = d['PDF URL (public)'];
        let pdfExists = existsSync(join('pdf', `${key}.pdf`));
        if (!pdfExists && pdf && pdf !== '') {
            pdfExists = true;
        } else {
            pdf = `${isMember ? '..' : '.'}/pdf/${key}.pdf`;
        }
        let video = d['Video'];
        let videoExists = existsSync(join('video', `${key}.mp4`));
        if (!videoExists && video && video !== '') {
            videoExists = true;
        } else {
            video = `${isMember ? '..' : '.'}/video/${key}.mp4`;
        }
        // Check for missing files, but only when compiling main page (only once)
        if (!isMember) {
            if (!imageExists) {
                console.log(`  missing image: img/${key}.png`);
            }
            if (!pdfExists) {
                console.log(`  missing pdf:   pdf/${key}.pdf`);
            }
        }

        return `
    ${i === 0 || year !== papers[i - 1]['Date'].slice(0, 4)
                ? `
    <h2>
        ${year}
    </h2>
    `: ''}
    <div
        class="paper small"
        id="paper${key}"
    >
        ${imageExists
                ? `
            <img
                id="image${key}"
                title="Click to enlarge and show details"
                onclick="toggleClass('paper${key}', 'small'); toggleImageSize(this);"
                class="publicationImage small"
                src="${image}"
            />`
                : ''
            }
        <div class="metaData ${imageExists ? '' : 'noImage'}">
            <h3
                onclick="toggleClass('paper${key}', 'small'); toggleImageSize(image${key});"
                title="Click to show details"
            >
                ${d['Title']}
            </h3>  <a class="anchor" name="${key}"></a>
            <div class="authors">
                <span class="firstAuthor">${d['First Author']}</span>${d['Other Authors'] !== '' ? ',' : ''}
                ${d['Other Authors']}
            </div>
            <div>
                <span class="publication">${d['Submission Target']} ${year}</span>
                ${type && type !== '' ? `<span class="publication">${d['Type']}</span>` : ''}
                ${pdfExists ? `<a href="${pdf}" target="_blank">PDF</a>` : ''}
                <a href="${publisher}" target="_blank">website</a>
                ${videoExists ? `<a href="${video}" target="_blank">video</a>` : ''}
                ${supplemental ? `<a href="${supplemental}" target="_blank">more...</a>` : ''}
            </div>
        </div>
        <div class="info">
            <h4>Abstract</h4>
            <div class="abstract">
                ${d['Abstract']}
            </div>
            ${d['bibtex']
                ? `
            <h4>BibTex</h4>
            <div class="bibtex">
                <textarea>${d['bibtex']}</textarea>
            </div>`
                : ''
            }
            ${d['Acknowledgements']
                ? `
            <h4>Acknowledgements</h4>
            <div class="abstract">
                ${d['Acknowledgements']}
            </div>`
                : ''
            }
        </div>
    </div>
    `;
    }).join('');
}

/**
 * Creates HTML from the CSV data
 */
function createMemberPageHtml(member, fileName, papers) {
    // Create HTML
    const papersHtml = createPublicationsHtml(papers, true);
    // Read nav and about us page
    let about = '';
    const aboutFile = `./about/${fileName}.html`;
    try {
        about = readFileSync(aboutFile);
    } catch {
        console.warn(`No about found for ${member}, ${aboutFile} is missing`);
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
                ${papersHtml}
            </article>
        </div>
    </main>
</body>
</html>`;
    const outFile = `./members/${fileName}.html`;
    writeFileSync(outFile, html);
    console.log(`Wrote ${outFile}`);
}


/**
 * Members list with avatars
 * @returns {string} HTML
 */
function createMemberListHtml() {
    return members.map((member, index) => `
    <div>
        <a href="./members/${memberPaths[index]}.html">
            <img
                class="avatar"
                src="./img/people/small/${memberPaths[index]}.jpg"
            />
            <div>
                ${member}
            </div>
        </a>
    </div>
    `).join('\n');
}
