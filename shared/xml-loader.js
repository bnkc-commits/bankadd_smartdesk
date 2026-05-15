
function loadProductsXML(file, callback) {

  const reader = new FileReader()

  reader.onload = (event) => {

    const parser = new DOMParser()

    const xml = parser.parseFromString(
      event.target.result,
      'text/xml'
    )

    const products = []

    xml.querySelectorAll('product').forEach((item) => {

      products.push({
        name: item.querySelector('name')?.textContent,
        price: item.querySelector('price')?.textContent
      })
    })

    callback(products)
  }

  reader.readAsText(file)
}