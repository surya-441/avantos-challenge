import React, { useState } from "react";
import { Field, PrefillDataType } from "@/types/Prefill";

interface AutoFillProps {
    selectedField: Field;
    availablePrefillData: PrefillDataType[];
    onSelectPrefillField: (field: Field) => void;
}

export default function AutoFill({
    selectedField,
    availablePrefillData,
    onSelectPrefillField,
}: AutoFillProps) {
    const [openSource, setOpenSource] = useState<string | null>(null);

    return (
        <div className="w-full max-w-md p-6 text-white">
            <h2 className="text-xl font-bold mb-4">AutoFill</h2>
            <ul className="space-y-4">
                {availablePrefillData.map((prefill) => (
                    <li key={prefill.source}>
                        <button
                            className="w-full text-left px-4 py-2 bg-gray-800 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onClick={() => setOpenSource(openSource === prefill.source ? null : prefill.source)}
                        >
                            {prefill.source}
                        </button>
                        {openSource === prefill.source && (
                            <ul className="mt-2 ml-4 space-y-2">
                                {prefill.fields.map((field) => (
                                    <li key={field.fieldName}>
                                        <button
                                            className={`w-full px-3 py-2 rounded text-left border transition-colors
                                                ${selectedField.fieldName === field.fieldName ? 'bg-blue-600 border-blue-400' : 'bg-gray-700 border-gray-600'}
                                                ${selectedField.fieldType !== field.fieldType ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                                            onClick={() => selectedField.fieldType === field.fieldType && onSelectPrefillField(field)}
                                            disabled={selectedField.fieldType !== field.fieldType}
                                        >
                                            {field.fieldName} <span className="text-xs text-gray-400">({field.fieldType})</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
