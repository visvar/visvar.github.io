/*
	Programmed on: 09 Oct 2018, Tue
*/

const getEntryTypes = require("./getEntryTypes");

module.exports = function getBibCodeFromObject(object, format=2) {
	// console.log(object);

	// To check the format (default is 2, double quoted representation)
	if(!(format === 1 || format === 2 || format === 3)){
		console.log('The specified format can be either 1 or 2, got: ', format)
		return null;
	}

	// To check the type of an object (using regular expression)
	const type = Object.prototype.toString.call(object).slice(8,).replace(/\]$/, '');
	let result = ''; // Result

	if(type === 'Object') { // object is an Object (Strict type check)
 		// console.log('Got an object');

 		// Check for valid fields
 		if(fieldsAreOk(object)) {
 			result = getCode(object, format);
 		} else {
 			console.log('All fields are not OK');
 			return null;
 		}
	} else { // Array or any other object (Excluding javascript Object)
		if(type === 'Array') { // object is an Array (Strict type check), [{ }, { }, { }]
			// console.log('Got an array');

			if(!(object.length > 0)) {// object is an array here
				console.log('Array is blank')
				return null;
			}

			// Loop through objects
			for(let i = 0; i < object.length; i++) {
				// Check for valid fields
				if(fieldsAreOk(object[i])) {
					// Contructing the content for a bib file
					result += getCode(object[i], format)
				} else {
					return null;
				}
			}
			// Done, return result
		} else { // Invalid object (Only allows Object/Array), { } 
			return null;
		}
	}

	return result; // Operation successful
}

function getCode(object, format) {
	/*
		- This function will only be called in case if
		  The object in calling code is an array => [{...}, {...}, {...}, ...]
		
		- object in this function denotes any one of items available in the array
		- format will be either 1/2/3
		- 1 is for double quoted + curley braced representation => @article{articleKey,title={"The age of programming"}, ...}
		- 2 is for double quoted representation => @article{articleKey,title="The age of programming", ...}
		- 3 is for curley braced representation  => @article{articleKey,title={The age of programming}, ...}
	*/
	let result = '@' + object.entryType + '{' + object.key + ',\n';

	const keyVals = [];

	for(const key in object.data) {
		let keyVal = '';
		let value = object["data"][key];

		keyVal += '    ' + key + ' = ';  // 4 spaces
		if(format === 1)
			keyVal += '{"' + value + '"}'; // author = {"Raghvendra Thakur"}
		else if(format === 3)
			keyVal += '{' + value + '}';   // author = {Raghvendra Thakur} (Default)
		else
			keyVal += '"' + value + '"';   // author = "Raghvendra Thakur"

		keyVals.push(keyVal);
	}

	result += keyVals.join(',\n');
	result += '\n}\n\n';

	return result;
}

function fieldsAreOk(object) { 
	// In case of arrays in calling code, this will be called again and again
	/*
		{
			entryType: 'article', 
			key: 'articleKey', 
			data: {
				'author': 'Rishi Dev',
				'title': 'The final decision of an old monkey',
				'year': 2007
			}
		}
	*/
	fields = Object.keys(object); // ['entryType', 'key', 'data']

	if(!(fields.length === 3)) {
		console.log("The object is either missing any one of 'entryType', 'key', 'data' or it's having some fields in access");
		return false;
	}

	const staticFields = ['entryType', 'key', 'data'];
	for(let i = 0; i < staticFields.length; i++) {
		if(!(fields.indexOf(staticFields[i]) > -1)) { // If dynamically obtained field is not ok
			console.log('Object is missing ' + staticFields[i]);
			return false;
		}
	}

	// ========== All fields are ok ['entryType', 'key', 'data'] ==========
	// Now let's move to check for valid fields for any specific entry type
	const entryType = object.entryType; // Checks entry type etc.
	const bibtex = require('./BibTeX');
	const bib = new bibtex();

	const entryTypeFields = bib.getSpecificEntryTypeFields(entryType);
	/* Eg. =>

		{
		    "requiredFields": [
		        "title",
		        "year"
		    ],
		    "optionalFields": [
		        "editor",
		        "publisher",
		        "organization",
		        "address",
		        "month",
		        "note"
		    ]
		}
    */
	if(entryTypeFields === null) {
		console.log(`Entry type ${entryType}  does not match`);
		return false; 
	}

	// If entry type is ok (book, article, proceedings, inproceedings, inbook)
	// then 
	// check for existence of required fields for any specific entry type
	const objectDataFields = Object.keys(object.data)
	// console.log(objectDataFields);

	const requiredFields = entryTypeFields['requiredFields'];
	for(let i = 0; i < requiredFields.length; i++) {
		if(!(objectDataFields.indexOf(requiredFields[i]) > -1)) { // If could not find the required field
			let mixedEntries = requiredFields[i].split(/\s+/); // 'author or editor' => ['author', 'or', 'editor']
			// console.log(mixedEntries);
			
			let found = false;
			for(let mixedEntry of mixedEntries) {
				if(!(objectDataFields.indexOf(mixedEntry) > -1)) {
					console.log(requiredFields[i] + ' is required field for Entry type: ' + entryType );
					console.log('Double check for entry type is also failed');
					continue;
				} else {
					found = true;
					break;
				};
			};

			if(!found) {
				return false;
			}
		}
	}

	// Finally (Operation successful, fields are ok)
	return true;
};

