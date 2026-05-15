
const socket = new WebSocket('ws://localhost:8080')

const localUserId = 'apporteur_default'
const remoteUserId = 'agent_admin'

let peerConnection
let dataChannel

socket.onopen = () => {

  socket.send(JSON.stringify({
    type: 'register',
    userId: localUserId
  }))
}

const config = {
  iceServers: [
    {
      urls: 'stun:stun.l.google.com:19302'
    }
  ]
}

async function createConnection() {

  peerConnection = new RTCPeerConnection(config)

  dataChannel = peerConnection.createDataChannel('chat')

  dataChannel.onmessage = (event) => {
    displayMessage(event.data)
  }

  peerConnection.onicecandidate = (event) => {

    if (event.candidate) {

      socket.send(JSON.stringify({
        type: 'candidate',
        candidate: event.candidate,
        to: remoteUserId
      }))
    }
  }

  const offer = await peerConnection.createOffer()

  await peerConnection.setLocalDescription(offer)

  socket.send(JSON.stringify({
    type: 'offer',
    offer,
    to: remoteUserId
  }))
}

socket.onmessage = async (message) => {

  const data = JSON.parse(message.data)

  if (data.type === 'answer') {
    await peerConnection.setRemoteDescription(data.answer)
  }

  if (data.type === 'candidate') {
    await peerConnection.addIceCandidate(data.candidate)
  }
}

createConnection()