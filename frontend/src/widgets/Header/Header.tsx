import { Box, Text } from "@gravity-ui/uikit"

import styles from "./Header.module.scss"

export const Header = () => {
    return (
        <Box className={styles.header}>
            <Box className={styles.headerLeft}>
                <Text variant="header-1">
                    API Designer
                </Text>
                <img height={32} src="/talent-hub-logo.png" />
            </Box>

        </Box>
    )
}
