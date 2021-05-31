const SerialPort = require('serialport')
const iconv = require('iconv-lite');

const init = function() {
  port = new SerialPort('/dev/serial0', {
    baudRate: 19200
  })

  initCodepage()
}

const initCodepage = function(number = 0x00) { // default: cp437
  port.write([0x1b, 0x74, number])
}

const encode = function(string) {
  return iconv.encode(string, 'cp437')
}

const print = function(text = "", style={}) {
  return port.write(encode(text))
}

const printLn = function(text = "", style={}) {
  return print(text + "\n")
}

const printLnLn = function(text = "", style={}) {
  return print(text + "\n\n\n\n\n\n\n\n")
}

const printFeedSharp = function(text = "", style={}) {
  return print(text + "\n\n\n\n")
}

const sleep = async function(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

module.exports = {
  init,
  print,
  printLn,
  printLnLn,
  printFeedSharp,
  sleep
}
