import { Box, Card, Text } from "@gravity-ui/uikit"
import React, { useState } from "react"

import { cn } from "@/utils/cn"

import { CloseButton } from "../CloseButton/CloseButton"
import { MinifyButton } from "../MinifyButton/MinifyButton"

import styles from "./Modal.module.scss"

interface Props {
    children: React.ReactNode
    onClose?: () => void
    canMinify?: boolean
    title?: string
    className?: string
}

export const Modal = ({ children, title, className, canMinify = true, onClose }: Props) => {
    const [minified, setMinified] = useState(false)

    const minify = () => {
        if (canMinify) {
            setMinified(v => !v)
        }
    }

    return (
        <Card className={cn(styles.modal, minified && styles.minifiedModal, className)}>
            {onClose && <CloseButton onClick={onClose} />}
            <Box className={cn(styles.header, minified && styles.minifiedHeader)}>
                {title && <Text className={styles.title} variant="subheader-3">{title}</Text>}
                {canMinify && <MinifyButton minified={minified} onClick={minify} />}
            </Box>
            <Box className={cn(styles.content, minified && styles.minifiedContent)}>
                {children}
            </Box>
        </Card>
    )
}
