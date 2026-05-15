function exportPPF(data, filename = 'export.ppf') {

  const encoded = utf32Encode(JSON.stringify(data))

  const blob = new Blob([encoded], {
    type: 'application/octet-stream'
  })

  const link = document.createElement('a')

  link.href = URL.createObjectURL(blob)
  link.download = filename
  link.click()
}

function importPPF(file, callback) {

  const reader = new FileReader()

  reader.onload = (event) => {

    const decoded = utf32Decode(event.target.result)

    callback(JSON.parse(decoded))
  }

  reader.readAsText(file)
}
