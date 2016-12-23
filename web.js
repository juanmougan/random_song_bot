var express = require('express');

var app = express();

app.get('/', function (req, res) {
  res.json({ "hello": "Welcome to the random_song_bot!" });
});

var server = app.listen(process.env.PORT, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Web server started at http://%s:%s', host, port);
});
