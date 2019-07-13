const { execSync } = require('child_process');

const init = function() {
  return execSync('stty -F /dev/serial0 19200')
}

const print = function(text, style={}) {
  return execSync(`echo "${text}\\n\\n\\n" > /dev/serial0`)
}

module.exports = {
  init,
  print
}
