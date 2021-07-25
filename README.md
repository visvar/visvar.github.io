# VISVAR Homepage

[visvar.github.io](https://visvar.github.io/)

## Adding Content

Only change files in the below folders, nothing else!
After a change, compile the website as described below for changes to take effect.

### "About" Pages

See [about/](./about/).

### Media

- [img/](./img/) for images (must be .png, except for people avatars which must be .jpg)
- [pdf/](./pdf/) for PDFs.

### Papers

- Save / move the `Papers.xlsx` file into this directory

## Compiling

If not done yet, install packages with `npm i` (you obviously need Node.js and npm to be installed).

`npm start` starts the compiler in watch mode.
It will re-build the whole page any time a .js or .html file changes.
You will still need to reload the page (e.g. press F5) in the browser to see changes!

## Deployment / Publishing

Simply do a git commit and push, e.g. run

- `git add .`
- `git commit -m "some useful commit message"`
- `git push`
