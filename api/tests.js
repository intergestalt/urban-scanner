// test algorithm

const { generateSampleData, runAlgoTests } = require('./stats.js')

const defaultSampleDataConfig = {
  numberWords: 10,
  numberScenarioWords: 3,
  numberPersonalityWords: 3,
  numberScenarios: 10,
  numberPersonalities: 5,
}

// run tests


//console.log("Sample data", JSON.stringify(generateSampleData(defaultSampleDataConfig), null, 2))

const sampleData = generateSampleData(defaultSampleDataConfig)
console.log("Sample data", JSON.stringify(sampleData, null, 2))


const {
  matchedPersonalities,
  stats
} = runAlgoTests(sampleData, 5, 2000)

console.log(matchedPersonalities)
console.log(stats)