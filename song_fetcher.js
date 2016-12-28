// TODO use this require('dotenv').config();
const util = require('util')

let fetch = require('node-fetch')
const API_KEY = process.env.SONGS_API_KEY
let threshold = 7220

var getSongsThreshold = (err, userName, success) => {
  let onePageUrl = 'http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=' 
    + userName + '&api_key=' + API_KEY +'&limit=1&page=1&format=json'
  fetch(onePageUrl)
    .then((res) => {
      return res.json()
    })
    .then((body) => {
      success(body.toptracks['@attr'].totalPages)
    })
    .catch((error) => {
      err(error)
    })
}

var getSong = (err, userName, success) => {
  getSongsThreshold(err, userName, (thresholdSuccess) => {
  	console.log("Threshold set to: " + thresholdSuccess)
  	let randomPageNumber = Math.floor(Math.random() * thresholdSuccess) + 1
  	console.log("Will get song # " + randomPageNumber)
    let url = 'http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=' + userName + '&api_key=' + API_KEY +'&limit=1&page=' + randomPageNumber + '&format=json'
    fetch(url)
      .then((res) => { 
        return res.json()
      })
      .then((body) => {
        let title = body.toptracks.track[0].name
        let artist = body.toptracks.track[0].artist.name
        console.log("Got " + title + " by " + artist)
        success(title, artist)
      })
      .catch((error) => {
        err(error)
      })
  })  
}

module.exports = {
  getSong : getSong
}
