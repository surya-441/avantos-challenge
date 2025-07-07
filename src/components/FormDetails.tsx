import { FormType } from "@/types/APIresponse";
import React from "react";

export default function FormDetails({ form, onCloseForm }: { form: FormType; onCloseForm: () => void }) {
    return (
        <div className="relative border-2 border-white rounded-xl bg-black bg-opacity-90 p-6 min-w-[800px] max-w-md mx-auto text-white">
            <button
                className="absolute top-2 right-2 text-white hover:text-gray-300 text-2xl font-bold"
                onClick={onCloseForm}
                aria-label="Close"
            >
                &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">{form.name}</h2>
            <ul className="mb-2">
                <li><span className="font-semibold">Description:</span> {form.description}</li>
                <li><span className="font-semibold">Reusable:</span> {form.is_reusable ? "Yes" : "No"}</li>
                <li><span className="font-semibold">ID:</span> {form.id}</li>
            </ul>
            <div className="mt-4">
                <span className="font-semibold">Field Schema:</span>
                <pre className="bg-gray-900 rounded p-2 text-xs overflow-x-auto mt-1">{JSON.stringify(form.field_schema, null, 2)}</pre>
            </div>
        </div>
    );
}