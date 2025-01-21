import { ThemeProvider } from "@gravity-ui/uikit"

import "@gravity-ui/uikit/styles/fonts.css"

import "@gravity-ui/uikit/styles/styles.css"

import "@/ui/styles/theme.scss"

import { useEffect } from "react"

import { AppLayout } from "@/layout/AppLayout/AppLayout"
import { TaskListPage } from "@/page/TaskListPage/TaskListPage"
import { TaskPage } from "@/page/TaskPage/TaskPage"
import "@/ui/styles/index.scss"
import { Header } from "@/widgets/Header/Header"

import { AppContextProvider, useAppContext } from "./App.context"

const AppContent = () => {
    const { task, getTaskList } = useAppContext()

    useEffect(() => {
        getTaskList()
    }, [])

    return (
        <ThemeProvider theme="dark">
            <AppLayout>
                <Header />
                {!task && <TaskListPage />}
                {task && <TaskPage task={task} />}
            </AppLayout>
        </ThemeProvider>
    )
}

export const App = () => {
    return (
        <AppContextProvider>
            <AppContent />

        </AppContextProvider>
    )
}
