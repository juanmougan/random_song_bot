require('dotenv').config()
let TelegramBot = require('node-telegram-bot-api')
let songFetcher = require("./song_fetcher")

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN
const DEFAULT_USER = process.env.DEFAULT_USER
let bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true })

let errorHandler = (err) => { 
  bot.sendMessage(msg.chat.id, "Currently unavailable")
}

const SONGS_PATTERN = /\/song (.+)/
bot.onText(SONGS_PATTERN, function (msg, match) {
  let userName = match[1] || DEFAULT_USER
  console.log("Received /song and userName: " + userName)
  songFetcher.getSong(errorHandler, userName, (title, artist) => {
  	let songInfo = artist + " - " + title
    console.log(`Responding /songs to ${msg.chat.id} with : ${songInfo}`) 
    bot.sendMessage(msg.chat.id, songInfo)
  })
})
