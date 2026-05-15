const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8080 })

const clients = {}

wss.on('connection', (ws) => {

  ws.on('message', (message) => {

    const data = JSON.parse(message)

    if (data.type === 'register') {
      clients[data.userId] = ws
      console.log('Connected:', data.userId)
      return
    }

    if (data.to && clients[data.to]) {
      clients[data.to].send(JSON.stringify(data))
    }
  })

  ws.on('close', () => {
    Object.keys(clients).forEach((id) => {
      if (clients[id] === ws) {
        delete clients[id]
      }
    })
  })
})

console.log('Signal server started on port 8080') 
