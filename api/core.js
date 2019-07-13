const storage = require('./storage.js')
const { dateOptions } = require('../config')

let currentCodes = []
let autoResetTimer = null

const inputCode = function(code) {
  console.log("adding code", code)
  if (currentCodes.indexOf(code) === -1) { // do not add duplicates
    currentCodes.push(code)
  } else {
    console.log("ignoring code, already in list", code)
  }
  if (currentCodes.length >= 5) {
    return generateTextParts()
  } else {
    if (autoResetTimer) { clearTimeout(autoResetTimer) }
    autoResetTimer = setTimeout(resetCodes, 60000)
  }
}

const generateTextParts = function() {
  console.log("codes complete, generating text", currentCodes)
  let parts = {
    timeString: (new Date).toLocaleString('de-DE', dateOptions),
    1: storage.getScenarioByCode(currentCodes[0]).sentences[0],
    2: storage.getScenarioByCode(currentCodes[1]).sentences[1],
    3: storage.getScenarioByCode(currentCodes[2]).sentences[2],
    4: storage.getScenarioByCode(currentCodes[3]).sentences[3],
    5: storage.getScenarioByCode(currentCodes[4]).sentences[4],
  }
  resetCodes()
  return parts
}

const resetCodes = function() {
  console.log("reset codes")
  currentCodes = []
  autoResetTimer = null
}

module.exports = {
  inputCode  
}

