function utf32Encode(str) {

  let encoded = ''

  for (let i = 0; i < str.length; i++) {
    encoded += str.charCodeAt(i).toString(16).padStart(8, '0')
  }

  return encoded
}

function utf32Decode(data) {

  let result = ''

  for (let i = 0; i < data.length; i += 8) {

    const hex = data.substring(i, i + 8)

    result += String.fromCharCode(parseInt(hex, 16))
  }

  return result
} 
