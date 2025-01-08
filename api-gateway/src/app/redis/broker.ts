import { IRedisBrokerConstructor, IServiceInstance } from "@/common/services"

export const startRedisBroker = ({ subscribers, redis }: IRedisBrokerConstructor): IServiceInstance => {
    subscribers.forEach(({ channel, handlerFn }) => {
        redis.subscribe(channel, handlerFn)
    })

    return {
        name: "redis broker",
        close: redis.disconnect
    }
}
