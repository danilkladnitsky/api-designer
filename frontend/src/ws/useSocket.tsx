import { useEffect, useState } from "react"
import { IWsPayload, WS_EVENTS } from "shared/index"
import { io } from "socket.io-client"

export const socket = io("ws://localhost:8080", {
    autoConnect: true
})

interface Props {
    onCodeGraphGenerate: (graphType: string, graph: Record<string, any>) => void
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
            onCodeGraphGenerate(event, JSON.parse(payload))
        })

        return () => {
            socket.off("connect", onConnect)
            socket.off("disconnect", onDisconnect)
        }
    }, [])

    return { isConnected }
}
