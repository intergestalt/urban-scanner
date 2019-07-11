const scanner = require('./scanner')
const printer = require('./printer')

console.log("initialising");

const dateOptions = { }
const nowString = (new Date).toLocaleString('de-DE', dateOptions)

let out = ""

out = printer.init()
console.log(out)

try {
out = scanner.init()
} catch(error) {
  console.log("scanner error", out, error)
  printer.print("FEHLER Barcodescanner nicht verfügbar")
  process.exit(1)
}

printer.print(`
>>> Future To Go <<<
Datum: ${nowString}
Barcodescanner: Verbunden
Fiktionsgenerierung aktiviert.
`)

console.log();

console.log("ready")
