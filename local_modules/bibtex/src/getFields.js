/*
	Created: 20 Sep 2018, Thu
*/

module.exports = function getFields() {
	const fields = {
	    "address": {
	        "description": "Usually the address of the publisher or other institution.",
	        "note": "For major publishing houses, you may omit the information entirely or give simply the city. For small publishers, on the other hand, you can help the reader by giving the complete address."
	    },
	    "annote": {
	        "description": "An annotation.",
	        "note": "Not used by the standard bibliography styles, but used by others that produce an annotated bibliography (e.g., annote). The field starts a new sentence and hence the first word should be capitalized."
	    },
	    "author": {
	        "description": "The name(s) of the author(s), in BibTeX name format.",
	        "note": "This field should contain the complete author list for your entry. The names are separated by the word and, even if there are more than two authors. Each name can be written in two equivalent forms: Donald E. Knuth or Knuth, Donald E. Eddie van Halen or van Halen, Eddie The second form should be used for authors with more than two names, to differentiate between middle names and last names."
	    },
	    "booktitle": {
	        "description": "Title of a book, part of which is being cited.",
	        "note": "For book entries use the title field"
	    },
	    "chapter": {
	        "description": "A chapter (or section or whatever) number.",
	        "note": "It's an integer denoting the page number."
	    },
	    "crossref": {
	        "description": "The database key of the entry being cross-referenced",
	        "note": "The database key of the entry being cross referenced."
	    },
	    "edition": {
	        "description": "The edition of a book (e.g., \"Second\").",
	        "note": "This should be an ordinal, and should have the first letter capitalized, as shown above; the standard styles convert to lowercase when necessary."
	    },
	    "editor": {
	        "description": "",
	        "note": "If there is also an author field, then the editor field gives the editor of the book or collection in which the reference appears."
	    },
	    "howpublished": {
	        "description": "How something strange has been published.",
	        "note": "The first word should be capitalized."
	    },
	    "institution": {
	        "description": "Institutuion sponsoring a technical report.",
	        "note": "It is the name of institution"
	    },
	    "journal": {
	        "description": "Journal name. Abbrevations are provided for many journals.",
	        "note": "The name of a journal or magazine. The name of a journal can be abbreviated using a “string”. To define such string, use the string editor."
	    },
	    "key": {
	        "description": "Used for alphabetizing, cross-referencing, and creating a label when the author and editor information is missing.",
	        "note": "This field should not be confused with the key that appears in the \\cite command and at the beginning of the database entry."
	    },
	    "month": {
	        "description": "The month in which the work was published or, for an unpublished work, in which it was written.",
	        "note": "For reasons of consistency the standard three-letter abbreviations (jan, feb, mar, etc.) should be used."
	    },
	    "note": {
	        "description": "Any additional information that can help the reader.",
	        "note": ""
	    },
	    "number": {
	        "description": "The number of a journal, magazine, technical report, or work in a series.",
	        "note": "An issue of a journal or magazine is usually identified by its volume and number; a technical report normally has a number; and sometimes books in a named series carry numbers."
	    },
	    "organization": {
	        "description": "The organization that sponsors a conference or that publishes a manual.",
	        "note": "It is the name of organization that takes care of publishing the manual."
	    },
	    "pages": {
	        "description": "One or more page numbers or range of numbers.",
	        "note": "(e.g., 42-111 or 7,41, 73-97 or 43+, where the '+' indicates pages that do not form a simple range)"
	    },
	    "publisher": {
	        "description": "The publisher's name.",
	        "note": "The name of the publisher."
	    },
	    "school": {
	        "description": "The name of the school where the thesis was written.",
	        "note": "The name of school."
	    },
	    "series": {
	        "description": "The name of a series or set of books.",
	        "note": "When citing an entire book, the title field gives its title and an optional series field gives the name of a series or multivolume set in which the book is published."
	    },
	    "title": {
	        "description": "The work's title, typed as explained in",
	        "note": "The title of the work. The capitalization may depend on the bibliography style and on the language used. For words that have to be capitalized (such as a proper noun), enclose the word (or its first letter) in braces."
	    },
	    "type": {
	        "description": "The type of a technical report(e.g., \"Research Note\").",
	        "note": "This name is used instead of the default \"Technical Report\". For the entry type phdthesis you could use the term \"Ph.D. dissertation\" by specifying: type = \"{Ph.D.} dissertation\". Similarly, for the inbook and incollection entry types you can get \"section 1.2\" instead of the default \"chapter 1.2\" with chapter = \"1.2\" and type = \"Section\"."
	    },
	    "volume": {
	        "description": "The volume of a journal or multivolume book.",
	        "note": "The volume of a journal or multivolume book."
	    },
	    "year": {
	        "description": "The year of publication or, for an unpublished work, the year it was written.",
	        "note": "Generally, it should consist of four numerals, such as 1984, although the standard styles can handle any year whose last four nonpunctuation characters are numerals, such as \"about 1984\"."
	    }
	}

	return fields;
}