import { useEffect, useState } from "react"
import { IWsPayload, WS_EVENTS } from "shared/index"
import { WsEvents } from "shared/ws"
import { io } from "socket.io-client"

export const socket = io("ws://localhost:8080", {
    autoConnect: true
})

interface Props {
    onCodeGraphGenerate: (graphType: WsEvents, graph: any) => void
}

export const useSocket = ({ onCodeGraphGenerate }: Props) => {
    const [isConnected, setIsConnected] = useState(socket.connected)

    useEffect(() => {
        function onConnect() {
            setIsConnected(true)
        }

        function onDisconnect() {
            setIsConnected(false)
        }

        socket.on("connect", onConnect)
        socket.on("disconnect", onDisconnect)
        socket.on(WS_EVENTS.UPDATE_BUILD_CODE_GRAPH, ({ event, payload }: IWsPayload<string>) => {
            try {
                const parsedPayload = JSON.parse(payload)

                if (event === "generate-endpoints") {
                    onCodeGraphGenerate("generate-endpoints", Array.isArray(parsedPayload) ? parsedPayload : [parsedPayload])
                }
                else {
                    onCodeGraphGenerate(event, parsedPayload)
                }
            }
            catch (error) {
                console.error(error)
            }
        })

        return () => {
            socket.off("connect", onConnect)
            socket.off("disconnect", onDisconnect)
        }
    }, [])

    return { isConnected }
}
