const USER_EXP_TIME = 60 * 60 * 24 * 30		// Roughly one month
let redis = require('redis');
// create a new redis client and connect to our local redis instance
let client = redis.createClient();

// if an error occurs, print it to the console
client.on('error', function (err) {
  console.log("Error connecting to Redis: " + err);
});

client.on('connect', function() {
  console.log('connected');
});

// To set with expiration
// client.setex('some key', USER_EXP_TIME, 'some value');
