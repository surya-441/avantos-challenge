"use client";
import {
    ActionBlueprintGraphDescriptionType,
    NodeType,
} from "@/types/APIresponse";
import { fetchData } from "./APIrequest";
import NodeGrid from "@/components/NodeGrid";
import { useEffect, useState } from "react";

export default function Home() {

    const [ data, setData] = useState<ActionBlueprintGraphDescriptionType | undefined>(undefined);

    useEffect(() => {
        const fetchAndFillData = async () => {
            const serverData = await fetchData();
            setData(serverData);
        };
        fetchAndFillData();
    }, []);

    const nodes: NodeType[] | null | undefined = data?.nodes;
    const selectedNodeId = null;

    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <h1 className="text-3xl font-bold underline mb-8">Coding Challenge</h1>
            {nodes && nodes.length > 0 ? (
                <NodeGrid nodes={nodes} onNodeClick={onNodeClick}/>
            ) : (
                <p>The graph does not contain any nodes</p>
            )}
        </main>
    );
}

const onNodeClick = (id: string) => {
    alert(`Node ID: ${id}`);
}