let TelegramBot = require('node-telegram-bot-api')
let songFetcher = require("./song_fetcher");
const token	= ''									// TODO need a real token
let bot = new TelegramBot(token, { polling: true });

let errorHandler = (err) => { 
  bot.sendMessage(msg.chat.id, "Currently unavailable")
}

let songInfo = (song) => {
  return song.artist + " - " + song.getTitle		// TODO Syncronous here?
}

const pattern = /\/songs (.+)/							// TODO check this
bot.onText(pattern, function (msg) {
  songFetcher.getTitle(errorHandler, (song) => {
    console.log(`Responding /movie to ${msg.chat.id} with : ${songInfo(song)}`); 
    bot.sendMessage(msg.chat.id, songInfo(song));
  });
});
