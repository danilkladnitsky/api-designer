import { Server } from "socket.io"

import { IWsAdapter, WsConfig } from "../ws.adapter"

export const createWsHostedAdapter = ({ port }: WsConfig): IWsAdapter => {
    const wsServer = new Server({
        cors: {
            origin: "*"
        } })
    wsServer.listen(port)

    console.log(port)

    wsServer.on("connection", (socket) => {
        console.log("A user connected:", socket.id)

        // Listening for a custom event
        socket.on("custom_event", (data) => {
            console.log("Received:", data)
            // Emitting a response
            socket.emit("response_event", { message: "Hello from server!" })
        })

        // Disconnection handler
        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id)
        })
    })

    return {
        name: "ws hosted adapter",
        close: async () => {
            wsServer.close()
        },
        emit: async (channel, payload) => {
            try {
                wsServer.emit(channel, payload)
            }
            catch (err) {
                console.error(err)
            }
        }

    }
}
