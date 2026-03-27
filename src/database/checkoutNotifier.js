class checkoutNotifier {
    staff = []
    messages = []
    method;

    constructor() {
        const protocol = window.location.protocol === "http:" ? "ws" : "wss";
        this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${window.location.port}/ws`);

        this.socket.onopen = () => {
            console.log("Websocket connection established")
        }

        this.socket.onclose = () => {
            console.log("Websocket connection closed")
        }

        this.socket.onmessage = async (message) => {
            try {
                const messageString = JSON.parse(await message.data.text())
                this.receiveMessage(messageString)
            } catch {}
        }
    }

    setMethod(method) {
        this.method = method
    }

    receiveMessage(message) {
        this.method(message)
    }

    sendMessage(message) {
        this.socket.send(JSON.stringify(message))
    }
}

const notifier = new checkoutNotifier()
export {notifier}