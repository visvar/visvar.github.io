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
    table2 = tables[2]

    # print(len(tables))

    # print(tables)
    table2_contents = table2.contents
    table2_contents = table2_contents[1:len(table2_contents)-1] # Remove '\n', ' ' from front and end respectively.

    # print(table2_contents)
    fields = {}
    for table2_content in table2_contents:
        tr_contents = table2_content.contents;
        # [<td><a name="year"></a>
        # <a href="#TOP" title="up">year</a></td>, <td> <p class="def">The year of publication or, for an unpublished work, the year it was written. </p><p class="desc">Generally, it should consist of four numerals, such as 1984, although the standard styles can handle any year whose last four nonpunctuation characters are numerals, such as "about 1984".</p>
        # </td>]

        # print(tr_contents);
        # print(type(tr_contents[0])) # <class 'bs4.element.Tag'>
        field = tr_contents[0].text; #  tr_contents[0].string => None
        print(field);

        td_contents = tr_contents[1].contents; # All p elements
        print(td_contents)

        my_note = td_contents[2].string;
        if not my_note:
            note = ''
        else:
            note = my_note;

        print("...", td_contents)

        my_description = td_contents[1].string

        if not my_description:
            description = '';
        else:
            description = my_description;

        fields[field.strip()] = {
            "description": description.strip(),
            "note": note.strip(),
        };

    print(json.dumps(fields, indent=4))

# START
main()


"""
    {
        "address": {
            "description": "",
            "note": ""
        },
        "annote": {
            "description": "",
            "note": ""
        }
    }
"""
