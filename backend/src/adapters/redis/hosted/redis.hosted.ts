import Redis from "ioredis"

import { IRedisAdapter } from "../redis.adapter"

export const createRedisHosted = async (): Promise<IRedisAdapter> => {
    let client: Redis | null = null

    let subscriber: Redis | null = null

    return {
        name: "redis hosted adapter",

        close: async () => {
            if (!client || !subscriber) {
                return
            }

            await Promise.all([client.quit(), subscriber.quit()])
            console.log("Redis connections closed.")
        },

        connect: async (config) => {
            client = new Redis(config)
            subscriber = new Redis(config)

            console.log("Connected to Redis.")
        },

        publish: async (channel: string, message: string) => {
            if (!client) {
                throw new Error("Redis client not initialized")
            }

            await client.publish(channel, message)
            console.log(`Message published to ${channel}: ${message}`)
        },

        subscribe: async (channel: string, callback: (message: string) => void) => {
            if (!subscriber) {
                throw new Error("Redis subscriber not initialized")
            }

            await subscriber.subscribe(channel)
            subscriber.on("message", (receivedChannel, message) => {
                if (receivedChannel === channel) {
                    callback(message)
                }
            })
            console.log(`Subscribed to channel: ${channel}`)
        },

        unsubscribe: async (channel: string) => {
            if (!subscriber) {
                throw new Error("Redis subscriber not initialized")
            }

            await subscriber.unsubscribe(channel)
            console.log(`Unsubscribed from channel: ${channel}`)
        },

        disconnect: async () => {
            if (!client || !subscriber) {
                return
            }

            await Promise.all([client.disconnect(), subscriber.disconnect()])
            console.log("Disconnected from Redis.")
        }
    }
}
