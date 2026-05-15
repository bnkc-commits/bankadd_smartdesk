
const messagesDiv = document.getElementById('messages')

function displayMessage(text) {

  const div = document.createElement('div')

  div.className = 'message'
  div.innerText = text

  messagesDiv.appendChild(div)
}