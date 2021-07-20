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
                    <a href="${pageUrl}/#publications">all publications</a>
                </li>
                <li>
                    <a href="${pageUrl}/#members">members</a>
                </li>
                <ul>
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
 * Creates HTML for an Array of papers extracted from the CSV
 *
 * @param {object[]} papers papers
 * @param {boolean} [isMember=false] is this a member page?
 * @returns {string} HTML
 */
function createPapersHtml(papers, isMember = false) {
    return papers.map(d => {
        const fileName = d['Key (e.g. for file names)'];
        const pdf = `${isMember ? '..' : '.'}/pdf/${fileName}.pdf`;
        const image = `${isMember ? '..' : '.'}/img/small/${fileName}.png`;
        const publisher = d['Publisher URL (official)'];
        // See if files are there
        const imageExists = existsSync(join('img', `${fileName}.png`));
        const pdfExists = existsSync(join('pdf', `${fileName}.pdf`));
        if (!isMember) {
            if (!imageExists) {
                console.log(`  missing image: img/${fileName}.png`);
            }
            if (!pdfExists) {
                console.log(`  missing pdf: pdf/${fileName}.pdf`);
            }
        }

        return `
    <div
        class="paper small"
        id="paper${fileName}"
    >
        <h2
           onclick="toggleClass('paper${fileName}', 'small'); toggleImageSize(image${fileName});"
        >
            ${d['Title']}
        </h2>
        ${imageExists
                ? `
            <img
                id="image${fileName}"
                onclick="toggleClass('paper${fileName}', 'small'); toggleImageSize(this);"
                class="publicationImage small"
                src="${image}"
            />`
                : ''
            }
        <div class="metaData ${imageExists ? '' : 'noImage'}">
            <div class="authors">
                <span class="firstAuthor">${d['First Author']}</span>${d['Other Authors'] !== '' ? ',' : ''}
                ${d['Other Authors']}
            </div>
            <div>
                <span class="publication">${d['Submission Target']} ${d['Date'].slice(0, 4)}</span>
                <span class="publication">${d['Type']}</span>
                ${pdfExists ? `<a href="${pdf}">PDF</a>` : ''}
                <a href="${publisher}">publisher website</a>
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
        </div>
    </div>
    `;
    }).join('');
}

/**
 * Creates HTML from the CSV data
 */
function createMainPageHtml(published) {
    // Create HTML
    const papersHtml = createPapersHtml(published);
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
 * Creates HTML from the CSV data
 */
function createMemberPageHtml(member, fileName, papers) {
    // Create HTML
    const papersHtml = createPapersHtml(papers, true);
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


function createMemberListHtml() {
    return members.map((member, index) => `
    <div>
        <a href="./members/${memberPaths[index]}.html">
            <img
                class="avatar"
                src="./img/small/${memberPaths[index]}.jpg"
            />
            <div>
                ${member}
            </div>
        </a>
    </div>
    `).join('\n');
}
