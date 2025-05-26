# HCI Stuttgart Homepage

[visvar.github.io](https://visvar.github.io/)

## Adding Content

Only change files in the below folders, nothing else!

After a change, compile the website as described below for changes to take effect, or ask @fheyen or @ChristianKrauter.

### "About" Page

The main page is inside `aboutus.html`.
Member information is configured inside [config.js](./config.js).

*(Do not change anything in `members/`, `pub/` or `index.html`!)*

### Media Assets

Media names must match the publication's key in the table.
The pattern usually is lastnameYearKeyword (example: heyen2020clavis).

- [assets/img](./assets/img/) for images
  - [assets/img/teaser/](./assets/img/teaser/) for publication teasers (must be .png)
  - [assets/img/people/](./assets/img/people/) for members (must be .jpg)
- [assets/pdf/](./assets/pdf/) for PDFs.
- [assets/suppl/](./assets/suppl/) for supplemental (must be .zip).
- [assets/video/](./assets/video/) for videos (must be .mp4).

### Papers

- Update the `Papers.xlsx` file
  - Make sure that the authors names of members are written in the same way (Especially no 'lastname, firstname; ...' but `firstname lastname, ...`
  - Do NOT put the first author in the column 'Other Authors', but only in the column 'First Author'
  - Add as much information as possible (also abstract, acknowledgments, and bibtex)
  - Take the automatically generated key for additional files (teaser, etc.)
  - `Always add a teaser.` If your paper does not have any pictures: `Add a screenshot of the first page with title and authors`, like [xiao2024systemati](https://visvar.github.io/pub/xiao2024systematic.html)

## Compiling

If not done yet, install packages with `npm i` (you obviously need [Node.js and npm](https://nodejs.org/en/) to be installed).

Before compiling, make sure the local version of the repository and the `Papers.xlsx` are both up to date.

`npm start` starts the compiler.
You will still need to reload the page (e.g., press (CTRL) F5) in the browser to see changes!

Fast compile: If publications, images, etc., did not change, you can run `npm run compile` to only re-compile the HTML.

## Deployment / Publishing

Simply do a git commit and push, e.g., run

- `git add .`
- `git commit -m "some useful commit message"`
- `git push`

## Adding new Members

- Add information in [config.js](./config.js)
   - Insert the new member in the correct position.
      - First, there are `regular members` with the order: Professors, then Post-Docs, then Ph.D.s
      - Second, come `associated members` with the same order: Professors, then Post-Docs, then Ph.D.s
      - Finally, there are `alumni` with the same order: Professors, then Post-Docs, then Ph.D.s
      - Members of each category are sorted alphabetically by first name.
- Add a picture in [assets/img/people/](./assets/img/people/)

Make sure the filenames equal the `path` in the config and only contain ASCII characters.

## Repository Structure

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
- venues/: compiles venue pages
- aboutus.html: main page content
- config.js member information
- index.html: compiled main page
- Papers.xlsx: publication database
- style.css: page styles
- venues.js venue information

## Dependency Update

- `npm run upd`
- `npm i`

## Used Libraries

- [qrcode](https://github.com/soldair/node-qrcode) for QR codes
- [fast-csv](https://github.com/C2FO/fast-csv) for parsing .csv
- [image-js](https://github.com/image-js/image-js) for image resizing for thumbnails (`npm run resizePeople`, `npm run resizeThumbs`)
- [npm-check-updates](https://github.com/raineorshine/npm-check-updates) for updating packages (`npm run upd`)
- [xlsx](https://github.com/SheetJS/sheetjs) for converting .xlsx to .csv `npm run tocsv`
- [bibtex-tidy](https://github.com/FlamingTempura/bibtex-tidy) for more beautiful bibtex
