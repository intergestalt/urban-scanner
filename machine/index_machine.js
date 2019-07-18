const { execSync } = require('child_process');

const scanner = require('./scanner')
const printer = require('./printer')
const fetch = require('node-fetch');
const ip = require('ip');

const { sentenceTitles, dateOptions } = require('../config')

console.log("initialising");

const nowString = (new Date).toLocaleString('de-DE', dateOptions)

let out = ""

out = printer.init()

try {
out = scanner.init()
} catch(error) {
  console.log("scanner error", out, error)
  printer.printLn("FEHLER Barcodescanner nicht verfügbar")
  process.exit(1)
}

scanner.setCodeCallback(onCodeReceived)

const infoMessage = () => `
>>> Future To Go <<<

Datum: ${nowString}
IP: ${ ip.address() }
SSID: ${ execSync("iwgetid wlan0 --raw") }
Barcodescanner: Verbunden
Fiktionsgenerierung ist aktiv

Bereit.
`

const welcomeMessage = infoMessage()
printer.printLnLn(welcomeMessage)
console.info(welcomeMessage)

function onCodeReceived(code) {
  if (code === "POWEROFF") {
    printer.printLnLn("Bye bye. Bitte warten Sie 10 Sekunden, bevor Sie den Stecker ziehen. Vielen Dank.")
    execSync("poweroff")
  } else if (code === "INFO") {
    printer.printLnLn(infoMessage())
  } else if (code === "FEED") {
    printer.printLn()
  } else if (code === "REBOOT") {
    printer.printLnLn("Rebooting...")
    execSync("reboot")
  } else { 
    //printer.printLnLn(code)

    fetch('http://localhost/code', {
      method: 'post',
      body:    JSON.stringify({ code }),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(json => {
      const textParts = (json && json[1]) ? json : null
      if (textParts) {
        printReceipt(textParts)
      }    
    });
  }
}

const _ = {
  init: () => `\x1b@`, 
  bold: n => `\x1b\x45${n}`, // 1=bold, 0=normal
  align: n => `\x1b\x61${n}`, // 0=left, 1=middle, 2=right
}

function printReceipt(textParts) {

  printer.print(_.init())
  printer.print(_.align(1))

  printer.print(textParts.first)
  printer.printLn()
  printer.print(textParts.second)
  printer.printLn()
  printer.print(textParts.third)
  printer.printLn()
  printer.printLn()

  printer.print(_.align(0))

  printer.print(sentenceTitles[1])
  printer.printLn()
  printer.printLn()
  printer.print(textParts[1])
  printer.printLn()
  printer.printLn()

  printer.print(sentenceTitles[2])
  printer.printLn()  
  printer.printLn()
  printer.print(textParts[2])
  printer.printLn()
  printer.printLn()

  printer.print(sentenceTitles[3])
  printer.printLn()
  printer.printLn()  
  printer.print(textParts[3])
  printer.printLn()
  printer.printLn()  

  printer.print(sentenceTitles[4])
  printer.printLn()
  printer.printLn()  
  printer.print(textParts[4])
  printer.printLn()
  printer.printLn()  

  printer.print(sentenceTitles[5])
  printer.printLn()
  printer.printLn()
  printer.print(textParts[5])
  printer.printLn()
  printer.printLn()

  printer.print(_.align(1))

  printer.print(textParts.nexttolast)
  printer.printLn()
  printer.print(textParts.last)
  printer.printLn()
  printer.printLn()

  printer.printLnLn()

  printer.print(_.align(0))
}

console.log("ready")
