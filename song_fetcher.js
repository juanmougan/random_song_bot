// TODO use this require('dotenv').config();
const util = require('util')

let fetch = require('node-fetch')
const API_KEY = process.env.SONGS_API_KEY
let threshold = 7220

// TODO returns this
/*
"totalPages": "7220" 
*/
// I should use that as random's threshold

var getSong = (err, userName, success) => {
  let randomPageNumber = Math.floor(Math.random() * threshold) + 1
  console.log("Will get song # " + randomPageNumber)
  let url = 'http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=' + userName + '&api_key=' + API_KEY +'&limit=1&page=' + randomPageNumber + '&format=json'
  fetch(url)
    .then((res) => { 
      return res.json() })
    .then((body) => {
      let title = body.toptracks.track[0].name
      let artist = body.toptracks.track[0].artist.name
      console.log("Got " + title + " by " + artist)
      success(title, artist)
    })
    .catch((error) => {
      err(error)
    })
}

module.exports = {
  getSong : getSong
}
