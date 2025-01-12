import { Box, Divider, Text } from "@gravity-ui/uikit"

import { CloseButton } from "@/ui/components/CloseButton/CloseButton"
import { cn } from "@/utils/cn"

import styles from "./TaskDescription.module.scss"

interface Props {
    className?: string
}

export const TaskDescription = ({ className }: Props) => {
    return (
        <Box className={cn(styles.taskDescription, className)}>
            <CloseButton />
            <Text variant="subheader-3">Задача А: Ping Pong</Text>
            <Divider />
            <Box className={styles.taskDescriptionText}>
                <Text variant="body-1">
                    Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

                    You may assume that each input would have exactly one solution, and you may not use the same element twice.

                    You can return the answer in any order.

                </Text>

            </Box>
        </Box>
    )
}
