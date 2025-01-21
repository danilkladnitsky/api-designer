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
            <Box className={styles.taskDescriptionText}>
                <Box>
                    <Text variant="subheader-2">Описание задачи</Text>
                    <Box>
                        <Text variant="body-2">
                            {task?.description}
                        </Text>
                    </Box>
                </Box>
                <Box>
                    <Text variant="subheader-2">Полезные ссылки</Text>
                    <Box>
                        <Text variant="body-2">
                            Ссылки
                        </Text>
                    </Box>
                </Box>
            </Box>
            <Button view="flat-contrast" size="xl" onClick={() => setTask(null)}>Выбрать другую задачу</Button>
        </Box>
    )
}
