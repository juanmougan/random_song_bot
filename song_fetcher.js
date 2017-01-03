const util = require('util')

let fetch = require('node-fetch')
const API_KEY = process.env.SONGS_API_KEY

var fetchThresholdFromRedis( err, userName, (found, notFound) => {

}

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

var retrieveSong = (threshold, songCallback) => {
  console.log("Threshold set to: " + threshold)
  let randomPageNumber = Math.floor(Math.random() * threshold) + 1
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
}

var getSong = (err, userName, success) => {
  fetchThresholdFromRedis( err, userName, 
    (found) => {
      // TODO don't know about these callbacks
      retrieveSong(threshold)
    }
    (notFound) => {
      retrieveSong(threshold)
    }
  )
}

module.exports = {
  getSong : getSong
}
