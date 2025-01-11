import { Persons } from "@gravity-ui/icons"

import { CodeGraphNodeProps } from "@/types/code-graph"

import { BaseNode } from "../BaseNode/BaseNode"

export const ClientNode = ({ data }: CodeGraphNodeProps) => {
    return (
        <BaseNode hasSource {...data} icon={Persons} />
    )
}
