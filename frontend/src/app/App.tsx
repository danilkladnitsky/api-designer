import { ThemeProvider } from "@gravity-ui/uikit"

import "@gravity-ui/uikit/styles/fonts.css"

import "@gravity-ui/uikit/styles/styles.css"

import "@/ui/styles/theme.scss"

import { AppLayout } from "@/layout/AppLayout/AppLayout"
import { TaskPage } from "@/page/TaskPage/TaskPage"
import "@/ui/styles/index.scss"
import { Header } from "@/widgets/Header/Header"

import { AppContextProvider } from "./App.context"

export const App = () => {
    return (
        <ThemeProvider theme="dark">
            <AppContextProvider>
                <AppLayout>
                    <Header />
                    <TaskPage taskId="1" />
                </AppLayout>
            </AppContextProvider>

        </ThemeProvider>
    )
}
