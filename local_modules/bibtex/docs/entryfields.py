import json 

def main(fileName):
	with open(fileName, "r") as f:
		entry_fields = [];
		for line in f.readlines():
			entry_fields.extend(line.strip().split());

	return entry_fields;

if __name__  == "__main__":
	# Modify here (only)
	print(json.dumps(main("entryfields.txt"), indent=4));


"""Input

abstract	addendum	afterword	annotate
author	authortype	bookauthor	bookpagination
booksubtitle	booktitle	chapter	commentator
date	doi	edition	editor
editortype	eid	entrysubtype	eprint
eprinttype	eprintclass	eventdate	eventtitle
file	foreword	holder	howpublished
indextitle	institution	introduction	isan
isbn	ismn	isrn	issue
issuesubtitle	issuetitle	iswc	journalsubtitle
journaltitle	label	language	library
location	mainsubtitle	maintitle	month
note	number	organization	origdate
origlanguage	origlocation	origpublisher	origtitle
pages	pagetotal	pagination	part
publisher	pubstate	reprinttitle	series
shortauthor	shortedition	shorthand	shorthandintro
shortjournal	shortseries	shorttitle	subtitle
title	translator	type	url
venue	version	volume	year
"""



"""Output
[
    "abstract",
    "addendum",
    "afterword",
    "annotate",
    "author",
    "authortype",
    "bookauthor",
    "bookpagination",
    "booksubtitle",
    "booktitle",
    "chapter",
    "commentator",
    "date",
    "doi",
    "edition",
    "editor",
    "editortype",
    "eid",
    "entrysubtype",
    "eprint",
    "eprinttype",
    "eprintclass",
    "eventdate",
    "eventtitle",
    "file",
    "foreword",
    "holder",
    "howpublished",
    "indextitle",
    "institution",
    "introduction",
    "isan",
    "isbn",
    "ismn",
    "isrn",
    "issue",
    "issuesubtitle",
    "issuetitle",
    "iswc",
    "journalsubtitle",
    "journaltitle",
    "label",
    "language",
    "library",
    "location",
    "mainsubtitle",
    "maintitle",
    "month",
    "note",
    "number",
    "organization",
    "origdate",
    "origlanguage",
    "origlocation",
    "origpublisher",
    "origtitle",
    "pages",
    "pagetotal",
    "pagination",
    "part",
    "publisher",
    "pubstate",
    "reprinttitle",
    "series",
    "shortauthor",
    "shortedition",
    "shorthand",
    "shorthandintro",
    "shortjournal",
    "shortseries",
    "shorttitle",
    "subtitle",
    "title",
    "translator",
    "type",
    "url",
    "venue",
    "version",
    "volume",
    "year"
]
"""
