const {WebSocketServer, WebSocket} = require('ws');

function peerProxy(server) {
    const wss = new WebSocketServer({ server: server})

    wss.on("connection", (ws) => {
        ws.isAlive = true;

        ws.on("message", function message(data) {
            wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(data);
                }
            })
        })

        ws.on("pong", () => {
            ws.isAlive = true;
        })
    })
}