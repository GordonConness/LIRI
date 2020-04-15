require("dotenv").config();

var Spotify = require("node-spotify-api");
var keys = require("./keys");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");

switch (choice) {
    case "concert-this":
        concert(input);
        break;
    case "spotify-this":
        if (input) {
            spotifyThis(input);
        } else {
            spotifyThis("");
        }
}


function concert(artist) {
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(function (response) {
        var songData = response.data[0];
        console.log(`
        \nVenue Name: ${songData.venue.name}
        \nVenue Location: ${songData.venue.city}, ${songData.venue.region}
        \nDate of Event: ${ moment(response.data[0].datetime).format("MM/DD/YYYY")}
        `);

    })
}

var spotifyAPI = function(songName) {
    if (songName === undefined) {
      songName = "";
    }
    spotify.search(
      {
        type: "track",
        query: songName,
        limit: 10
        .request("https://api.spotify.com/v1/tracks/")
        .then(function(data) {
            console.log(data); 
        },
        function(err, data) {
            if (err) {
              console.log("Error occurred: " + err);
              return;
        }
        var songs = data.tracks.items;
        for (var i = 0; i < songs.length; i++) {
          console.log(i);
          console.log("Artist name: " + songs[i].artists[0].name);
          console.log("Song title: " + songs[i].name);
          console.log("Track number: " + songs[i].track_number);
          console.log("Album: " + songs[i].album.name);
          console.log("Release date: " + songs[i].album.release_date);
          console.log("Album type: " + songs[i].album.album_type);
          console.log("Preview song: " + songs[i].preview_url);
          console.log("");
        }
        }
        )
        
    }
    );

    function fsRead() {
        fs.readFile("random.txt", "utf-8", function (err, data) {
            if (err) {
                return console.log(error);
            }
            var random = data.split(",");
            spotifyAPI(random[1]);
        });
    
    }


};
