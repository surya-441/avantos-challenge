"use client";
import {
    ActionBlueprintGraphDescriptionType,
    FormType,
    NodeType,
} from "@/types/APIresponse";
import { fetchData } from "./APIrequest";
import NodeGrid from "@/components/NodeGrid";
import { useEffect, useState } from "react";
import FormDetails from "@/components/FormDetails";

export default function Home() {

    const [ data, setData] = useState<ActionBlueprintGraphDescriptionType | undefined>(undefined);
    const [ form, setForm ] = useState<FormType | null>(null);

    const nodes: NodeType[] | null | undefined = data?.nodes;
    const forms: FormType[] | null | undefined = data?.forms;

    useEffect(() => {
        const fetchAndFillData = async () => {
            const serverData = await fetchData();
            setData(serverData);
        };
        fetchAndFillData();
    }, []);

    const onNodeClick = (id: string) => {
        const selectedForm = forms?.find((form) => form.id === id) || null;
        setForm(selectedForm);
    }

    const onCloseForm = () => {
        setForm(null);
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
           {form && (
                <FormDetails form={form} onCloseForm={onCloseForm}/>
            )}
        </main>
    );
}

