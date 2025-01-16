import { Box, Select, SelectOption, Text } from "@gravity-ui/uikit"

import styles from "./Header.module.scss"

const TASK_OPTIONS: SelectOption[] = [
    {
        value: "ping",
        content: "Ping Pong"
    }
]

export const Header = () => {
    return (
        <Box className={styles.header}>
            <Box className={styles.headerLeft}>
                <Text variant="header-1">api designer</Text>
                <Select value={["ping"]} options={TASK_OPTIONS} />
            </Box>

        </Box>
    )
}
