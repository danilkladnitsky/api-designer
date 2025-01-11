import { LogoDocker, PencilToSquare } from "@gravity-ui/icons"
import { Icon } from "@gravity-ui/uikit"

import { CodeGraphNodeProps } from "@/types/code-graph"

import { BaseGroupNode } from "../BaseGroupNode/BaseGroupNode"

const OpenDockerComposeAction = () => {
    return <Icon data={PencilToSquare} size={8} />
}

export const DockerNode = ({ data, height, width }: CodeGraphNodeProps) => {
    return (
        <BaseGroupNode {...data} actionComponent={<OpenDockerComposeAction />} height={height} width={width} icon={LogoDocker} />
    )
}
