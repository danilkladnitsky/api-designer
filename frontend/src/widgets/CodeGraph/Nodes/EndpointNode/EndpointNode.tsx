import { AbbrApi } from "@gravity-ui/icons"

import { CodeGraphNodeProps } from "@/types/code-graph"

import { BaseNode } from "../BaseNode/BaseNode"

export const EndpointNode = ({ data }: CodeGraphNodeProps) => {
    return (
        <BaseNode icon={AbbrApi} hasTarget {...data} />
    )
}
