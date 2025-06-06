const fs = require("fs")

// fs.readFile("BibTeX_multiple.bib", 'utf-8', (err, data) => {
// 	if(err)
// 		console.log("Error while reading " + err);
// 	else {
// 		data = data.trim();
// 		console.log(data);

// 		console.log()
// 	}
// })

// for(let ok=1; ok <=10; ok++) { 
// 	let ok2 = 'hhd';

// 	console.log('ok')
// }


{
	let ok = 1;
	{
		let ok = 2;

		console.log(ok); // 2
	}
	console.log(ok) // 1
}