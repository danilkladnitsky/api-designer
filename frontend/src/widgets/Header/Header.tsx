import { Box, Text } from "@gravity-ui/uikit"

import { useAppContext } from "@/app/App.context"

import styles from "./Header.module.scss"

export const Header = () => {
    const { task } = useAppContext()
    return (
        <Box className={styles.header}>
            <Box className={styles.headerLeft}>
                <Text variant="header-1">
                    API Designer
                    { task ? ` | ${task.name}` : ""}
                </Text>
            </Box>

        </Box>
    )
}
