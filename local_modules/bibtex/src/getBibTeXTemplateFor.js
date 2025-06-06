/*
	Created: 23 Sep 2018, Sun
*/
const getEntryTypeFields = require("./getEntryTypeFields");
const getEntryTypes = require("./getEntryTypes");
const util = require('util');

module.exports = function getBibTexTemplateFor(entryType, format=1) {
	let entryTypeFields = getEntryTypeFields();
	let entryTypes = getEntryTypes();

	// console.log(entryTypes);
	// console.log(entryType);

	// console.log(entryTypes.indexOf(entryType))

	if(!/^\d+$/g.test(format)) { // If format is not an integer
		return null;
	}

	if(!( format >=1 && format <=3)) // If format is not in range [1-3]
		return null;

	if(!(entryTypes.indexOf(entryType) > -1)) {
		return null;
	} else {
		let entryTypeObj = entryTypeFields[entryType];
		let keyValues = [];
		let output = '@' + entryType + "{" + entryType + 'Key' + ",\n";

		let fields = [];
		let requiredFields = entryTypeObj["requiredFields"];
		let optionalFields = entryTypeObj["optionalFields"];
		// console.log(requiredFields);
		// console.log(optionalFields);

		fields = fields.concat(requiredFields);
		// console.log(fields);
		fields = fields.concat(optionalFields);
		// console.log(fields);

		for(let index in fields) {
			let key = entryTypes[index]; // 'article', 'inproceedings', 'inbook' etc.
			if(format === 1)
				keyValues.push(util.format('\t%s = {""}', key));
			else if(format === 2) 
				keyValues.push(util.format('\t%s = ""', key));
			else // As index has already been validated before (These's no need to check => format===3)
				keyValues.push(util.format('\t%s = {}', key));
		}

		output += keyValues.join(',' + '\n');
		output += "\n}";
		return output;
	}
}
