import bibtex from '@hygull/bibtex'

const bib = new bibtex();

// Getting an array of bib objects
const bibArr = bib.getBibAsObject('bibliography.bib');
//console.log(JSON.stringify(bibArr, null, 2));

let datakeys = []
bibArr.forEach(element => {
    if (element['key'] == 'mayer2019effect') {
        console.log(element)
        const bibCode = bib.getBibCodeFromObject(element,3); // Default format 2 will be used (for double quoted representation)
        console.log(bibCode);
    }
});

console.log([...new Set(datakeys)])
