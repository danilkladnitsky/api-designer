import { BuildGraphCodeDto } from "shared/dtos"

import { sendRequest } from "./utils"

export const updateCodeGraph = async (code: string) => {
    return await sendRequest<BuildGraphCodeDto>("/code/graph", "POST", { code })
}
