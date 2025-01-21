import { Box, Button, Text } from "@gravity-ui/uikit"
import { Task } from "shared/task"

import { useAppContext } from "@/app/App.context"
import { cn } from "@/utils/cn"

import styles from "./TaskDescription.module.scss"

interface Props {
    task: Task
    className?: string
}

export const TaskDescription = ({ task, className }: Props) => {
    const { setTask } = useAppContext()
    return (
        <Box className={cn(styles.taskDescription, className)}>
            <Text variant="body-2" className={styles.taskDescriptionText}>
                {task?.description}
            </Text>
            <Button view="flat-contrast" size="l" onClick={() => setTask(null)}>Выбрать другую задачу</Button>
        </Box>
    )
}
