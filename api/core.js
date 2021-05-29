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
  if (currentCodes.length >= 3) {
    return generateTextParts()
  } else {
    autoResetTimer = setTimeout(resetCodes, resetTimeMS)
  }
}

const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
const sum = (array) => array.reduce(function (a, b) {return a + b;}, 0);

const generateTextParts = function() {
  console.log("codes complete, generating text", currentCodes)

  const scenario1 = storage.getScenarioByCode(currentCodes[0])
  const scenario2 = storage.getScenarioByCode(currentCodes[1])
  const scenario3 = storage.getScenarioByCode(currentCodes[2])

  // BEGIN ALGORITHM
  // 1 - get fiction keywords
  // 2 - get personalities keywords
  // 3 - make a list of all fiction keywords (without filter for uniqueness)
  // 4 - go through personalities
  //     for each personality
  //       count number of occurences of each word in list
  //       add the numbers together
  //       mark this personality as top match if it has the highest score so far

  const fictionWords = [...scenario1.words, ...scenario2.words, ...scenario3.words ].map(w => w && w.toUpperCase().trim())
  console.log("Scanned keywords: " + fictionWords)

  const personalities = storage.getData().personalities
  let matchedPersonality = {}
  let topScore = -1

  for (let personality of personalities) {
    let score = sum(personality.words.map(w => countOccurrences(fictionWords, w)))
    if (score > topScore) {
      matchedPersonality = personality
      topScore = score
    }
  }

  console.log("matched personality: ", matchedPersonality.title)

  // END ALGORITHM

  let parts = {
    intro1: storage.getData().intro1,
    intro2: storage.getData().intro2,
    fiction1Title: storage.getScenarioByCode(currentCodes[0]).title/*.toUpperCase()*/,
    fiction2Title: storage.getScenarioByCode(currentCodes[1]).title/*.toUpperCase()*/,
    fiction3Title: storage.getScenarioByCode(currentCodes[2]).title/*.toUpperCase()*/,
    fiction1Text:  storage.getScenarioByCode(currentCodes[0]).text/*.toUpperCase()*/,
    fiction2Text:  storage.getScenarioByCode(currentCodes[1]).text/*.toUpperCase()*/,
    fiction3Text:  storage.getScenarioByCode(currentCodes[2]).text/*.toUpperCase()*/,
    personalityTitle: matchedPersonality.title,
    personalityText: matchedPersonality.text,
    mid: storage.getData().mid,
    end: storage.getData().end,
    coordinates: storage.getData().coordinates,
    ...getLines(new Date),
    uid: Date.now() + "" //currentCodes[0] + "" + currentCodes[1] + "" + currentCodes[2] + "" 
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

