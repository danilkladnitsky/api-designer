import { CurlyBrackets, Server } from "@gravity-ui/icons"
import { Icon } from "@gravity-ui/uikit"

import { CodeGraphNodeProps } from "@/types/code-graph"

import { BaseNode } from "../BaseNode/BaseNode"

import styles from "./ServiceNode.module.scss"

const OpenCodeAction = () => {
    return <Icon size={8} data={CurlyBrackets} />
}

export const ServiceNode = ({ data }: CodeGraphNodeProps) => {
    return (
        <BaseNode actionComponent={<OpenCodeAction />} className={styles.node} icon={Server} hasTarget hasSource {...data} />
    )
}
