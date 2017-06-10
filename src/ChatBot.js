let irc = require('irc');
let EventEmitter = require('events').EventEmitter;
let util = require('util');

class ChatBot extends EventEmitter {
  constructor() {
    super();

    this.client = new irc.Client(process.env.SERVER_URL, process.env.IRC_BOT_NAME, {
      channels: [process.env.IRC_CHANNEL + ' ' + process.env.IRC_PASSWORD],
      username: process.env.IRC_BOT_NAME,
      password: process.env.IRC_PASSWORD,
      debug: process.env.DEBUG,
    });
  }

  run() {
    let self = this;

    this.client.addListener('message', function (from, to, message) {
      if(to == process.env.IRC_CHANNEL) {
        self.emit('messageReceived', {
          from,
          to,
          message
        });
      }
    });

    this.client.addListener('error', function(message) {
      console.error('error: ', message);
    });
  }
}

module.exports = ChatBot;
