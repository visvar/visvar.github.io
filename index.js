import { createReadStream, readFileSync, writeFileSync } from 'fs';
import csv from 'fast-csv';
import querystring from 'querystring';

const file = './Papers by us.csv';
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
    // Only export published papers
    const published = papers.filter(d => d['Status'] === 'Published');
    console.log(`${published.length} published`);
    // console.log(published);
    // Main page
    createMainPageHtml(published);
    // Member / author pages
    for (const [index, member] of members.entries()) {
        const authoredPapers = published.filter(d => {
            return d['First Author'].includes(member)
                || d['Other Authors'].includes(member);
        });
        const fileName = memberPaths[index];
        createMemberPageHtml(member, fileName, authoredPapers);
    }
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
        const publisher = d['Publisher URL (official)'];
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
        <img
            id="image${fileName}"
            onclick="toggleClass('paper${fileName}', 'small'); toggleImageSize(this);"
            class="publicationImage small"
            src="${isMember ? '..' : '.'}/img/small/${fileName}.png"
        />
        <div class="metaData">
            <div>
                <span class="publication">
                    ${d['Submission Target']}
                    ${d['Date / Deadline'].slice(0, 4)}
                    ${d['Type']}
                </span>
                <span class="authors">
                    <span class="firstAuthor">${d['First Author']}</span>${d['Other Authors'] !== '' ? ',' : ''}
                    ${d['Other Authors']}
                </span>
            </div>
            <div class="paperLinks">
                <a href="${pdf}">PDF</a>
                <a href="${publisher}">publisher website</a>
            </div>
        </div>
        <div class="info">
            <div class="abstract">
                ${d['Abstract']}
            </div>
            <div class="bibtex">
                ${d['bibtex'] ?? ''}
            </div>
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
