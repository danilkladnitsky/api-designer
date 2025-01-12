import React, { ReactNode, useContext, useMemo } from "react"

import { useNodes, UseNodesProps } from "../useNodes"

interface ICodeGraphContext extends UseNodesProps {
}

export interface ICodeGraphContextProviderProps extends Pick<ICodeGraphContext, "edges" | "nodes"> {
}

const CodeGraphContext = React.createContext({} as ICodeGraphContext)

export const useCodeGraphContext = () => useContext(CodeGraphContext)

export const CodeGraphContextProvider = ({ children, nodes, edges }: ICodeGraphContextProviderProps & { children: ReactNode }) => {
    const reactflowData = useNodes({ nodes, edges })

    const value: ICodeGraphContext = useMemo(() => ({
        nodes: reactflowData.nodes,
        edges: reactflowData.edges,
        setNodes: reactflowData.setNodes,
        setEdges: reactflowData.setEdges,
        onNodesChange: reactflowData.onNodesChange,
        onEdgesChange: reactflowData.onEdgesChange

    }), [reactflowData])

    return (
        <CodeGraphContext.Provider value={value}>
            {children}
        </CodeGraphContext.Provider>
    )
}
