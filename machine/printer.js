const { execSync } = require('child_process');

const init = function() {
  return execSync('stty -F /dev/serial0 19200')
}

const print = function(text = "", style={}) {
  return execSync(`echo -n "${text}" > /dev/serial0`)
}

const printLn = function(text = "", style={}) {
  return execSync(`echo "${text}" > /dev/serial0`)
}


const printLnLn = function(text = "", style={}) {
  return execSync(`echo "${text}\\n\\n\\n" > /dev/serial0`)
}

module.exports = {
  init,
  print,
  printLn,
  printLnLn,
}
