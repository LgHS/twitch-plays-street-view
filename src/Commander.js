let EventEmitter = require('events').EventEmitter;
let CDP = require('chrome-remote-interface');

class Commander extends EventEmitter {
  constructor() {
    super();

    this.client = null;
    this.chrome = null;
  }

  run(chrome) {
    let self = this;

    CDP((client) => {
      this.client = client;

      // extract domains
      const {Network, Page, Input} = client;
      // setup handlers
      Network.requestWillBeSent((params) => {
        //console.log(params.request.url);
      });
      Page.loadEventFired(() => {
        self.emit('ready');
      });
      // enable events then start!
      Promise.all([
        Network.enable(),
        Page.enable()
      ]).then(() => {
        return Page.navigate({url: process.env.CHROME_URL});
      }).catch((err) => {
        console.error(err);
        client.close();
      });
    }).on('error', (err) => {
      // cannot connect to the remote endpoint
      console.error(err);
    });
  }

  sendKey(key) {
    if(!this.client) {
      console.error('Chrome remote interface not ready. Call run() ?');
      return;
    }

    this.client.send('Input.dispatchKeyEvent', {
      type: 'keyDown',
      // text: 'a',
      // unmodifiedText: 'a',
      nativeVirtualKeyCode: 92,
      // keyIdentifier: 'U+0038',
      code: 'ArrowUp',
      key: 'ArrowUp',
    }, (e) => {
      console.log('send key', e);
    });
  }
}

module.exports = Commander;
