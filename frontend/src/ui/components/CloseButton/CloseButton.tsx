import { Xmark } from "@gravity-ui/icons"
import { Button, Icon } from "@gravity-ui/uikit"

import styles from "./CloseButton.module.scss"

interface Props {
    className?: string

    onClick?: () => void
}

export const CloseButton = ({ onClick }: Props) => {
    return (
        <Button onClick={onClick} view="flat" className={styles.taskDescriptionCloseButton}>
            <Icon data={Xmark} size={16} />
        </Button>

    )
}
