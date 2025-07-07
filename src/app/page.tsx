"use client";
import {
    ActionBlueprintGraphDescriptionType,
    EdgeType,
    FormType,
    NodeType,
} from "@/types/APIresponse";
import { fetchData } from "./APIrequest";
import NodeGrid from "@/components/NodeGrid";
import { useEffect, useState } from "react";
import FormDetails from "@/components/FormLayout";

export default function Home() {

    const [ data, setData] = useState<ActionBlueprintGraphDescriptionType | undefined>(undefined);
    const [ selectedNode, setSelectedNode ] = useState<string | null>(null);

    const nodes: NodeType[] | null | undefined = data?.nodes;

    useEffect(() => {
        const fetchAndFillData = async () => {
            const serverData = await fetchData();
            setData(serverData);
        };
        fetchAndFillData();
    }, []);

    const onNodeClick = (nodeId: string) => {
        setSelectedNode(nodeId);
    }

    const onCloseForm = () => {
        setSelectedNode(null);
    }

    if(!data) {
        return <div className="flex min-h-screen flex-col items-center p-24 text-white">Loading...</div>;
    }

    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <h1 className="text-3xl font-bold underline mb-8">Coding Challenge</h1>
            <div className="mb-16">
                {nodes && nodes.length > 0 ? (
                    <NodeGrid nodes={nodes} onNodeClick={onNodeClick}/>
                ) : (
                    <p>The graph does not contain any nodes</p>
                )}
            </div>
           {selectedNode && (
                <FormDetails data={data} nodeId={selectedNode} onCloseForm={onCloseForm}/>
            )}
        </main>
    );
}

