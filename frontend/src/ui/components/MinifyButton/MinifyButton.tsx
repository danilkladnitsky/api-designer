import { CaretDown, CaretUp } from "@gravity-ui/icons"
import { Button, Icon } from "@gravity-ui/uikit"

import styles from "./MinifyButton.module.scss"

interface Props {
    minified?: boolean
    onClick?: () => void
}

export const MinifyButton = ({ minified, onClick }: Props) => {
    return (
        <Button onClick={onClick} view="flat" className={styles.minifyButton}>
            <Icon data={minified ? CaretUp : CaretDown} size={16} />
        </Button>
    )
}
