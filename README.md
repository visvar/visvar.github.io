# VISVAR Homepage

[visvar.github.io](https://visvar.github.io/)

1. [VISVAR Homepage](#visvar-homepage)
   1. [Adding Content](#adding-content)
      1. ["About" Pages](#about-pages)
      2. [Media](#media)
      3. [Papers](#papers)
   2. [Compiling](#compiling)
   3. [Deployment / Publishing](#deployment--publishing)
   4. [Adding new Members](#adding-new-members)
   5. [Repository Structure](#repository-structure)
   6. [Dependency Update](#dependency-update)
   7. [Used Libraries](#used-libraries)

## Adding Content

Only change files in the below folders, nothing else!
After a change, compile the website as described below for changes to take effect or ask @fheyen.

### "About" Pages

The main page is inside `aboutus.html`.
Member information is configured inside [config.js](./config.js).
*(Do not change anything in `members/`, `pub/` or `index.html`!)*

### Media

Media names must match the publication's key in the table.
The pattern usually is lastnameYearKeyword (example: heyen2020clavis).

- [img/](./img/) for images (must be .png, except for people avatars which must be .jpg and placed inside `img/people/`)
- [pdf/](./pdf/) for PDFs.
- [video/](./video/) for videos (must be .mp4).
- [suppl/](./suppl/) for supplemental (must be .zip).

### Papers

- Save / move the `Papers.xlsx` file into this directory

## Compiling

If not done yet, install packages with `npm i` (you obviously need [Node.js and npm](https://nodejs.org/en/) to be installed).

Before compiling, make sure the local version of the repository and the `Papers.xlsx` are both up to date.

`npm start` starts the compiler.
You will still need to reload the page (e.g., press F5) in the browser to see changes!

Fast compile: If publications, images, etc. did not change, you can run `npm run compile` to only re-compile the HTML.

## Deployment / Publishing

Simply do a git commit and push, e.g. run

- `git add .`
- `git commit -m "some useful commit message"`
- `git push`

## Adding new Members

- Add information in [config.js](./config.js)
   - Insert the new member in the correct position.
      - First, there are Professors, then Post-Docs, and finally Ph.D.s
      - Members of each category are sorted alphabetically by first name.
- Add a picture in [img/people/](img/people/)

Make sure the filenames equal the `path` in the config and only contain ASCII characters.

## Repository Structure

- img/: images
- img/people: member pictures
- img/**/small: thumbnails
- members/: compiled member pages
- pdf/: pdfs
- pub/: compiled publication pages
- qr/: QR code PNGs for all publication pages
- scripts/: compile scripts
- suppl/: supplemental material
- video/: videos
- aboutus.html: main page content
- config.js member information
- index.html: compiled main page
- style.css: page styles
- venues.js venue information

## Dependency Update

- `npm run upd`
- `npm i`

## Used Libraries

- [awesome-qr](https://github.com/sumimakito/Awesome-qr.js) for QR codes
- [fast-csv](https://github.com/C2FO/fast-csv) for parsing .csv
- [image-js](https://github.com/image-js/image-js) for image resizing for thumbnails (`npm run resizePeople`, `npm run resizeThumbs`)
- [npm-check-updates](https://github.com/raineorshine/npm-check-updates) for updating packages (`npm run upd`)
- [xlsx](https://github.com/SheetJS/sheetjs) for converting .xlsx to .csv `npm run tocsv`
- [bibtex-tidy](https://github.com/FlamingTempura/bibtex-tidy) for more beautiful bibtex
