// Definitely lot of problems in this one but I tried to make a decent foundation to fix when
// I have a better understanding of using node



// package request for twitter, spotify, omdb, twitter keys in keys.js, and fs
var Twitter = require('twitter');
var twitKeys = require('./keys.js');

var ombdApi = require('omdb');

var request = require('request');
var fs = require('fs');
var Spotify = require('node-spotify-api');

var inputOne = process.argv[2];
var inputTwo = process.argv[3];


// function to grab last 20 tweets
function getTweets(){
	// params will pass the screen name and desired tweet count into client.get
	var params = {
		screen_name:'chrisjb312',
		count:20
	};

	//requests info from twitter api
	client.get('statuses/user_timelline', params, function(error, tweets, response) {
		if (!error){
			console.log(tweets);
			//loops the tweetsf
		}else {

			for (i = 0; i < tweets.length; i++){
				console.log(tweets[i].text);
			}

		}
	})

};


//function for to get a song with spotify
function spotifySong (){

	//spoitfy api keys
	var spotify = new Spotify({
	id: '627c9dea6d7d4b0cb9f95d491e71ea04'
	secret: '17a464b3930b4af48d75bfa2f66d3f63'
});

	//song search
	spotify.search({
		type: 'track',
		query: trackName
	}, 
	function(error, data){
		//logging any occuring errors
		if (error){
			return console.log("Error occured" + error);
		}else{
			var trackInfo: data.tracks.items[0];
			// displays artist/song/album on seperate lines
			var trackDetails = "Artist: " + trackInfo.artists[0].name + "\n" +
				"Song: " + trackInfo.name + "\n" +
				"Album: " + trackInfo.album.name + "\n"; 
		}
	}

};

// movie function using omdb api
function movieThis() {
	//omdb key
	var movieKey = '40e9cece';

	// API request for desired movie
	request("http://www.omdbapi.com/?t="+movieName+"&y=&tomatoes=true&plot=short&r=json", function(error, response, body) {

		if (!error && response.statusCode === 200) {

			// Movie info
    		console.log("Title:", JSON.parse(body).Title);
    		console.log("Year:", JSON.parse(body).Year);
    		console.log("imdbRating:", JSON.parse(body).imdbRating);
    		console.log("Country:", JSON.parse(body).Country);
    		console.log("Language:", JSON.parse(body).Language);
    		console.log("Plot:", JSON.parse(body).Plot);
    		console.log("Actors:", JSON.parse(body).Actors);
    		console.log("TomatoMeter:", JSON.parse(body).tomatoMeter);
    		console.log("TomatoURL:", JSON.parse(body).tomatoURL);
  		}
  		else {
  			return console.log(error);
  		}
})
};

function justDoIt(){
	
}



//switch case that functions based off user input using the getTweets/spotifySong/
// movieThis/justDoIt functions

switch(inputOne) {
	case "my-tweets":
	getTweets();
	break;

	case "spotify-this-song":
	spotifySong();
	break;

	case "movie-this";
	movieThis();
	break;

	case "do-what-it-says":
	justDoIt();
	break;
}


