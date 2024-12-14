import { Box, Tabs } from "@gravity-ui/uikit"

import { CodeEditor } from "@/widgets/CodeEditor/CodeEditor"
import { TaskDescription } from "@/widgets/TaskDescription/TaskDescription"

import styles from "./TaskPage.module.scss"

const TABS = [{
    id: "1",
    title: "Код"
},
{
    id: "2",
    title: "Архитектура"
}]

export const TaskPage = () => {
    return (
        <Box className={styles.page}>
            <TaskDescription className={styles.taskDescriptionWidget} />
            <Box className={styles.codeEditorWidget}>
                <Tabs size="l" items={TABS} className={styles.tabs} />
                <CodeEditor />
            </Box>
        </Box>
    )
}
