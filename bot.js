// TODO use this require('dotenv').config()
let TelegramBot = require('node-telegram-bot-api')
let songFetcher = require("./song_fetcher")

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN
let bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true })

let errorHandler = (err) => { 
  bot.sendMessage(msg.chat.id, "Currently unavailable")
}

const SONGS_PATTERN = /\/song (.+)/
bot.onText(SONGS_PATTERN, function (msg) {
  console.log("Received /song")
  songFetcher.getSong(errorHandler, (title, artist) => {
  	let songInfo = artist + " - " + title
    console.log(`Responding /songs to ${msg.chat.id} with : ${songInfo}`) 
    bot.sendMessage(msg.chat.id, songInfo)
  })
})
