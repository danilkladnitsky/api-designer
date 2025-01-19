import { useEffect, useState } from "react"
import { WS_EVENTS } from "shared/index"
import { io } from "socket.io-client"

export const socket = io("ws://localhost:8080", {
    autoConnect: true
})

interface Props {
    onCodeGraphGenerate: (data: any) => void
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
        socket.on(WS_EVENTS.UPDATE_BUILD_CODE_GRAPH, (data) => {
            onCodeGraphGenerate(data)
        })

        return () => {
            socket.off("connect", onConnect)
            socket.off("disconnect", onDisconnect)
        }
    }, [])

    return { isConnected }
}
