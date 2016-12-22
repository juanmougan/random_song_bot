// TODO use this require('dotenv').config();

let fetch = require('node-fetch')
const API_KEY = process.env.SONGS_API_KEY
let userName = 'juanma_greenday'
let randomPageNumber = 123		// TODO this should be a random > 0
// TODO returns this
/*
"totalPages": "7220" 
*/
// I should use that as random's threshold
let baseUrl = 'http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=' + userName + '&api_key=' + API_KEY +'&limit=1&page=' + randomPageNumber + '&format=json'

/*
var getSong = (err, success) => {
  fetch(url)
    .then((res) => { return res.json() })
    .then((data) => {
    })
    .catch((error) => {
      err(error)
    })
}
*/

var getSong = (err, success) => {
  success("Let It Be", "The Beatles")
}

module.exports = {
  getSong : getSong
}
