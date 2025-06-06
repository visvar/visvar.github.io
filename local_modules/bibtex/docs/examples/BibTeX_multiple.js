const fs = require("fs")

fs.readFile("BibTeX_multiple.bib", 'utf-8', (err, data) => {
/*
	@Book{michael,
	    author = "Michael Jackson",
	    title = "My Kingdom For A Lollypop",
	    publisher = "Neverland \& Everland Publishing",
	    year = 2004
	}

	@Book{elvis,
	    author = "Elvis Presley",
	    title = "Turn Me One More Time",
	    publisher = "Jail House Books",
	    year = 1963
	}

	@Book{britney,
	    author = "Britn ey Spears",
	    title = "Let's Go Oversea To Canada",
	    publisher = "Blonde, Blondt \& Blondey",
	    year = 2007
	}

	@Book{marilyn,
	    author = "Marilyn Manson",
	    title = "I Love My Little Pony",
	    publisher = "Pinc \& Cuddley Press",
	    year = 2005,
	}
*/
	if(err)
		console.log("Error while reading " + err);
	else {
		data = data.trim();
		console.log(data);
		console.log('\n');

		// data = data.replace(/\s*/g, '')
		// console.log(data);

		// let arr = data.match(/@\w+\{.+,(\w+\s+=\s+.*[\,])+\}/g);
		let arr = data.match(/@\w+\{.+\,(\s*\w+\s*=\s*["\{].*["\}](\,)?)+\s*\}/g)
		// let arr.
		console.log(JSON.stringify(arr, null, 4))
	}

/*
	@Book{elvis,
	    author = "Elvis Presley",
	    title = "Turn Me One More Time",
	    publisher = "Jail House Books",
	    year = 1963
	}

	@Book{britney,
	    author = "Britney Spears",
	    title = "Let's Go Oversea To Canada",
	    publisher = "Blonde, Blondt \& Blondey",
	    year = 2007
	}

	@Book{marilyn,
	    author = "Marilyn Manson",
	    title = "I Love My Little Pony",
	    publisher = "Pinc \& Cuddley Press",
	    year = 2005,
	}
*/
})