/*
	EITHER {...} OR [{...}, {...}, {...}, ...]
*/

/*
> o = {'ok': 1}
{ ok: 1 }
> a = [1, 2]
[ 1, 2 ]
> typeof o
'object'
> typeof a
'object'
>
> Object.prototype.toString.call(o)
'[object Object]'
> Object.prototype.toString.call(a)
'[object Array]'
>
> Object.prototype.toString.call(o).slice(8,).replace(/\]$/, '')
'Object'
> Object.prototype.toString.call(o).slice(8,).replace(/\]d$/, '')
'Object]'
> Object.prototype.toString.call(o).slice(8,).replace(/\]$/, '')
'Object'
>
>
> Object.prototype.toString.call(a).slice(8,).replace(/\]$/, '')
'Array'
>
> Object.prototype.toString.call(undefined).slice(8,).replace(/\]$/, '')
'Undefined'
> Object.prototype.toString.call(null).slice(8,).replace(/\]$/, '')
'Null'
>
> Object.prototype.toString.call('ok').slice(8,).replace(/\]$/, '')
'String'
> Object.prototype.toString.call(19).slice(8,).replace(/\]$/, '')
'Number'
> Object.prototype.toString.call(19.0).slice(8,).replace(/\]$/, '')
'Number'
> Object.prototype.toString.call(19.7).slice(8,).replace(/\]$/, '')
'Number'
>
*/

/*
	{
	    "entryType": "misc",
	    "key": "Nobody06",
	    "data": {
	        "author": "Nobody Jr",
	        "title": "My Article",
	        "year": 2006
	    }
	}
*/


/*
	[
	    {
	        "entryType": "Book",
	        "key": "michael",
	        "data": {
	            "author": "Michael Jackson",
	            "title": "My Kingdom For A Lollypop",
	            "publisher": "Neverland \\& Everland Publishing",
	            "year": 2004
	        }
	    },
	    {
	        "entryType": "Book",
	        "key": "elvis",
	        "data": {
	            "author": "Elvis Presley",
	            "title": "Turn Me One More Time",
	            "publisher": "Jail House Books",
	            "year": 1963
	        }
	    },
	    {
	        "entryType": "Book",
	        "key": "britney",
	        "data": {
	            "author": "Britn ey Spears",
	            "title": "Let's Go Oversea To Canada",
	            "publisher": "Blonde, Blondt \\& Blondey",
	            "year": 2007
	        }
	    },
	    {
	        "entryType": "Book",
	        "key": "marilyn",
	        "data": {
	            "editor": "Marilyn Manson",
	            "title": "I Love My Little Pony",
	            "publisher": "Pinc \\& Cuddley Press",
	            "year": 2005
	        }
	    },
	    {
	        "entryType": "Book",
	        "key": "elvis",
	        "data": {
	            "author": "Elvis Presley",
	            "title": "Turn Me One More Time",
	            "publisher": "Jail House Books",
	            "year": 1963
	        }
	    }
	]
*/