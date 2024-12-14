import { Box } from "@gravity-ui/uikit"
import React from "react"

import styles from "./AppLayout.module.scss"

interface Props {
    children: React.ReactNode
}

export const AppLayout = ({ children }: Props) => {
    return (
        <Box className={styles.appLayout}>{children}</Box>
    )
}
