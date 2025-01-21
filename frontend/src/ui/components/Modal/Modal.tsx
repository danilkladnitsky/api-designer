import { Box, Card, Text } from "@gravity-ui/uikit"
import React, { ReactNode, useState } from "react"

import { cn } from "@/utils/cn"

import { CloseButton } from "../CloseButton/CloseButton"
import { LoadingScreen } from "../LoadingScreen/LoadingScreen"
import { MinifyButton } from "../MinifyButton/MinifyButton"

import styles from "./Modal.module.scss"

interface Props {
    children: React.ReactNode
    canMinify?: boolean
    title?: ReactNode
    className?: string
    loading?: boolean
    onClose?: () => void
}

export const Modal = ({ children, title, className, canMinify = true, loading, onClose }: Props) => {
    const [minified, setMinified] = useState(false)

    const minify = () => {
        if (canMinify) {
            setMinified(v => !v)
        }
    }

    return (
        <Card className={cn(styles.modal, minified && styles.minifiedModal, className)}>
            {loading
                ? (
                        <Box className={styles.loading}>
                            <LoadingScreen />
                        </Box>
                    )
                : (
                        <>
                            {onClose && <CloseButton onClick={onClose} />}
                            <Box className={cn(styles.header, minified && styles.minifiedHeader)}>
                                {title && <Text className={styles.title} variant="subheader-3">{title}</Text>}
                                {canMinify && <MinifyButton minified={minified} onClick={minify} />}
                            </Box>
                            <Box className={cn(styles.content, minified && styles.minifiedContent)}>
                                {children}
                            </Box>
                        </>
                    ) }

        </Card>
    )
}
