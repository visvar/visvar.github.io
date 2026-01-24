# HCI Stuttgart Homepage

Hello, this is the repository for the webpage of the Human-Computer Interaction group at the University of Stuttgart, headed by Michael Sedlmair.

If you are a (associated / alumnus) member and want to contribute, please **first read this readme**.

If you have any questions, feedback, or feature suggestions, please @ChristianKrauter.

The live version of this webpage can be found here: [visvar.github.io](https://visvar.github.io/).

# How to Add Content and Update the Webpage

Only change files as described in the folders below; nothing else!

After adding new content, there are two general options:
1. Update the webpage yourself (preferred)
   1. Add your changes
   2. Make sure to run `npm i` to install/ update the used packages.
   3. [Compile](#compiling) the page yourself
2. Only update the content
   1. Add your changes
   2. Create a pull request with your changes.
   3. Your changes will take effect on the next compile run by anyone.

## Update the "About" Page

The main page is inside `aboutus.html`.

## Add Publications

Example entries can be found [here](#example-bibliography-entries).

Publications are stored in **two files** depending on the authors' affiliation with the group at the time of publication: 
- `bibliography_group.bib`
  - published during group membership
- `bibliography_prior.bib`
  - published before joining the group

### General:
- You <ins>can use Unicode</ins> (e.g., é, â, ..) but **NOT** LaTeX (e.g., \c{c}, \\"{a})
- Add as much information as possible
- **Clean up** your entry as you would for the references in a camera-ready paper
- `Always add a teaser.` If your paper does not have any pictures: **Add a screenshot of the first page with title and authors**. See [xiao2024systematic](https://visvar.github.io/pub/xiao2024systematic.html) for an example.
- Add PDFs as files if possible. Please consult the publisher guidelines and talk to Michael if you are unsure about the rights.  

### Bibliography Rules:

`citation key`
- The pattern for keys is <ins>\<lastname>\<Year>\<FirstWord></ins> (example: heyen2020clavis).
  - Add an increasing number (2,3,...), if necessary for uniqueness

`author`
- Enter authors as <ins>firstname lastname, ...</ins>, **NOT** 'lastname, firstname; ...'
  - Author names of members must be identical to those in `config.js`.
  - If this is violated, the publication will not show up on a members page.

`booktitle`
- Add the **cleaned** version of the booktitle according to [cleaned_bibstring.bib](./cleaned_bibstring.bib).
  - If no cleaned version is available for your booktitle, please clean it accordingly and update cleaned_bibstring.bib.

`series`
- Series is for the abbreviation of the booktitle. It is optional, but if you add it, please without any year (e.g., CHI, not CHI `22).

`venue`
- Please add the abbreviation of the publication venue (journal, conference, ...), even if that information is already in 'journal', 'booktitle', or 'series'. If there is no abbreviation, use the full journal or booktitle.

`publisher`
- Please use shortened names (e.g., ACM instead of Association for Computing Machinery, ...)

`address`
- Add the address of the publisher for conference papers, but not for journal papers

`location`
- Please do not use the location tag.

`footnoteindices` and `footnotetext`
- Use for author footnotes, e.g., co-first authorship
- `footnoteindices`: add position of authors with a footnote (starts at 0)
  - e.g., {0,1} for first and second author
- `footnotetext`: add text to be shown
  - e.g., {contributed equally}

`year` and `month`
- Use year and month, not date
- Add <ins>month in numbers</ins>, not names or abbrevations (January = 1)

`doi`
- Enter the full DOI URL, not just the DOI (i.e., https://doi.org/<your.doi.here>)

`url`
- Add any additional URL, but **NOT the doi again!**

`url2`
- You can add another link for or about your publication. Not the DOI again, though.

`badge`
- To display one or multiple icons for a publication, add the repsective word in this bib entry. Separate multiple entries with a ',' ano no spaces. The badge(s) will be shown next to the publication's title on the main page and on the publication's own page.
  - Available badges:
    - **bestpaper, honorablemention, nomination, reproducibility, openaccess**
  - With added badge(s), there needs to be a small sentence describing it/them at the end of the `note`-entry. This information will be shown on the publications page. E.g., 'Received an honorable mention award'.

`note`
- You can add any note here, and it will be displayed on the page of your publication

`video` and `video2`
- If there are videos available online, you can add links to them here.
- **Please fill video before video2**
- Embedding YouTube videos
  - To embed a YouTube video, you have to enter the embedding link.
  - You get that by clicking on 'sharing' on YouTube and selecting 'embed'.
  - Then, **only copy the link** into video/video2. The link looks like ```https://www.youtube.com/embed/<id>?si=<another id>```.
  - Do <ins>NOT</ins> copy the whole embedding code.

`pdf`
- Only have a link to your PDF? Add it here.

`suppl`
- Only have a link to your supplemental material? Add it here.

`abstract`
- Add your abstract **without any formatting, newlines, or LaTeX commands!**

`acks`
- You can add your acknowledgements here to be displayed on the publications page

`funding`
- You can add funding information here to be displayed on the publications page

### Assets

**Media names must match the publication's key** in the bibliography file.

- [assets/img/teaser/](./assets/img/teaser/) for publication teasers (must be .png)
- [assets/pdf/](./assets/pdf/) for PDFs.
- [assets/suppl/](./assets/suppl/) for supplemental material (must be .zip).
- [assets/video/](./assets/video/) for videos (must be .mp4).
  - There can be two videos files for each publication named `{citation_key}.mp4` and `{citation_key}_2.mp4`

## Adding new Members

Member information is stored in `config.js`
- Insert the new member in the correct position.
  - First, there are <ins>regular members</ins> with the order: Professors, then Postdoc, then Ph.D.s
  - Second, come <ins>associated members</ins> with the same order: Professors, then Postdoc, then Ph.D.s
  - Finally, there are <ins>alumni</ins> with the same order: Professors, then Postdoc, then Ph.D.s
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

Always run `npm i` to install or update packages (you need to have [Node.js and npm](https://nodejs.org/en/) installed).

Before compiling, make sure the local version of the repository is up to date (`git pull`).

`npm run compile`
- run for a fast compile **without updating images**
- if you changed or added a image, run `npm start` (see below)

`npm start`
- starts compiling the whole webpage
- **Read the output of the script. Missing files and information will be printed there**
- After compiling, you can inspect the local version by opening `index.html` in a browser.
You will need to reload the page (e.g., press (CTRL) F5) in the browser to see changes!

`npm start -- email`
- compiles the webpage, but the information about missing files and information will be formatted as emails to copy and paste.

Compiling not working, weird output? Check if you have [Microsoft HPC Pack installed, containing another node.exe](https://stackoverflow.com/a/29579878)

### Publishing

If Git shows that files have changed, but without any actual changes, the problem is likely due to line endings.
To fix this, please adjust your git settings as follows (-global is optional):

`git config --global core.autocrlf input`

Ask @ChristianKrauter to make you a contributor.

To publish changes, do a git commit and push, e.g., run

- `git add .`
- `git commit -m "some useful commit message"`
- `git push`

# Repository Information

## Structure

- assets/: all assets
  - img/: images
    - badges/: images for awards, etc.
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
- bibliography_group.bib: publications
- bibliography_prior.bib: publications (before group association)
- config.js member information
- index.html: compiled main page
- package.json: npm specifications
- readme.md: this file
- style.css: page styles
- todo.md: open to-dos for the page

## Dependency Update

- `npm run upd`
- `npm i`

## Used Libraries

- [bibtex](https://github.com/hygull/bibtex) for parsing bibtex (modified local version with a bug fix)
- [bibtex-tidy](https://github.com/FlamingTempura/bibtex-tidy) for more beautiful bibtex
- [image-js](https://github.com/image-js/image-js) for image resizing for thumbnails (`npm run resizePeople`, `npm run resizeThumbs`)
- [npm-check-updates](https://github.com/raineorshine/npm-check-updates) for updating packages (`npm run upd`)
- [qrcode](https://github.com/soldair/node-qrcode) to generate QR codes

# Example Bibliography Entries

Conference paper:

```
@inproceedings{rau2025traversing,
    title           = {Traversing Dual Realities: Investigating Techniques for Transitioning 3D Objects between Desktop and Augmented Reality Environments},
    author          = {Tobias Rau, Tobias Isenberg, Andreas Köhn, Michael Sedlmair, Benjamin Lee},
    year            = {2025},
    month           = {04},
    booktitle       = {Conf. Human Factors in Computing Systems},
    publisher       = {ACM},
    address         = {New York, NY, USA},
    series          = {CHI},
    doi             = {https://doi.org/10.1145/3706598.3713949},
    note            = {Received a best paper award},
    badge           = {bestpaper},
    isbn            = {9798400713941},
    url             = {https://hal.science/hal-05050852},
    articleno       = {1236},
    numpages        = {16},
    video           = {https://www.youtube.com/embed/gknKEMn2Rv4?si=mVAY_XpgiNoG7PtZ},
    pdf             = {https://arxiv.org/abs/2504.00371},
    venue           = {CHI},
    abstract        = {Desktop environments can integrate augmented reality (AR) head-worn devices to support 3D representations, visualizations, and interactions in a novel yet familiar setting. As users navigate across the dual realities - desktop and AR - a way to move 3D objects between them is needed. We devise three baseline transition techniques based on common approaches in the literature and evaluate their usability and practicality in an initial user study (N=18). After refining both our transition techniques and the surrounding technical setup, we validate the applicability of the overall concept for real-world activities in an expert user study (N=6). In it, computational chemists followed their usual desktop workflows to build, manipulate, and analyze 3D molecular structures, but now aided with the addition of AR and our transition techniques. Based on our findings from both user studies, we provide lessons learned and takeaways for the design of 3D object transition techniques in desktop + AR environments.}
}
```

Journal article:

```
@article{rau2025maico,
    title           = {MAICO: A Visualization Design Study on AI-Assisted Music Composition},
    author          = {Simeon Rau, Frank Heyen, Benedikt Brachtel, Michael Sedlmair},
    year            = {2025},
    month           = {02},
    journal         = {IEEE Trans. Visualization Computer Graphics},
    pages           = {1--16},
    doi             = {https://doi.org/10.1109/TVCG.2025.3539779},
    url             = {https://www.replicabilitystamp.org/#https-github-com-visvar-maicov2},
    note            = {Received the Graphics Replicability Stamp},
    badge           = {reproducibility},
    suppl           = {https://github.com/visvar/MAICoV2},
    venue           = {TVCG},
    abstract        = {We contribute a design study on using visual analytics for AI-assisted music composition. The main result is the interface MAICO (Music AI Co-creativity), which allows composers and other music creators to interactively generate, explore, select, edit, and compare samples from generative music models. MAICO is based on the idea of visual parameter space analysis and supports the simultaneous analysis of hundreds of short samples of symbolic music from multiple models, displaying them in different metric- and similarity-based layouts. We developed and evaluated MAICO together with a professional composer who actively used it for five months to create, among other things, a composition for the Biennale Arte 2024 in Venice, which was recorded by the Munich Symphonic Orchestra. We discuss our design choices and lessons learned from this endeavor to support Human-AI co-creativity with visual analytics.}
}
```