const WebSocket = require('ws');

const server = new WebSocket.Server({ port: process.env.PORT || 3000 });

server.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('message', (message) => {
    console.log(`Received: ${message}`);
    socket.send(`Echo: ${message}`);
  });
});
