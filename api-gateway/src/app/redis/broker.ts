import { IRedisBrokerConstructor, IServiceInstance } from "@/common/services"

export const startRedisBroker = async ({ subscribers, redis }: IRedisBrokerConstructor): Promise<IServiceInstance> => {
    subscribers.forEach(({ channel, handlerFn }) => {
        redis.subscribe(channel, handlerFn)
    })

    return {
        name: "redis broker",
        close: redis.disconnect
    }
}
