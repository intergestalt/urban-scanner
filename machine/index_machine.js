const { execSync } = require('child_process');

const scanner = require('./scanner')
const printer = require('./printer')
const fetch = require('node-fetch');
const ip = require('ip');

const { sentenceTitles, dateOptions, getLines } = require('../config')

const _ = {
  init: () => `\x1b@`,
  heat: (n1,n2,n3) => `\x1b\x37\x09\x80\xdd`, 
  bold: n => `\x1b\x45${n}`, // 1=bold, 0=normal
  align: n => `\x1b\x61${n}`, // 0=left, 1=middle, 2=right
}

const lines = getLines(new Date())

let headerTimeout = null

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
>>> ÜBER Urbane Praxis <<<

Datum: ${nowString}
IP: ${ ip.address() }
SSID: ${ execSync("iwgetid wlan0 --raw") }
Barcodescanner: Verbunden
Persönlichkeitsgenerierung ist aktiv

Bereit.
`

const welcomeMessage = infoMessage()
printer.printLnLn(welcomeMessage)
printFooter()
headerTimeout = setTimeout(printHeader, 20000)

console.info(welcomeMessage)

async function onCodeReceived(code) {
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
    .then(async json => {
      const textParts = (json && json.uid) ? json : null
      if (textParts) {
        if (headerTimeout) clearTimeout(headerTimeout)
        await printReceipt(textParts)
        headerTimeout = setTimeout(printHeader, 60000)
      }    
    });
  }
}

const millisPerCharacter = 3

async function printReceipt(textParts) {

  printer.print(_.init())
  //printer.print(_.heat())

  /*
  printer.print(_.align(1))

  printer.print(textParts.first)
  printer.printLn()
  printer.print(textParts.second)
  printer.printLn()
  printer.print(textParts.third)
  printer.printLn()
  printer.printLn()

  printer.print(_.align(0))
  */

  printer.print(_.bold(1))
  printer.print(textParts.intro1)
  printer.print(_.bold(0))
  printer.printLn()
  printer.printLn()
  printer.print(textParts.intro2)
  printer.printLn()
  printer.printLn()

  await printer.sleep(millisPerCharacter * textParts.intro2.length)

  printer.print(_.bold(1))
  printer.print(textParts.fiction1Title)
  printer.print(_.bold(0))
  printer.printLn()
  printer.printLn()
  printer.print(textParts.fiction1Text)
  printer.printLn()
  printer.printLn()

  await printer.sleep(millisPerCharacter * textParts.fiction1Text.length)

  printer.print(_.bold(1))
  printer.print(textParts.fiction2Title)
  printer.print(_.bold(0))
  printer.printLn()
  printer.printLn()
  printer.print(textParts.fiction2Text)
  printer.printLn()
  printer.printLn()

  await printer.sleep(millisPerCharacter * textParts.fiction2Text.length)

  printer.print(_.bold(1))
  printer.print(textParts.fiction3Title)
  printer.print(_.bold(0))
  printer.printLn()
  printer.printLn()
  printer.print(textParts.fiction3Text)
  printer.printLn()
  printer.printLn()

  await printer.sleep(millisPerCharacter * textParts.fiction3Text.length)

  printer.print(_.bold(1))
  printer.print(textParts.fiction4Title)
  printer.print(_.bold(0))
  printer.printLn()
  printer.printLn()
  printer.print(textParts.fiction4Text)
  printer.printLn()
  printer.printLn()

  await printer.sleep(millisPerCharacter * textParts.fiction4Text.length)

  printer.print(_.bold(1))
  printer.print(textParts.fiction5Title)
  printer.print(_.bold(0))
  printer.printLn()
  printer.printLn()
  printer.print(textParts.fiction5Text)
  printer.printLn()
  printer.printLn()

  await printer.sleep(millisPerCharacter * textParts.fiction5Text.length)

  printer.print(textParts.mid)
  printer.printLn()
  printer.printLn()  

  await printer.sleep(millisPerCharacter * textParts.mid.length)

  printer.print(_.bold(1))
  printer.print(textParts.personalityTitle)
  printer.print(_.bold(0))
  printer.printLn()
  printer.printLn()  
  printer.print(textParts.personalityText)
  printer.printLn()
  printer.printLn()  

  await printer.sleep(millisPerCharacter * textParts.personalityText.length)

  printer.print(textParts.end)
  printer.printLn()
  printer.printLn()

  printer.print(textParts.date)
  printer.print(" ")
  printer.print(textParts.coordinates)
  printer.printLn()
  printer.printLn()

  printer.printLn()
  printer.printLn()
  printer.printLn()
  printer.printLn()
  printFooter()
}

function printHeader() {
  printer.print(_.init())
  printer.print(_.align(1))

  printer.printLn()
  printer.print(lines.header)
  printer.printLn()
  printer.printLnLn()  

  printer.print(_.align(1))
}

function printFooter() {
  printer.print(_.align(1))
  printer.print(lines.footer)
  printer.print(_.align(0))
  printer.printLn()

  printer.printFeedSharp()  
}

console.log("ready")
