'use client';  
import { NodeType } from "@/types/APIresponse";
import Node from "./Node";

export default function NodeGrid({ nodes, onNodeClick }: { nodes: NodeType[], onNodeClick: (id: string) => void }) {
    return (
        <div className="flex justify-center items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 max-w-xs sm:max-w-2xl md:max-w-5xl px-2 md:px-8 w-full">
                {nodes.map((node) => node.type === 'form' && (
                    <Node key={node.id} node={node} onNodeClick={onNodeClick}/>
                ))}
            </div>
        </div>
    );
}
