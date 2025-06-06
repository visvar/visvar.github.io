/*
	Created: 18 Sep 2018, Tue
*/

const getEntryTypeFieldsDescription = require("./getEntryTypeFieldsDescription");

module.exports = function getFormFor(entryType) {
	const entryTypes = getEntryTypeFieldsDescription();

    const keys = Object.keys(entryTypes);
    // console.log(keys);

    entryType = entryType.trim();
    let formCode = '';

    if(keys.indexOf(entryType) > -1) {
    	let requiredEntry = entryTypes[entryType];
    	formCode += "<form action='#' method='GET' name='" + entryType +"'>\n";
    	
    	let requiredFieldsCode = getFormFieldsCode(requiredEntry["requiredFields"], true); 
    	let optionalFieldsCode = getFormFieldsCode(requiredEntry["optionalFields"], false)
    	formCode += requiredFieldsCode + "\n" + optionalFieldsCode;
    } else {
    	return null;
    }
    
    formCode += "\t<button type='submit' class='btn btn-success'>Submit</button>\n" + 
				"</form>";

	return formCode;
}

function getFormFieldsCode(fields, required) {
	// Validation is not required
	// It is being done inside the calling code
	let fieldCode = '';
	for(let field of fields) {
    		// <div class="form-group">
		    //   <label for="pwd">Password:</label>
		    //   <input type="password" class="form-control" id="pwd" placeholder="Enter password" name="pwd">
		    // </div>
    		fieldCode += "\t<div class='form-group'>\n";
    		fieldCode += "\t\t<label for='" + field +"'>" + field + ":</label>\n";
    		fieldCode += "\t\t<input type='text' class='form-control' id='" + field + "' placeholder='Enter " + field + "' name='" + field + "' required='" + required +"'>\n";
    		fieldCode += "\t</div>\n";
    }

    return fieldCode;
}

/*
{
    "article": {
        "description": "An article from a journal or magazine",
        "requiredFields": [
            "author",
            "title",
            "journal",
            "year"
        ],
        "optionalFields": [
            "volume",
            "number",
            "pages",
            "month",
            "note"
        ]
    },
    "book": {
        "description": "A book with an explicit publisher",
        "requiredFields": [
            "author or editor",
            "title",
            "publisher",
            "year"
        ],
        "optionalFields": [
            "volume or number",
            "series",
            "address",
            "edition",
            "month",
            "note"
        ]
    },
    "booklet": {
        "description": "A work that is printed and bound, but without a named publisher or sponsoring institution",
        "requiredFields": [
            "title"
        ],
        "optionalFields": [
            "author",
            "howpublished",
            "address",
            "month",
            "year",
            "note"
        ]
    },
    "inbook": {
        "description": "A part of a book, e.g., a chpater, section, or whatever and/or a range of pages",
        "requiredFields": [
            "author or editor",
            "title",
            "chapter and/or pages",
            "publisher",
            "year"
        ],
        "optionalFields": [
            "volume or number",
            "series",
            "type",
            "address",
            "edition",
            "month",
            "note"
        ]
    },
    "incollection": {
        "description": "A part of a book having its own title",
        "requiredFields": [
            "author",
            "title",
            "booktitle",
            "publisher",
            "year"
        ],
        "optionalFields": [
            "editor",
            "volume or number",
            "series",
            "type",
            "chapter",
            "pages",
            "address",
            "edition",
            "month",
            "note"
        ]
    },
    "inproceedings": {
        "description": "An article in a conference proceedings",
        "requiredFields": [
            "author",
            "title",
            "booktitle",
            "year"
        ],
        "optionalFields": [
            "editor",
            "volume or number",
            "series",
            "pages",
            "address",
            "month",
            "organization",
            "publisher",
            "note"
        ]
    },
    "manual": {
        "description": "Technical documentation",
        "requiredFields": [
            "title"
        ],
        "optionalFields": [
            "author",
            "organization",
            "address",
            "edition",
            "month",
            "year",
            "note"
        ]
    },
    "mastersthesis": {
        "description": "A master's thesis",
        "requiredFields": [
            "author",
            "title",
            "school",
            "year"
        ],
        "optionalFields": [
            "type",
            "address",
            "month",
            "note"
        ]
    },
    "misc": {
        "description": "Use this type when nothing else fits. A warning will be issued if all optional fields are empty (i.e., the entire entry is empty or has only ignored fields)",
        "requiredFields": [
            "none"
        ],
        "optionalFields": [
            "author",
            "title",
            "howpublished",
            "month",
            "year",
            "note"
        ]
    },
    "phdthesis": {
        "description": "A Ph.D. thesis",
        "requiredFields": [
            "author",
            "title",
            "school",
            "year"
        ],
        "optionalFields": [
            "type",
            "address",
            "month",
            "note"
        ]
    },
    "proceedings": {
        "description": "Conference proceedings",
        "requiredFields": [
            "title",
            "year"
        ],
        "optionalFields": [
            "editor",
            "volume or number",
            "series",
            "address",
            "publisher",
            "note",
            "month",
            "organization"
        ]
    },
    "techreport": {
        "description": "A report published by a school or other institution, usually numbered within a series",
        "requiredFields": [
            "author",
            "title",
            "institution",
            "year"
        ],
        "optionalFields": [
            "type",
            "number",
            "address",
            "month",
            "note"
        ]
    },
    "unpublished": {
        "description": "A document having an author and title, but not formally published",
        "requiredFields": [
            "author",
            "title",
            "note"
        ],
        "optionalFields": [
            "month",
            "year"
        ]
    }
}
*/