const DB_NAME = 'insurance_offline_db'
const DB_VERSION = 1

let db

const request = indexedDB.open(DB_NAME, DB_VERSION)

request.onupgradeneeded = (event) => {

  db = event.target.result

  if (!db.objectStoreNames.contains('messages')) {

    db.createObjectStore('messages', {
      keyPath: 'id',
      autoIncrement: true
    })
  }

  if (!db.objectStoreNames.contains('products')) {

    db.createObjectStore('products', {
      keyPath: 'id',
      autoIncrement: true
    })
  }

  if (!db.objectStoreNames.contains('ppf_files')) {

    db.createObjectStore('ppf_files', {
      keyPath: 'id',
      autoIncrement: true
    })
  }
}

request.onsuccess = (event) => {
  db = event.target.result
}

function saveMessage(message) {
  const tx = db.transaction('messages', 'readwrite')
  const store = tx.objectStore('messages')
  store.add(message)
}

function saveProduct(product) {
  const tx = db.transaction('products', 'readwrite')
  const store = tx.objectStore('products')
  store.add(product)
}

function savePPF(file) {
  const tx = db.transaction('ppf_files', 'readwrite')
  const store = tx.objectStore('ppf_files')
  store.add(file)
}