import { Play } from "@gravity-ui/icons"
import { Box, Button, Icon, Tabs, Text } from "@gravity-ui/uikit"
import { Editor } from "@monaco-editor/react"

import { SAMPLE_TASK_CONFIG } from "@/const/tasks"
import { LoadingScreen } from "@/ui/components/LoadingScreen/LoadingScreen"
import { Modal } from "@/ui/components/Modal/Modal"
import { convertTaskConfigToCodeGraph } from "@/utils/convertTaskConfigToCodeGraph"

import { CodeGraph } from "../CodeGraph/CodeGraph"

import styles from "./CodeEditor.module.scss"

interface Props {
    className?: string
    currentCode?: string
    onChange?: (value: string) => void
}

export const CodeEditor = ({ className, currentCode, onChange }: Props) => {
    const [nodes, edges] = convertTaskConfigToCodeGraph(SAMPLE_TASK_CONFIG)
    const handleOnChange = (value?: string) => {
        onChange?.(value || "")
    }

    return (
        <Modal title="Редактор">
            <Tabs
                className={styles.tabs}

                size="m"
                activeTab="1"
                items={[{
                    id: "1",
                    title: "routes.py"
                },
                {
                    id: "2",
                    title: "docker-compose.yml"
                },
                {
                    id: "3",
                    title: "nginx.conf"
                }]}
            />
            <Box className={styles.codeEditor}>
                <Editor
                    loading={<LoadingScreen />}
                    defaultValue={currentCode}
                    className={styles.editorFrame}
                    height="100%"
                    options={{
                        scrollbar: {
                            useShadows: false
                        },
                        fontSize: 14,
                        minimap: {
                            enabled: false
                        },
                        hideCursorInOverviewRuler: true,
                        showFoldingControls: "always"
                    }}
                    language="python"
                    defaultLanguage="python"
                    theme="vs-dark"
                    onChange={handleOnChange}
                />
                <Text className={styles.tabName} variant="body-2">Архитектура сервиса</Text>
                <CodeGraph className={styles.graphFrame} edges={edges} nodes={nodes} />
                <Box className={styles.action}>
                    <Button size="xl">
                        Запустить
                        <Icon size={18} data={Play} />
                    </Button>

                </Box>
            </Box>
        </Modal>
    )
}
