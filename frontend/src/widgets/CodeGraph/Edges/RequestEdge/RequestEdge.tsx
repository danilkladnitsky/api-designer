import { BaseEdge, getSmoothStepPath, type EdgeProps } from "@xyflow/react"

import styles from "./RequestEdge.module.scss"

export const RequestEdge = ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition
}: EdgeProps) => {
    const [edgePath] = getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition
    })

    return (
        <>
            <BaseEdge className={styles.edge} id={id} path={edgePath} />
            <circle className={styles.edgeCircle} r="4">
                <animateMotion dur="2s" repeatCount="indefinite" path={edgePath} />
            </circle>
        </>
    )
}
