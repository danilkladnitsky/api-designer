import { ChevronLeft, ChevronRight, CircleInfo, CurlyBrackets, Play } from "@gravity-ui/icons"
import { Box, Button, Icon } from "@gravity-ui/uikit"

import styles from "./TaskCommandPanel.module.scss"

export const TaskCommandPanel = () => {
    return (
        <Box className={styles.taskCommandPanelWrapper}>
            <Box className={styles.taskCommandPanel}>
                <Button className={styles.taskCommandPanelButton}>
                    <Icon data={ChevronLeft} size={64} />
                </Button>
                <Button className={styles.taskCommandPanelButton}>
                    <Icon data={CurlyBrackets} size={64} />
                </Button>
                <Button view="action" className={styles.taskCommandPanelButton}>
                    <Icon data={Play} size={64} />
                </Button>
                <Button className={styles.taskCommandPanelButton}>
                    <Icon data={CircleInfo} size={64} />
                </Button>
                <Button className={styles.taskCommandPanelButton}>
                    <Icon data={ChevronRight} size={64} />
                </Button>

            </Box>
        </Box>
    )
}
