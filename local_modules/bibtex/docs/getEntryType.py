"""
{
	"created_on": "16 Sep 2018, Sun",
	"scrap_url": "http://bib-it.sourceforge.net/help/fieldsAndEntryTypes.php#article"
}
"""

import json
import requests
from bs4 import BeautifulSoup

def get_fields(s):
	fields = s.strip().strip('.') # "Required fields: author, title, note"
	fields = fields.split(':')[1]
	fields = fields.strip().strip('.')
	fields = [entry_type.strip() for entry_type in fields.split(',')]

	return fields

def main():
	url = "http://bib-it.sourceforge.net/help/fieldsAndEntryTypes.php#article"
	res = requests.get(url)

	print(res.status_code)
	text = res.text

	soup = BeautifulSoup(text, "html.parser")
	tables = soup.find_all('table')
	table1 = tables[1]

	print(len(tables))

	# print(table1)
	table1_contents = table1.contents
	table1_contents = table1_contents[1:len(table1_contents)-1] # Remove '\n', ' ' from front and end respectively.
	"""
	 [
		<tr>
			<td></td>
			<td></td>
		</tr>, 
		<tr>
			<td></td>
			<td></td>
		</tr>
		...
		...
		...
	]
	"""

	entry_types = {}
	for table1_content in table1_contents: 
		tr_contents = table1_content.contents
		print(tr_contents)
		print(len(tr_contents))

		td_contents = tr_contents[1].contents
		print(td_contents)
		# [' ', <p class="def">A document having an author and title, but not formally published. </p>, <p class=
		# "req">Required fields: author, title, note. </p>, <p class="opt">Optional fields: month, year.</p>, '\n
		# ']
		key = tr_contents[0].text.strip() # tr_contents[0].text => '\nunpublished'
		entry_types[key] = {}
		for index, td_content in enumerate(td_contents[1: len(td_contents)-1]):
			# ERROR (KeyError):
			# 	Traceback (most recent call last):
			# 	  File "getEntryType.py", line 49, in <module>
			# 	    print(td_content.text)
			# 	  File "C:\Users\rishi\Anaconda3\lib\site-packages\bs4\element.py", line 737, in __getattr__
			# 	    self.__class__.__name__, attr))
			# 	AttributeError: 'NavigableString' object has no attribute 'text'
			print(index, td_content.string) # print(td_content.text) => KeyError
			if index == 0:
				# {'description': 'Conference proceedings. ', ...}
				entry_types[key]["description"] = td_content.string.strip().strip('.')
			elif index == 1:
				# {
				# 	...
				# 	...
				# 	"techreport": {
				#         "description": "A report published by a school or other institution, usually numbered within a
				# series",
				#         "required_fields": "Required fields: author, title, institution, year",
				#         "optional_fields": "Optional fields: type, number, address, month, note"
					#    	},
					#    	"unpublished": {
				#         "description": "A document having an author and title, but not formally published",
				#         "required_fields": "Required fields: author, title, note",
				#         "optional_fields": "Optional fields: month, year"
					#    	}
				# }
				required_fields = get_fields(td_content.string)
                # entry_types[key]["required_fields"] = required_fields
				entry_types[key]["requiredFields"] = required_fields
			else:
				optional_fields = get_fields(td_content.string)
                # entry_types[key]["optional_fields"] = optional_fields
				entry_types[key]["optionalFields"] = optional_fields

	print(entry_types)

	"""
	...
	...
	...
	[<td><a name="unpublished"></a>
	<a href="#TOP" title="up">unpublished</a></td>, <td> <p class="def">A document having an author and tit
	le, but not formally published. </p><p class="req">Required fields: author, title, note. </p><p class="
	opt">Optional fields: month, year.</p>
	</td>]
	"""
	print(json.dumps(entry_types, indent=4))



# START
main()


"""
{
    "article": {
        "description": "An article from a journal or magazine",
        "required_fields": [
            "author",
            "title",
            "journal",
            "year"
        ],
        "optional_fields": [
            "volume",
            "number",
            "pages",
            "month",
            "note"
        ]
    },
    "book": {
        "description": "A book with an explicit publisher",
        "required_fields": [
            "author or editor",
            "title",
            "publisher",
            "year"
        ],
        "optional_fields": [
            "volume or number",
            "series",
            "address",
            "edition",
            "month",
            "note"
        ]
    },
    "booklet": {
        "description": "A work that is printed and bound, but without a named publisher or sponsoring i
nstitution",
        "required_fields": [
            "title"
        ],
        "optional_fields": [
            "author",
            "howpublished",
            "address",
            "month",
            "year",
            "note"
        ]
    },
    "inbook": {
        "description": "A part of a book, e.g., a chpater, section, or whatever and/or a range of pages
",
        "required_fields": [
            "author or editor",
            "title",
            "chapter and/or pages",
            "publisher",
            "year"
        ],
        "optional_fields": [
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
        "required_fields": [
            "author",
            "title",
            "booktitle",
            "publisher",
            "year"
        ],
        "optional_fields": [
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
        "required_fields": [
            "author",
            "title",
            "booktitle",
            "year"
        ],
        "optional_fields": [
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
        "required_fields": [
            "title"
        ],
        "optional_fields": [
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
        "required_fields": [
            "author",
            "title",
            "school",
            "year"
        ],
        "optional_fields": [
            "type",
            "address",
            "month",
            "note"
        ]
    },
    "misc": {
        "description": "Use this type when nothing else fits. A warning will be issued if all optional
fields are empty (i.e., the entire entry is empty or has only ignored fields)",
        "required_fields": [
            "none"
        ],
        "optional_fields": [
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
        "required_fields": [
            "author",
            "title",
            "school",
            "year"
        ],
        "optional_fields": [
            "type",
            "address",
            "month",
            "note"
        ]
    },
    "proceedings": {
        "description": "Conference proceedings",
        "required_fields": [
            "title",
            "year"
        ],
        "optional_fields": [
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
        "description": "A report published by a school or other institution, usually numbered within a
series",
        "required_fields": [
            "author",
            "title",
            "institution",
            "year"
        ],
        "optional_fields": [
            "type",
            "number",
            "address",
            "month",
            "note"
        ]
    },
    "unpublished": {
        "description": "A document having an author and title, but not formally published",
        "required_fields": [
            "author",
            "title",
            "note"
        ],
        "optional_fields": [
            "month",
            "year"
        ]
    }
}
"""