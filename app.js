let express = require('express')
let songFetcher = require("./song_fetcher")

var app = express()
var router = express.Router()

//router.get('/songs/:user_name', function(req, res, next) {
app.get('/songs/:user_name', function(req, res, next) {
  console.log("GET /songs");
  songFetcher.getSong(
    (err) => {res.send(500, err)}, 
    (songTitle, songArtist) => { 
  	  res.status(200).send({title : songTitle, artist : songArtist}) 
    }
  )
})

const PORT = 3001
app.listen(PORT, function () {
  console.log('Songs bot listening on port ' + PORT)
})

// module.exports = app;
