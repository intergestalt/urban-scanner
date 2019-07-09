const { Scanner } = require('@yelo/hid-scanner')

console.log("initialising");

const devices = Scanner.devices()

console.log(devices)

const scanner = new Scanner('USB Device')

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




/*return

var HID = require('node-hid');
// var devices = HID.devices();

// console.log(devices)

var scanner_path = "/dev/hidraw0"

var handscanner = new HID.HID(scanner_path);

handscanner.on("data", function(data) {
  console.log(data.toString('utf16le'))
});
*/

console.log("ready")
