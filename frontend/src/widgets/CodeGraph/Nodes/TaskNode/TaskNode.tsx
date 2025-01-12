import { Box, Text } from "@gravity-ui/uikit"

import { CodeGraphNodeProps } from "@/types/code-graph"

import styles from "./TaskNode.module.scss"

export const TaskNode = ({ data }: CodeGraphNodeProps) => {
    return (
        <Box className={styles.taskNode}>
            <Text
                color="hint"
                style={{
                    fontSize: 64
                }}
                variant="header-2"
            >
                {data.name}
            </Text>
            <Text
                color="light-hint"
                variant="header-2"
            >
                {data.description}
            </Text>
        </Box>
    )
}
