type Message = {
    content: string
}

type Choice = {
    message: Message
}

export type GigaChatResponse = {
    choices: Choice[]
}
