import { Box } from "@gravity-ui/uikit"
import React from "react"

import styles from "./NodeAction.module.scss"

interface Props {
    actionComponent: React.ReactNode
}

export const NodeAction = ({ actionComponent }: Props) => {
    return (
        actionComponent && (
            <Box className={styles.action}>
                {actionComponent}
            </Box>
        )
    )
}
