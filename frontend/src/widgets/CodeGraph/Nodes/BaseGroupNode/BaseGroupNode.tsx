import { Box, Icon, IconProps, Text } from "@gravity-ui/uikit"
import { Handle, Position } from "@xyflow/react"
import { ReactNode } from "react"

import { NodeAction } from "../shared/NodeAction/NodeAction"

import styles from "./BaseGroupNode.module.scss"

interface BaseGroupNodeProps {
    name: string
    height?: number
    width?: number
    icon?: IconProps["data"]
    actionComponent?: ReactNode
}

export const BaseGroupNode = ({ name, icon, height, width, actionComponent }: BaseGroupNodeProps) => {
    return (
        <Box className={styles.baseGroupNode} style={{ height, width }}>
            <NodeAction actionComponent={actionComponent} />
            <Handle type="source" id="firewallOutput" position={Position.Left} />
            <Handle type="target" position={Position.Left} />
            <Box className={styles.groupTitle}>
                {icon && <Icon size={24} data={icon} />}
                <Text variant="subheader-3">
                    {name}
                </Text>
            </Box>
        </Box>
    )
}
