const dateFormat = require('dateformat');

const sentenceTitles = {
  1: "Daher kommst du -".toUpperCase(),
  2: "Da stehst du -".toUpperCase(),
  3: "Da geht's hin -".toUpperCase(),
  4: "Mögliche Hindernisse -".toUpperCase(),
  5: "Der Rat -".toUpperCase()
}

const weekdays = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"]

const getLines = date => ({
  header: "----- 5 BARCODES SCANNEN -----",
  first: "*** Fiction Forum ***".toUpperCase(),
  second: "F-U-T-U-R-E T-O G-O",
  third: dateFormat(date, "XX dd.mm.yyyy HH:MM").replace("XX", XX => weekdays[date.getDay()]).toUpperCase(),
  nexttolast: "***",
  last: "Mit voranschreitender Zukunft\nwird dieser Ausdruck\nverblassen...".toUpperCase(),
  footer: "_______ HIER ABTRENNEN _______"
})

const resetTimeMS = 60000

const dateOptions = { }

module.exports = {
  sentenceTitles,
  dateOptions,
  getLines,
  resetTimeMS
}
