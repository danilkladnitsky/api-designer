import { BranchesRightArrowRight, PencilToSquare } from "@gravity-ui/icons"
import { Icon } from "@gravity-ui/uikit"

import { CodeGraphNodeProps } from "@/types/code-graph"

import { BaseNode } from "../BaseNode/BaseNode"

const OpenFirewallAction = () => {
    return <Icon data={PencilToSquare} size={8} />
}

export const FirewallNode = ({ data }: CodeGraphNodeProps) => {
    return (
        <BaseNode hasSource actionComponent={<OpenFirewallAction />} icon={BranchesRightArrowRight} {...data} />
    )
}
