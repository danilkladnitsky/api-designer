import { ThemeProvider } from "@gravity-ui/uikit"

import "@gravity-ui/uikit/styles/fonts.css"

import "@gravity-ui/uikit/styles/styles.css"

import "@/ui/styles/theme.scss"

import { AppLayout } from "@/layout/AppLayout/AppLayout"
import "@/ui/styles/index.scss"
import { CodeGraph } from "@/widgets/CodeGraph/CodeGraph"
import { Header } from "@/widgets/Header/Header"
import { useSocket } from "@/ws/useSocket"

export const App = () => {
    useSocket()
    return (
        <ThemeProvider theme="dark">
            <AppLayout>
                <Header />
                <CodeGraph />
                {/* <TaskPage /> */}
            </AppLayout>
        </ThemeProvider>
    )
}
