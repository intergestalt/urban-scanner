const { execSync } = require('child_process');

const scanner = require('./scanner')
const printer = require('./printer')

console.log("initialising");

const dateOptions = { }
const nowString = (new Date).toLocaleString('de-DE', dateOptions)

let out = ""

out = printer.init()

try {
out = scanner.init()
} catch(error) {
  console.log("scanner error", out, error)
  printer.print("FEHLER Barcodescanner nicht verfügbar")
  process.exit(1)
}

scanner.setCodeCallback(onCodeReceived)

printer.print(`
>>> Future To Go <<<

Datum: ${nowString}
Barcodescanner: Verbunden
Fiktionsgenerierung ist aktiv

Bereit.
`)

function onCodeReceived(code) {
  if (code === "POWEROFF") {
    printer.print("Gerät wird heruntergefahren. Bitte warten Sie 10 Sekunden, bevor Sie den Stecker ziehen. Vielen Dank.")
    execSync("poweroff")
  } else {
    printer.print(code)
  }
}

console.log("ready")
