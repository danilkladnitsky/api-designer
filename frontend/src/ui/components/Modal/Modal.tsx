import { Box, Card, Text } from "@gravity-ui/uikit"
import React from "react"

import { cn } from "@/utils/cn"

import { CloseButton } from "../CloseButton/CloseButton"

import styles from "./Modal.module.scss"

interface Props {
    children: React.ReactNode
    onClose?: () => void
    title?: string
    className?: string
}

export const Modal = ({ children, title, className, onClose }: Props) => {
    return (
        <Card className={cn(styles.modal, className)}>
            {onClose && <CloseButton onClick={onClose} />}
            {title && (
                <Text className={styles.title} variant="subheader-3">{title}</Text>
            )}
            <Box className={styles.content}>
                {children}
            </Box>
        </Card>
    )
}
