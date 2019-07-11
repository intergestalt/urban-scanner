const { Scanner } = require('@yelo/hid-scanner')

// const devices = Scanner.devices()
// console.log(devices)

const init = function() {
  const scanner = new Scanner('USB Device') // yeah, that how the device calls itself

  let string = ''
  scanner.on('key', (event) => {
    const { name, char } = event
    if (!char) {
      console.log(`Press: ${name}`)
      return
    }
    if (char === '\n') {
      console.info(`Input: ${string}`)
      string = ''
      return
    }
    string += char
  })
}

module.exports = {
  init
}