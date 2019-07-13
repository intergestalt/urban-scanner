const { Scanner } = require('@yelo/hid-scanner')

// const devices = Scanner.devices()
// console.log(devices)

let codeCallback = function(code){ console.log(`No code callback defined (received: ${code})`)}

const init = function() {
  const scanner = new Scanner('USB Device') // yeah, that how the scanner identifies itself

  let string = ''
  scanner.on('key', (event) => {
    const { name, char } = event
    if (!char) {
      return
    }
    if (char === '\n') {
      // console.info(`Input: ${string}`)
      codeCallback(string)
      string = ''
      return
    }
    string += char
  })
}

const setCodeCallback = function(cb) {
  codeCallback = cb
}

module.exports = {
  init,
  setCodeCallback
}