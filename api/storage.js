const fs = require('fs');
const {generateCode} = require('./shared.js')

const init = function() {
  data = []
  codeList = []
}

const save = function(d) {
  fs.writeFileSync('../data/data.json', JSON.stringify(d));
  load()
}

const buildCodeList = function() {
  let tmp = {}
  const fictions = data.fictions || data
  fictions.forEach( (item, index) => {
    item.words.forEach( word => {
      if (word) { tmp[generateCode(word)] = index }
    })
  });
  codeList = tmp
  console.log("generated code list", codeList)
}

const load = function() {
  init()
  try {
    var json = JSON.parse(fs.readFileSync('../data/data.json'))
  } catch(error) {
    console.warn(error)
    json = {}
  }
  if (Array.isArray(json)) {
    console.warn("converting old data format")
    json.fictions = json
  }
  if (json.fictions && Array.isArray(json.fictions)) {
    data = json;
    console.log("loaded data", data)
    buildCodeList()
  } else {
    console.warn("data file corrupt")
  }
}

const getData = function() {
  return data
}

const getScenarioByCode = function(code) {
  // console.log("code", code)
  // console.log("index",codeList[code] )
  // console.log("scenario", data[codeList[code]])
  return data.fictions[codeList[code]]
}

const validateCode = function(code) {
  return codeList[code] !== undefined
}

module.exports = {
  save,
  load,
  getData,
  getScenarioByCode,
  validateCode
}