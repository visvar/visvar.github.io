## article entry
An article from a journal or magazine.

Format:

     @ARTICLE{citation_key,
              required_fields [, optional_fields] }
Required fields: author, title, journal, year

Optional fields: volume, number, pages, month, note

```javascript
	var requiredFields = ['author', 'title', 'journal', 'year']
	var optionalFields = ['volume', 'number', 'pages', 'month', 'note']

```

## book entry
A book with an explicit publisher.

Format:

     @BOOK{citation_key,
           required_fields [, optional_fields] }
Required fields: author or editor, title, publisher, year

Optional fields: volume, series, address, edition, month, note

```javascript
	var requiredFields = ['author|editor', 'title', 'publisher', 'year']
	var optionalFields = ['volume', 'series', 'address', 'edition', 'month', 'note']
```

## booklet entry
A work that is printed and bound, but without a named publisher or sponsoring institution.

Format:

     @BOOKLET{citation_key,
              required_fields [, optional_fields] }
Required fields: title

Optional fields: author, howpublished, address, month, year, note

```javascript
	var requiredFields = ['title']
	var optionalFields = ['author', 'howpublished', 'address', 'month', 'year', 'note']
```

## conference entry
An article in the proceedings of a conference. This entry is identical to the 'inproceedings' entry and is included for compatibility with another text formatting system.

Format:

     @CONFERENCE{citation_key,
                 required_fields [, optional_fields] }
Required fields: author, title, booktitle, year

Optional fields: editor, pages, organization, publisher, address, month, note

```javascript
	var requiredFields = ['author', 'title', 'booktitle', 'year']
	var optionalFields = ['editor', 'pages', 'organization', 'publisher', 'address', 'month', 'note']
```
## inbook entry
A part of a book, which may be a chapter and/or a range of pages.

Format:

     @INBOOK{citation_key,
             required_fields [, optional_fields] }
Required fields: author or editor, title, chapter and/or pages, publisher, year

Optional fields: volume, series, address, edition, month, note

```javascript
	var requiredFields = ["author|editor", "title", "chapter(&|)pages", "publisher", "year"]
	var optionalFields = ['volume', 'series', 'address', 'edition', 'month', 'note']
```
## incollection entry
A part of a book with its own title.

Format:

     @INCOLLECTION{citation_key,
                   required_fields [, optional_fields] }
Required fields: author, title, booktitle, year

Optional fields: editor, pages, organization, publisher, address, month, note

```javascript
	var requiredFields = ['author', 'title', 'booktitle', 'year']
	var optionalFields = ['editor', 'pages', 'organization', 'publisher', 'address', 'month', 'note']
```
## inproceedings entry
An article in the proceedings of a conference.

Format:

     @INPROCEEDINGS{citation_key,
                    required_fields [, optional_fields] }
Required fields: author, title, booktitle, year

Optional fields: editor, pages, organization, publisher, address, month, note

```javascript
	var requiredFields = ['author', 'title', 'booktitle', 'year']
	var optionalFields = ['editor', 'pages', 'organization', 'publisher', 'address', 'month', 'note']
```

## manual entry
Technical documentation.

Format:

     @MANUAL{citation_key,
             required_fields [, optional_fields] }
Required fields: title

Optional fields: author, organization, address, edition, month, year, note

```javascript
	var requiredFields = ['title']
	var optionalFields = ['author', 'organization', 'address', 'edition', 'month', 'year', 'note']
```

## mastersthesis entry
A Master's thesis.

Format:

     @MASTERSTHESIS{citation_key,
                    required_fields [, optional_fields] }
Required fields: author, title, school, year

Optional fields: address, month, note

```javascript
	var requiredFields = ['author', 'title', 'school', 'year']
	var optionalFields = ['address', 'month', 'note']
```

## misc entry
Use this type when nothing else seems appropriate.

Format:

     @MISC{citation_key,
           required_fields [, optional_fields] }
Required fields: none

Optional fields: author, title, howpublished, month, year, note

```javascript
	var requiredFields = [] // null
	var optionalFields = ['author', 'title', 'howpublished', 'month', 'year', 'note']
```

## phdthesis entry
A PhD thesis.

Format:

     @PHDTHESIS{citation_key,
                required_fields [, optional_fields] }
Required fields: author, title, school, year

Optional fields: address, month, note

```javascript
	var requiredFields = ['author', 'title', 'school', 'year']
	var optionalFields = ['address', 'month', 'note']
```

## proceedings entry
The proceedings of a conference.

Format:

     @PROCEEDINGS{citation_key,
                  required_fields [, optional_fields] }
Required fields: title, year

Optional fields: editor, publisher, organization, address, month, note

```javascript
	var requiredFields = ['title', 'year']
	var optionalFields = ['editor', 'publisher', 'organization', 'address', 'month', 'note']
```

## techreport entry
A report published by a school or other institution, usually numbered within a series.

Format:

     @TECHREPORT{citation_key,
                 required_fields [, optional_fields] }
Required fields: author, title, institution, year

Optional fields: type, number, address, month, note

```javascript
	var requiredFields = ['author', 'title', 'institution', 'year']
	var optionalFields = ['type', 'number', 'address', 'month', 'note']
```

## unpublished entry
A document with an author and title, but not formally published.

Format:

     @UNPUBLISHED{citation_key,
                  required_fields [, optional_fields] }
Required fields: author, title, note

Optional fields: month, year

```javascript
	var requiredFields = ["author", "title", "note"]
	var optionalFields = ["month", "year"]
```
