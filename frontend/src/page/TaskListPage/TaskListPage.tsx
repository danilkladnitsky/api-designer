import { Box, Button, Text } from "@gravity-ui/uikit"

import { useAppContext } from "@/app/App.context"

import styles from "./TaskListPage.module.scss"

export const TaskListPage = () => {
    const { taskList, loadTaskById } = useAppContext()

    return (
        <Box className={styles.taskList}>
            <Text variant="header-2">Доступные задачи</Text>
            <Box className={styles.tasks}>
                {
                    taskList.map(task => (
                        <Box key={task.id} className={styles.task}>
                            <Text variant="header-1">
                                {task.name}
                            </Text>
                            <Box className={styles.taskDescription}>
                                <Text variant="body-2">{task.description}</Text>
                            </Box>
                            <Button size="l" onClick={() => loadTaskById(task.id)}>Решать</Button>
                        </Box>
                    ))
                }
            </Box>
        </Box>
    )
}
