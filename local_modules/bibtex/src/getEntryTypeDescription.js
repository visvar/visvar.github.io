/*
	Created: 16 Sep 2018, Sun
*/

module.exports = function getEntryTypeDescription() {
	return {
		"article": "An article from a journal or magazine.",
		"book": "A book with an explicit publisher.",
		"booklet": "A work that is printed and bound, but without a named publisher or sponsoring institution.",
		"inbook": "A part of a book, e.g., a chpater, section, or whatever and/or a range of pages.",
		"incolllection": "A part of a book having its own title.",
		"inproceedings": "An article in a conference proceedings.",
		"manual": "Technical documentation.",
		"mastersthesis": "A master's thesis.",
		"misc": "Use this type when nothing else fits. A warning will be issued if all optional fields are empty (i.e., the entire entry is empty or has only ignored fields).",
		"phdthesis": "A Ph.D. thesis.",
		"proceedings": "Conference proceedings.",
		"techreport": "A report published by a school or other institution, usually numbered within a series.",
		"unpublished": "A document having an author and title, but not formally published."
	};
}