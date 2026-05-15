
const sendBtn = document.getElementById('sendBtn')
const messageInput = document.getElementById('messageInput')
const messagesDiv = document.getElementById('messages')
const clientName = document.getElementById('clientName')

function displayMessage(text) {

  const div = document.createElement('div')

  div.className = 'message'
  div.innerText = text

  messagesDiv.appendChild(div)
}

sendBtn.addEventListener('click', () => {

  const payload = {
    client: clientName.value,
    message: messageInput.value,
    createdAt: new Date().toISOString()
  }

  saveMessage(payload)

  if (dataChannel && dataChannel.readyState === 'open') {
    dataChannel.send(JSON.stringify(payload))
  }

  displayMessage('Envoyé : ' + payload.message)
})

const exportBtn = document.getElementById('exportBtn')

exportBtn.addEventListener('click', () => {

  exportPPF({
    exportedAt: new Date(),
    role: 'apporteur'
  })
})

const loadXmlBtn = document.getElementById('loadXmlBtn')

loadXmlBtn.addEventListener('click', () => {

  const file = document.getElementById('xmlLoader').files[0]

  loadProductsXML(file, (products) => {

    products.forEach(saveProduct)

    alert(products.length + ' produits chargés')
  })
})

const importBtn = document.getElementById('importBtn')

importBtn.addEventListener('click', () => {

  const file = document.getElementById('importPPFInput').files[0]

  importPPF(file, (data) => {
    console.log(data)
    alert('PPF importé')
  })
})