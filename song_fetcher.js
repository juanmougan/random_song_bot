// TODO use this require('dotenv').config();

let fetch = require('node-fetch')
const API_KEY = process.env.SONGS_API_KEY
let userName = 'juanma_greenday'
let threshold = 7220
let randomPageNumber = Math.floor(Math.random() * threshold) + 1
console.log("Will get song # " + randomPageNumber)
// TODO returns this
/*
"totalPages": "7220" 
*/
// I should use that as random's threshold
let url = 'http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=' + userName + '&api_key=' + API_KEY +'&limit=1&page=' + randomPageNumber + '&format=json'

var getSong = (err, success) => {
  fetch(url)
    .then((res) => { return res.json() })
    .then((data) => {
      console.log("Got this: " + data)
      let title = data.toptracks.track[0].name
      let artist = data.toptracks.track[0].artist.name
      console.log("Got " + title + " by " + artist)
      success(title, artist)
    })
    .catch((error) => {
      err(error)
    })
}

/*
var getSong = (err, success) => {
  success("Let It Be", "The Beatles")
}
*/

module.exports = {
  getSong : getSong
}
