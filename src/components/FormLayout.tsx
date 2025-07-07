import {
    ActionBlueprintGraphDescriptionType,
    FormType,
    NodeType,
} from "@/types/APIresponse";
import React, { useState } from "react";
import FormContent from "./FormContent";
import AutoFill from "./AutoFill";
import { findAvailablePrefillData } from "@/helpers/traverseDAG";
import { Field } from "@/types/Prefill";

export default function FormDetails({
    data,
    nodeId,
    onCloseForm,
}: {
    data: ActionBlueprintGraphDescriptionType;
    nodeId: string;
    onCloseForm: () => void;
}) {
    const node = data.nodes?.find((node: NodeType) => node.id === nodeId);
    const formId = node?.data?.component_id;
    const nodeName: string = node?.data?.name || "Node Not Found";
    const [prefillMappedForm, setPrefillMappedForm] = useState(node?.data.input_mapping || {});

    const form: FormType | null | undefined =
        data.forms?.find((form) => form.id === formId) || null;

    const availablePrefillData = findAvailablePrefillData(data, nodeId);
    const [selectedField, setSelectedField] = React.useState<Field | null>(null);

    const onFieldClick = (fieldName:string, fieldType:string) => {
        setSelectedField({fieldName, fieldType});
    };

    const handleSelectPrefillField = (field: Field, source: string) => {
        console.log("Prefill Field Selected: ", field);
        const mappingString = source + "." + field.fieldName;
        console.log("Mapping String: ", mappingString);
        if(selectedField && selectedField.fieldName)
            setPrefillMappedForm((prev) => ({...prev, [selectedField.fieldName]: mappingString}));
        setSelectedField(null);
    }

    const handleClearPreFillMapping = (key: string) => () => {
        setPrefillMappedForm((prev) => {
            const newMapping = {...prev};
            delete newMapping[key];
            return newMapping;
        });
    }

    return (
        <div className="relative border-2 border-white rounded-xl bg-black bg-opacity-90 p-6 min-w-[800px] max-w-md mx-auto text-white">
            <button
                className="absolute top-2 right-2 text-white hover:text-gray-300 text-2xl font-bold"
                onClick={onCloseForm}
                aria-label="Close"
            >
                &times;
            </button>
            {selectedField !== null && (
                <button
                    className="absolute top-2 left-2 text-white hover:text-gray-300 text-sm font-bold underline"
                    onClick={() => setSelectedField(null)}
                    aria-label="Back to Form"
                >
                    &larr; Back to Form
                </button>
            )}
            {selectedField !== null ? (
                <AutoFill
                    selectedField={selectedField}
                    availablePrefillData={availablePrefillData}
                    onSelectPrefillField={handleSelectPrefillField}
                />
            ) : (
                <FormContent
                    form={form}
                    nodeName={nodeName}
                    onFieldClick={onFieldClick}
                    prefillMappedForm={prefillMappedForm}
                    clearPrefillMapping={handleClearPreFillMapping}
                />
            )}
        </div>
    );
}
