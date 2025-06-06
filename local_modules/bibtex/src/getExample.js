/**
 * Created on: 19 Oct 2018, Fri
 */

const fs = require("fs");

module.exports = (number=1) => {
	let content, defaultContent;

	defaultContent = "@phdthesis{key,\n" +
		"\tauthor = {O P Qwerty},\n" +
		"\ttitle = {History of the Goofy Layout of Keyboards},\n" +
		"\tpublisher = {Podunk University Arcana Department},\n" + 
		"\taddress = {Podunk IN},\n" +
		"\tyear = {1996}\n" +
		"}\n"

	let expression1 = !(/^\d+$/.test("" + number));
	let expression2  = !(Object.prototype.toString.call(1).slice(8, -1));

	if(expression1 || expression2 || !(number > 0 && number < 6)) {
		console.log("\nWARNING: it seems you passed an invalid integer");
	}
	try {
		if(number === 1) {
			content = fs.readFileSync("BibTeX_example10_phdthesis_diff.bib");
		} else if(number === 2) {
			content = fs.readFileSync("");
		} else if(number === 3) {

		} else if(number === 4) {

		} else if(number === 5) {
			
		}
	} catch (err) {
		console.log(`\nWARNING: ${err}`);
		return content;
	}
}
