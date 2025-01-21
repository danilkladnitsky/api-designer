import React, { ReactNode, useContext, useMemo } from "react"

import { convertTaskConfigInProcessToCodeGraph } from "@/utils/convertTaskConfigToCodeGraph"

import { useNodes, UseNodesProps } from "../useNodes"

interface ICodeGraphContext extends UseNodesProps {
    className?: string
}

export interface ICodeGraphContextProviderProps extends Pick<ICodeGraphContext, "className"> {

}

const CodeGraphContext = React.createContext({} as ICodeGraphContext)

export const useCodeGraphContext = () => useContext(CodeGraphContext)

export const CodeGraphContextProvider = ({ children, className }: ICodeGraphContextProviderProps & { children: ReactNode }) => {
    const reactflowData = useNodes(convertTaskConfigInProcessToCodeGraph(taskConfig))

    const value: ICodeGraphContext = useMemo(() => ({
        nodes: reactflowData.nodes,
        edges: reactflowData.edges,
        setNodes: reactflowData.setNodes,
        setEdges: reactflowData.setEdges,
        onNodesChange: reactflowData.onNodesChange,
        onEdgesChange: reactflowData.onEdgesChange,
        className

    }), [reactflowData])

    return (
        <CodeGraphContext.Provider value={value}>
            {children}
        </CodeGraphContext.Provider>
    )
}
