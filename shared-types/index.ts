export type ID = string;
export type Timestamp = string;
export type APIMethod = "GET" | "POST";

export type LLMInput = {
    role: "user" | "assistant";
    content: string;
}

export type LLMOutput = {
    content: string;
};

export type CodeAPIGraph = {
    endpoint: string;
    method: APIMethod;
}