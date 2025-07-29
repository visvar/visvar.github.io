# HCI Stuttgart Homepage

Hello, this is the repository for the webpage of the Human-Computer Interaction group at the University of Stuttgart headed by Michael Sedlmair.

If you are a (associated / alumnus) member and want to contribute, please **first read this readme**.

If you have any questions, feedback, or feature suggestions, please ask @fheyen or @ChristianKrauter.

The live version of this webpage can be found here: [visvar.github.io](https://visvar.github.io/).

# How to Add Content and Update the Webpage

Only change files as described below folders, nothing else!

After adding new content, there are two general options:
1. Update the wepage yourself (prefered)
   1. Add your changes
   2. [Compile](#compiling) the page yourself 
2. Only update the content
   1. Add your changes
   2. Create a pull request with your changes.
   3. Your changes will take effect on the next compile run by anyone.

## Update the "About" Page

The main page is inside `aboutus.html`.

## Add Publications

Publications are stored in the `bibliography.bib` file

### General:
- You <ins>can use Unicode</ins> (e.g., é, â, ..) but **NOT** LaTeX (e.g., \c{c}, \\"{a})
- Add as much information as possible
- Clean your entry as if you are writing a paper
- `Always add a teaser.` If your paper does not have any pictures: **Add a screenshot of the first page with title and authors**, like [xiao2024systemati](https://visvar.github.io/pub/xiao2024systematic.html)

### Some rules:

`citation key`
- The pattern for keys is <ins>\<lastname>\<Year>\<FirstWord></ins> (example: heyen2020clavis).
  - Add an increasing number (2,3,...), if necessary for uniqueness 

`author`
- Enter authors as <ins>firstname lastname, ...</ins>, **NOT** 'lastname, firstname; ...'
  - Author names of members must be identical to those in `config.js`

`year` and `month`
- Use year and month, not date
- Add <ins>month in numbers</ins>, not names or abbrevations

`doi`
- Enter the full doi URL, not just the DOI (i.e., https://doi.org/<your.doi.here>)

`url`
- Add any additional URL, but **NOT the doi again!**

`url2`
- You can add another link for or about your publication. Not the DOI again, though.

`venue`
- Please fill a short version of the publication venue here whether it is a journal or conference paper and wheter that information is already in  'journal', 'booktitle', or 'series'.

`badge`
- Adding one of the following values will display the respective badge next to the publication's title on the main page and its page
  - **bestpaper, honorablemention, nomination, reproducibility**
  - Please also write a small sentence about the badge at the end of `note` to have context on the publications page. E.g., 'Received an honorable mention award'. The badge will also be displayed there.

`note`
- You can add any note here and it will be displayed on the page of your publication

`video` and `video2`
- If there are videos available online you can add the links to them here. Please fill video before video2
- Embedding youtube videos
  - To embed a youtube video, you have to enter the embedding link.
  - You get that by clicking on 'sharing' on youtube and selecting 'embed'.
  - Then, **only copy the link** into video/video2. The link looks like ```https://www.youtube.com/embed/<id>?si=<another id>```.
  - Do <ins>NOT</ins> copy the whole embedding code.

`pdf`
- Only have a link to your pdf? Add it here.

`suppl`
- Only have a link to your supplemental material? Add it here.

`abstract`
- Add your abstract **without any formatting, newlines, or LaTeX commands!**

`acks`
- You can add your acknowledgements here to be displayed on the publications page

`funding`
- You can add funding information here to be displayed on the publications page

### Assets

**Media names must match the publication's key** in `bibliography.bib`.

- [assets/img/teaser/](./assets/img/teaser/) for publication teasers (must be .png)
- [assets/pdf/](./assets/pdf/) for PDFs.
- [assets/suppl/](./assets/suppl/) for supplemental material (must be .zip).
- [assets/video/](./assets/video/) for videos (must be .mp4).

## Adding new Members

Member information is stored in `config.js`
- Insert the new member in the correct position.
  - First, there are <ins>regular members</ins> with the order: Professors, then Post-Docs, then Ph.D.s
  - Second, come <ins>associated members</ins> with the same order: Professors, then Post-Docs, then Ph.D.s
  - Finally, there are <ins>alumni</ins> with the same order: Professors, then Post-Docs, then Ph.D.s
    - Alumni roles are as they were while they last worked in the group.
  - Members of each category are sorted alphabetically by first name.
- Add as much information as possible. You can take a look at the other member pages for inspiration/ guidance.
- `path` may only contain ASCII characters
- `role` may only be one of **professor, postdoc, phd, associatedpostdoc, associatedphd, alumnuspostdoc, alumnusphd**
- Add a picture in [assets/img/people/](./assets/img/people/) (must be .jpg)
  - The name has to be **\<path\>.jpg**
  - **The smaller thumbnail versions of images are generated automatically.**

## Compiling and Publishing

**Without compiling, the live website will not update.**

### Compiling

If not done yet, install packages with `npm i` (you obviously need [Node.js and npm](https://nodejs.org/en/) to be installed).

Before compiling, make sure the local version of the repository is up to date.

`npm start`
- starts compiling the whole webpage
- **Read the output of the script. Missing files and information will be printed there**
- After compiling you can inspect the local version by opening `index.html` in a browser.
You will need to reload the page (e.g., press (CTRL) F5) in the browser to see changes!

`npm start -- email`
- compiles the webpage, but the information about missing files and information will be formatted as emails to copy and paste. 

`npm run compile`
- can be run for a fast compile of the HTML if publications, images, etc., did not change.

### Publishing

If git shows that files changed, but without any actual changes, the problem is likely line endings.
To fix this, please adjust your git settings as follows (-global is optional):

`git config --global core.autocrlf input`

Ask @fheyen or @ChristianKrauter to make you a contributor.

To publish changes simply do a git commit and push, e.g., run

- `git add .`
- `git commit -m "some useful commit message"`
- `git push`

# Repository Information

## Structure

- assets/: all assets
  - img/: images
    - misc/: logo, etc.
    - people/: member pictures
    - qr/: QR code PNGs for all publication pages
    - teaser/: publication teasers   
    - **/small: thumbnails
  - pdf/: publication pdfs
  - suppl/: supplemental material
  - video/: videos
- members/: compiled member pages
- pub/: compiled publication pages
- scripts/: compile scripts
- aboutus.html: main page content
- config.js member information
- index.html: compiled main page
- Papers.xlsx: publication database
- style.css: page styles

## Dependency Update

- `npm run upd`
- `npm i`

## Used Libraries

- [bibtex](https://github.com/hygull/bibtex) for parsing bibtex (modified local version with a bug fix)
- [bibtex-tidy](https://github.com/FlamingTempura/bibtex-tidy) for more beautiful bibtex
- [image-js](https://github.com/image-js/image-js) for image resizing for thumbnails (`npm run resizePeople`, `npm run resizeThumbs`)
- [npm-check-updates](https://github.com/raineorshine/npm-check-updates) for updating packages (`npm run upd`)
- [qrcode](https://github.com/soldair/node-qrcode) for QR codes
