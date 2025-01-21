import { ArrowUpRightFromSquare } from "@gravity-ui/icons"
import { Box, Button, Link, Skeleton, Text } from "@gravity-ui/uikit"
import { useEffect, useState } from "react"
import { EducationLink } from "shared/education"
import { Task } from "shared/task"

import { generateLinks } from "@/api"
import { useAppContext } from "@/app/App.context"
import { cn } from "@/utils/cn"

import styles from "./TaskDescription.module.scss"

interface Props {
    task: Task
    className?: string
}

export const TaskDescription = ({ task, className }: Props) => {
    const { setTask } = useAppContext()
    const [links, setLinks] = useState<EducationLink[]>([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchLinks = async () => {
            setIsLoading(true)
            const res = await generateLinks(task.id)

            if (!res) {
                setIsLoading(false)
                return
            }

            setIsLoading(false)
            setLinks(res.content.links)
        }

        fetchLinks()
    }, [])

    return (
        <Box className={cn(styles.taskDescription, className)}>
            <Box className={styles.taskDescriptionText}>
                <Box>
                    <Text variant="subheader-2">Описание задачи</Text>
                    <Box>
                        <Text variant="body-2">
                            {task?.description}
                        </Text>
                    </Box>
                </Box>
                <Box>
                    <Text variant="subheader-2">Полезные ссылки</Text>
                    <Box className={styles.linksList}>
                        {isLoading && (
                            <>
                                <Skeleton className={styles.linkSkeleton} />
                                <Skeleton className={styles.linkSkeleton} />
                                <Skeleton className={styles.linkSkeleton} />
                                <Skeleton className={styles.linkSkeleton} />
                            </>
                        )}
                        {
                            links.map((link, idx) => (
                                <Box className={styles.link} key={idx}>
                                    <Link view="primary" href={link.url} target="_blank">{link.title}</Link>
                                    <ArrowUpRightFromSquare />
                                </Box>
                            ))
                        }
                    </Box>
                </Box>
            </Box>
            <Button view="flat-contrast" size="xl" onClick={() => setTask(null)}>Выбрать другую задачу</Button>
        </Box>
    )
}
