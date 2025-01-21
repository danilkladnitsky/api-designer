import { WsEvents } from "./ws";

export type ID = string;
export type Timestamp = string;
export type APIMethod = "GET" | "POST";
export type Code = string

export type LLMInput = {
    role: "user" | "assistant";
    content: string;
}

export type LLMOutput = {
    content: string;
};

export type CodeAPIGraph = {
    url: string;
    method: APIMethod;
}

export type ControllerResponse<TData> = {
    data: TData
    ok: true
} | {
    message: string
    error?: string
    ok: false
}

export const REST_API_ROUTES = {
    GET_TASKS: "/tasks",
    GET_TASK_BY_ID: "/tasks/:id",
    GENERATE_CODE_GRAPH: "/code/graph"
} as const

// WebSockets

export const WS_EVENTS = {
    UPDATE_BUILD_CODE_GRAPH: "update-build-code-graph"
} as const


export interface IWsPayload<TBody = unknown> {
    event: WsEvents
    payload: TBody
}
