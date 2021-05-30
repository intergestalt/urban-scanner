const { algorithm } = require('./core.js')

function pickRandomElements(items = [], n = 3) {
  const sample = items
    .map(x => ({ x, r: Math.random() }))
    .sort((a, b) => a.r - b.r)
    .map(a => a.x)
    .slice(0, n);
  return sample
}

function generateSampleData(config) {
  const {
    numberWords,
    numberScenarioWords,
    numberPersonalityWords,
    numberScenarios,
    numberPersonalities,
  } = config

  // generate words
  const words = [...Array(numberWords).keys()].map(w => "word" + w)

  // generate scenarios
  const scenarios = [...Array(numberScenarios).keys()].map(s => ({
    words: pickRandomElements(words, numberScenarioWords),
    title: "scenario" + s
  }))

  // generate personalities
  const personalities = [...Array(numberPersonalities).keys()].map(p => ({
    words: pickRandomElements(words, numberPersonalityWords),
    title: "personality" + p
  }))

  return {
    words,
    personalities,
    scenarios
  }
}

function runAlgoTests(sampleData, mumberOfScans = 5, numberOfRuns = 100) {
  let {
    personalities,
    scenarios,
    fictions
  } = sampleData

  if (!scenarios) scenarios = fictions

  const matchedPersonalities = []
  for (let i = 0; i < numberOfRuns; i++) {
    matchedPersonalities.push(algorithm(pickRandomElements(scenarios, mumberOfScans), personalities))
  }


  const stats = {}

  for (p of matchedPersonalities) {
    stats[p.title] = (stats[p.title] || 0) + 1
  }

  return {
    matchedPersonalities,
    stats
  }
}

module.exports = {
  runAlgoTests,
  generateSampleData,
}