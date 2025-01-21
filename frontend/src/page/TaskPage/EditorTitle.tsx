import { Box, RadioButton, RadioButtonOption } from "@gravity-ui/uikit"

import { useAppContext } from "@/app/App.context"

import styles from "./EditorTitle.module.scss"
const OPTIONS: RadioButtonOption[] = [
    {
        value: "code",
        content: "Код"
    },
    {
        value: "diagram",
        content: "Архитектура"
    }
]

export const EditorTitle = () => {
    const { codeView, setCodeView } = useAppContext()
    return (
        <Box className={styles.wrapper}>
            Редактор
            <RadioButton value={codeView} onUpdate={setCodeView} size="m" options={OPTIONS} />
        </Box>
    )
}
