const wrap = require('word-wrap');
const storage = require('./storage.js')
const { resetTimeMS, getLines } = require('../config')

const lineWrapWidth = 32

let currentCodes = []
let autoResetTimer = null

const inputCode = function(code) {
  console.log("adding code", code)
  if (currentCodes.indexOf(code) === -1) { // do not add duplicates
    if (storage.validateCode(code)) {
      currentCodes.push(code)
    } else {
      console.log("invalide code " + code)
    }
  } else {
    console.log("ignoring code, already in list", code)
  }
  if (autoResetTimer) { clearTimeout(autoResetTimer) }
  if (currentCodes.length >= 5) {
    return generateTextParts()
  } else {
    autoResetTimer = setTimeout(resetCodes, resetTimeMS)
  }
}

const generateTextParts = function() {
  console.log("codes complete, generating text", currentCodes)
  let parts = {
    1: storage.getScenarioByCode(currentCodes[0]).sentences[0]/*.toUpperCase()*/,
    2: storage.getScenarioByCode(currentCodes[1]).sentences[1]/*.toUpperCase()*/,
    3: storage.getScenarioByCode(currentCodes[2]).sentences[2]/*.toUpperCase()*/,
    4: storage.getScenarioByCode(currentCodes[3]).sentences[3]/*.toUpperCase()*/,
    5: storage.getScenarioByCode(currentCodes[4]).sentences[4]/*.toUpperCase()*/,
    announcement: storage.getData().announcement,
    ...getLines(new Date)
  }
  for (let key in parts) {
    parts[key] = wrap( parts[key], { width: lineWrapWidth, indent:"", trim: true } )
  }
  console.log(parts)
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

