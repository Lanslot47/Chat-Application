const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const parsedMessage = JSON.parse(message);
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(parsedMessage));
            }
        });
    }); 

    ws.send(JSON.stringify({ name: 'Server', message: 'Welcome to the chat!' }));
});

console.log('WebSocket server is running on ws://localhost:8080');
