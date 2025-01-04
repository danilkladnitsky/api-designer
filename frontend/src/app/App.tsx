import { ThemeProvider } from "@gravity-ui/uikit"

import { TaskPage } from "@/page/TaskPage/TaskPage"

import "@gravity-ui/uikit/styles/fonts.css"

import "@gravity-ui/uikit/styles/styles.css"

import "@/ui/styles/theme.scss"

import { AppLayout } from "@/layout/AppLayout/AppLayout"
import "@/ui/styles/index.scss"
import { Header } from "@/widgets/Header/Header"

export const App = () => {
    return (
        <ThemeProvider theme="dark">
            <AppLayout>
                <Header />
                <TaskPage />
            </AppLayout>
        </ThemeProvider>
    )
}
