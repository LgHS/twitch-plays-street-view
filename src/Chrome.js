const spawn = require('child_process').spawn;

class Chrome {
  constructor() {
    this.process = null;
  }

  open() {
    this.process = spawn('/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome', [
      `--remote-debugging-port=9222`,
      `--user-data-dir=\.tmp`,
      `--mute-audio`,
      `--aggressive-cache-discard`
    ]);
  }

  close() {
    this.process.kill();
  }
}

module.exports = Chrome;
