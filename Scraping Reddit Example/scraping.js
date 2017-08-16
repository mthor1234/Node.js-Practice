// Using tut: https://youtu.be/LJHpm0J688Y

var request = require('request'),
	cheerio = require('cheerio'),
	fs = require('fs'),	// File stream module

	// Save all links to an array
	urls = [];


// Using Reddit.com for webscraping

request('http://www.reddit.com', function(err, resp, body){


	// If response status is 200 and there isn't an error, then good request and proceed
	if(!err && resp.statusCode == 200){

		// Load the html maniuplation into Cheerio
		var $ = cheerio.load(body);

		// Selector for Reddit URL's. The selector is based off of the DOM
		// Reddit uses #siteTable 

		// Find all links that have the class "Title" and search within the context of "siteTable"
		$('a.title', '#siteTable').each(function(){

			// Get the URL by finding all attributes that have "href". Save into 'url' variable
			var url = $(this).attr('href');

			// If the imgur link is just a photo i.e. has the prefix i.imgur, then push it to the array
			if(url.indexOf('i.imgur.com')!= -1){
			urls.push(url);
		}

		});
			console.log(urls.length);
			// Iterate through the array of urls and save all of the images to the 'img' directory
			for(var i = 0; i < urls.length; i++){
				request(urls[i]).pipe(fs.createWriteStream('img/' + i + '.jpg'));

			}

	}


});

