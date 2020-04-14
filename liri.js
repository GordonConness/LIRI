
require("dotenv").config();

var Spotify = require("node-spotify-api");
var keys = require("./keys");
var request = require("request");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);

var callSpotifyAPI = function(songName) {
    if (songName === undefined) {
      songName = "1999";
    }
    spotify.search(
      {
        type: "track",
        query: songName,
        limit: 15
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
