import { IServiceInstance } from "@/common/services"

export type RedisConfig = {
    host: string
    port: number
    password: string
}

export interface IRedisAdapter extends IServiceInstance {
    /**
   * Connects to the Redis server.
   * @returns A promise that resolves when the connection is established.
   */
    connect(config: RedisConfig): Promise<void>

    /**
   * Disconnects from the Redis server.
   * @returns A promise that resolves when the connection is closed.
   */
    disconnect(): Promise<void>

    /**
   * Publishes a message to a specific channel.
   * @param channel - The channel name to publish the message to.
   * @param message - The message to be published.
   * @returns A promise that resolves when the message is published.
   */
    publish(channel: string, message: string): Promise<void>

    /**
   * Subscribes to a specific channel and listens for messages.
   * @param channel - The channel name to subscribe to.
   * @param callback - A function that is called whenever a message is received.
   * @returns A promise that resolves when the subscription is successful.
   */
    subscribe(channel: string, callback: (message: string) => void): Promise<void>

    /**
   * Unsubscribes from a specific channel.
   * @param channel - The channel name to unsubscribe from.
   * @returns A promise that resolves when the unsubscription is successful.
   */
    unsubscribe(channel: string): Promise<void>
}
