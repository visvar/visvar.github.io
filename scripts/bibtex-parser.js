import bibtex from '@hygull/bibtex'

const bib = new bibtex();

// Getting an array of bib objects
const bibArr = bib.getBibAsObject('bibliography.bib');
//console.log(JSON.stringify(bibArr, null, 2));

let datakeys = []
bibArr.forEach(element => {
    console.log(element)    
});

console.log([...new Set(datakeys)])
