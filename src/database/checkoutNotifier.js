class checkoutNotifier {
    constructor() {
        const protocol = window.location.protocol === "http:" ? "ws" : "wss";
        this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${window.location.port}/ws`);

        this.socket.onopen = () => {
            console.log("Websocket connection established")
        }

        this.socket.onclose = () => {
            console.log("Websocket connection closed")
        }

        this.socket.onmessage = async (event) => {
            try {
                const event = JSON.parse(await event.data.text())
            } catch {}
        }
    }
}