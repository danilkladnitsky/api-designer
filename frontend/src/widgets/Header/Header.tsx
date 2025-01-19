import { Box, Select, Text } from "@gravity-ui/uikit"
import { ID } from "shared/index"

import { useAppContext } from "@/app/App.context"

import styles from "./Header.module.scss"

export const Header = () => {
    const { taskList, task, loadTaskById } = useAppContext()

    const selectTask = (tasks: ID[]) => {
        const taskId = tasks[0]

        loadTaskById(taskId)
    }

    const taskSelectList = taskList.map(task => ({ value: task.id, content: task.name }))
    const selectedTask = task ? [task.id] : undefined

    return (
        <Box className={styles.header}>
            <Box className={styles.headerLeft}>
                <Text variant="header-1">api designer</Text>
                <Select disabled={taskList.length === 0} value={selectedTask} onUpdate={selectTask} options={taskSelectList} />
            </Box>

        </Box>
    )
}
