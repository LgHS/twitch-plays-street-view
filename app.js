require('dotenv').config();

// let chatBot = new (require('./src/ChatBot'))();
let commander = new (require('./src/Commander'))();
let chromeLauncher = require('chrome-launcher');


chromeLauncher.launch({
  startingUrl: process.env.CHROME_URL,
  port: 9222,
  chromeFlags: [
    `--user-data-dir=\.tmp`,
    `--mute-audio`,
    `--aggressive-cache-discard`
  ]
}).then(chrome => {
  commander.run();
});

commander.on('ready', () => {
  setInterval(() => {
    commander.sendKey(38);
  }, 2000);
});


// chatBot.on('messageReceived', (payload) => {
// console.log(payload.message);
// });

// chatBot.run();
