import { Box, Divider, Text } from "@gravity-ui/uikit"

import { cn } from "@/utils/cn"

import styles from "./TaskDescription.module.scss"

interface Props {
    className?: string
}

export const TaskDescription = ({ className }: Props) => {
    return (
        <Box className={cn(styles.taskDescription, className)}>
            <Text variant="header-2">Задача А: Ping Pong</Text>
            <Divider />
            <Box className={styles.taskDescriptionText}>
                <Text variant="body-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </Text>
                <Text variant="body-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </Text>
                <Text variant="body-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </Text>
            </Box>
        </Box>
    )
}
