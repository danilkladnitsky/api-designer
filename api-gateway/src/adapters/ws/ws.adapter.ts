import { WsEvents } from "shared/index"

import { IServiceInstance, IWsPayload } from "@/common/services"

export type WsConfig = {
    port: number
}

export interface IWsAdapter extends IServiceInstance {
    emit: (channel: WsEvents, payload: IWsPayload) => Promise<any>
}
