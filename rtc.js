
const socket = new WebSocket('ws://localhost:8080')

const localUserId = 'agent_admin'
const remoteUserId = 'apporteur_default'

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

socket.onmessage = async (message) => {

  const data = JSON.parse(message.data)

  if (data.type === 'offer') {

    peerConnection = new RTCPeerConnection(config)

    peerConnection.ondatachannel = (event) => {

      dataChannel = event.channel

      dataChannel.onmessage = (event) => {

        const payload = JSON.parse(event.data)

        saveMessage(payload)

        displayMessage(
          payload.client + ' : ' + payload.message
        )
      }
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

    await peerConnection.setRemoteDescription(data.offer)

    const answer = await peerConnection.createAnswer()

    await peerConnection.setLocalDescription(answer)

    socket.send(JSON.stringify({
      type: 'answer',
      answer,
      to: remoteUserId
    }))
  }

  if (data.type === 'candidate') {
    await peerConnection.addIceCandidate(data.candidate)
  }
}