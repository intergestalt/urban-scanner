var blake = require('blakejs')

const generateCode = function(word) {
  const hash = toHex(blake.blake2b(word, undefined, 6))
  return hash
}

// Converts a Uint8Array to a hexadecimal string
// For example, toHex([255, 0, 255]) returns "ff00ff"
function toHex (bytes) {
  return Array.prototype.map.call(bytes, function (n) {
    return (n < 16 ? '0' : '') + n.toString(16)
  }).join('')
}

module.exports = {
  generateCode
}
