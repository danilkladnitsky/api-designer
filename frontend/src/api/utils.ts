import { APIMethod, ControllerResponse } from "../../../shared-types"

const API_URL = "http://localhost:80/api-gateway"

export const sendRequest = async <TBody>(url: string, method: APIMethod, body?: TBody) => {
    try {
        const response = await fetch(`${API_URL}${url}`, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })

        const rawData = await response.json() as ControllerResponse<TBody>

        if (!rawData.ok) {
            throw new Error(rawData.error || "Unknown error")
        }

        const { data } = rawData

        return data
    }
    catch (err) {
        console.log(err)
    }
}
