import { ThemeProvider } from "@gravity-ui/uikit"

import "@gravity-ui/uikit/styles/fonts.css"

import "@gravity-ui/uikit/styles/styles.css"

import "@/ui/styles/theme.scss"

import { AppLayout } from "@/layout/AppLayout/AppLayout"
import { TaskPage } from "@/page/TaskPage/TaskPage"
import "@/ui/styles/index.scss"
import { Header } from "@/widgets/Header/Header"

import { AppContextProvider, useAppContext } from "./App.context"

import { useEffect } from "react"

const AppContent = () => {
    const { task, loadTaskById, getTaskList } = useAppContext()

    useEffect(() => {
        loadTaskById("1")
        getTaskList()
    }, [])

    return (
        <ThemeProvider theme="dark">
            <AppLayout>
                <Header />
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
