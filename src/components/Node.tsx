'use client';
import { NodeType } from "@/types/APIresponse";

export default function Node({ node, onNodeClick }: { node: NodeType, onNodeClick: (id: string) => void }) {
    return (
        <div
            key={node.id}
            className="flex items-center justify-center text-center rounded-xl border border-white bg-transparent shadow-lg p-4 h-12 w-40"
            onClick={() => onNodeClick(node.id)}
        >
            <h2 className="text-xl font-semibold m-0 w-full">{node.data.name}</h2>
        </div>
    );
}
