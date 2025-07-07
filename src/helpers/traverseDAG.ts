import { getMockGlobalData } from "@/app/api/getGlobalData";
import { ActionBlueprintGraphDescriptionType } from "@/types/APIresponse";
import { PrefillDataType } from "@/types/Prefill";

export function findAvailablePrefillData(data: ActionBlueprintGraphDescriptionType, nodeId: string): PrefillDataType[] {
    let prefillArray: PrefillDataType[] = [];
    const globalData = getMockGlobalData();

    prefillArray = [...globalData];

    const currentNode = data?.nodes?.find(node => node.id === nodeId);
    if (!currentNode || currentNode.data.prerequisites.length === 0) return prefillArray;
    
    const visited = new Set<string>();
    const stack = [...currentNode.data.prerequisites];

    while(stack.length > 0) {
        const currentNodeId = stack.pop();
        if (!currentNodeId || visited.has(currentNodeId)) continue;
        visited.add(currentNodeId);

        const node = data.nodes?.find(n => n.id === currentNodeId);

        if (node && node.type === 'form') {
            const form = data.forms?.find(f => f.id === node.data.component_id);

            if (form && form.field_schema && form.field_schema.properties) {

                const fields = Object.keys(form.field_schema.properties).map(field => ({
                    fieldName: field,
                    fieldType: form.field_schema.properties[field]?.avantos_type || 'unknown',
                }));
                prefillArray.push({
                    source: node.data.name,
                    fields,
                });
            }
        }

        if (node && node.data.prerequisites.length > 0) {
            stack.push(...node.data.prerequisites);
        }
    }

    return prefillArray
}