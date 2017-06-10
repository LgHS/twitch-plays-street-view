require('dotenv').config();

// let chatBot = new (require('./src/ChatBot'))();
let chrome = new (require('./src/Chrome'))();
let commander = new (require('./src/Commander'))();

chrome.open();

setTimeout(() => {
  console.log('start commander');
  commander.run();
}, 3000); // wait for chrome to boot

commander.on('ready', () => {
  setInterval(() => {
    // commander.sendKey(38);
  }, 2000);
});


// chatBot.on('messageReceived', (payload) => {
// console.log(payload.message);
// });

// chatBot.run();
