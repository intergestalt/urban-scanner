var blake = require('blakejs')

const generateCode = function(word) {
  const hash = toHex(blake.blake2b(word.toUpperCase(), undefined, 5))
  return hash
}

// Converts a Uint8Array to a hexadecimal string
// For example, toHex([255, 0, 255]) returns "ff00ff"
function toHex (bytes) {
  return Array.prototype.map.call(bytes, function (n) {
    return (n < 16 ? '0' : '') + n.toString(16)
  }).join('')
}

function generateShorthand(string) {
  return string.substr(0,10).replace(/\W/g, '').toUpperCase()
}

module.exports = {
  generateCode,
  generateShorthand
}
