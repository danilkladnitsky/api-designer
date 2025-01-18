import { Box, Text } from "@gravity-ui/uikit"
import { Task } from "shared/task"

import { cn } from "@/utils/cn"

import styles from "./TaskDescription.module.scss"

interface Props {
    task: Task
    className?: string
}

export const TaskDescription = ({ task, className }: Props) => {
    return (
        <Box className={cn(styles.taskDescription, className)}>
            <Text variant="body-2" className={styles.taskDescriptionText}>
                {task?.description}
            </Text>
        </Box>
    )
}
