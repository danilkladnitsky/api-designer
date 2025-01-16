import { Box, Text } from "@gravity-ui/uikit"

import { cn } from "@/utils/cn"

import styles from "./TaskDescription.module.scss"

interface Props {
    className?: string
}

export const TaskDescription = ({ className }: Props) => {
    return (
        <Box className={cn(styles.taskDescription, className)}>
            <Text variant="body-2" className={styles.taskDescriptionText}>
                Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
                You may assume that each input would have exactly one solution, and you may not use the same element twice.
                You can return the answer in any order.

            </Text>
        </Box>
    )
}
