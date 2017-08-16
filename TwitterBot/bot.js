/**
Aug 15, 2017
Twitter Bot is used to practice the Twitter API in conjunction with Node.js
*/

// Dependencies =========================
var
    twit = require('twit'),
    config = require('./config');



var Twitter = new twit(config);


// String that holds the desired stream keywords
var StreamEntry = "Rick and Morty";

// ================ RETWEET BOT ====================== //

// Function that calls twitter api to 
// "Result_type" and "lang" are optional
// find latest tweet according the query 'q' in params

var retweet = function() {
  var params = {
  	// Query filter for anything with Rick and morty with a link
    q: StreamEntry + ' Stream filter:links',	
    result_type: 'recent',
    lang: 'en'    
  } 

  // for more parametes, see: https://dev.twitter.com/rest/reference/get/search/tweets

    Twitter.get('search/tweets', params, function(err, data) {
      // if there no errors
        if (!err) {
          // grab ID of tweet to retweet
            var retweetId = data.statuses[0].id_str;
            // Tell TWITTER to retweet
            Twitter.post('statuses/retweet/:id', {
                id: retweetId
            }, function(err, response) {
                if (response) {
                    console.log('Retweeted!!!');
                }
                // if there was an error while tweeting
                if (err) {
                    console.log('Something went wrong while RETWEETING... Duplication maybe...');
                }
            });
        }
        // if unable to Search a tweet
        else {
          console.log('Something went wrong while SEARCHING...');
        }
    });
}

// grab & retweet as son as program is running..
retweet();
// retweet in every 50 minutes
setInterval(retweet, 30000);


// ================ FAVORITE BOT ====================== //

// FIND A RANDOM TWEET AND 'FAVORITE IT'

var favoriteTweet = function(){
	var params = {
		q: '#nodesjs, #Nodejs', // Required
		result_type: 'recent',
		lang: 'en'
	}

	// for more parameters,see: https://dev.twitter.com/rest/reference

	//find the tweet
	Twitter.get('search/tweets', params, function(err, data){

		// find tweets

		var tweet = data.statuses;
		var randomTweet = ranDom(tweet);

		// if random tweet exists
		if(typeof randomTweet != 'undefined'){
			// Tell twitter to 'favorite'
			Twitter.post('favorites/create', {id: randomTweet.id_str}, function(err, response) {
				// if there was an error while 'favoriting' the tweet
				if(err){
					console.log('CANNOT BE FAVORITE... Error');
				}
				else{
					console.log('FAVORITED... Success!!!');
				}
			})
		}

	});
}

// function to generate a random tweet tweet
function ranDom (arr) {
  var index = Math.floor(Math.random()*arr.length);
  return arr[index];
};


