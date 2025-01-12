import { Box, Icon, IconProps, Skeleton, Spin, Text } from "@gravity-ui/uikit"
import { Handle, Position } from "@xyflow/react"
import { ReactNode } from "react"

import { cn } from "@/utils/cn"

import { NodeAction } from "../shared/NodeAction/NodeAction"

import styles from "./BaseNode.module.scss"

interface Props {
    name: string
    hasSource?: boolean
    hasTarget?: boolean
    description?: string
    classNames?: {
        wrapper?: string
        title?: string
    }
    loading?: boolean
    icon?: IconProps["data"]
    actionComponent?: ReactNode
    hintComponent?: ReactNode
}

export const BaseNode = ({ name, description, hasSource, hasTarget, classNames, icon, actionComponent, loading }: Props) => {
    return (
        <Box className={cn(styles.baseNode, classNames?.wrapper)}>

            <Box className={styles.nodeTitleWrapper}>
                {hasTarget && <Handle type="target" position={Position.Left} />}

                <Box className={cn(styles.nodeTitle, classNames?.title)}>
                    <NodeAction actionComponent={actionComponent} />
                    {icon && (
                        <Box className={styles.nodeIconWrapper}>
                            {loading && (
                                <Box className={styles.nodeLoading}>
                                    <Spin size="s" />
                                </Box>
                            )}
                            <Box className={cn(styles.nodeIcon, loading && styles.nodeIconLoading)}>
                                <Icon size={32} data={icon} />
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>
            {loading
                ? (
                        <Box className={styles.nodeContent}>
                            <Skeleton className={styles.nodeHeaderSkeleton} />
                            <Skeleton className={styles.nodeDescriptionSkeleton} />
                        </Box>
                    )
                : (
                        <Box className={styles.nodeContent}>
                            <Text variant="subheader-1" className={styles.nodeHeader}>
                                {name}
                            </Text>
                            <Text variant="caption-2" color="secondary">
                                {description}
                            </Text>
                        </Box>
                    )}
            {hasSource && <Handle type="source" position={Position.Right} />}

        </Box>
    )
}
