import { FormType } from "@/types/APIresponse";
import { clear } from "console";

export default function FormContent({
    form,
    nodeName,
    onFieldClick,
    prefillMappedForm,
    clearPrefillMapping
}: {
    form: FormType | null | undefined;
    nodeName: string;
    onFieldClick: (fieldName: string, fieldType: string) => void;
    prefillMappedForm: any;
    clearPrefillMapping: (key: string) => () => void;
}) {
    if (!form) {
        return <div className="text-center text-red-500">Form not found.</div>;
    }

    const properties = form.field_schema?.properties || {};

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-center">{nodeName}</h2>
            <h3 className="text-xl font-bold mb-4 text-center">{form.name}</h3>
            <ul className="mb-2">
                <li>
                    <span className="font-semibold">Description:</span>{" "}
                    {form.description}
                </li>
                <li>
                    <span className="font-semibold">ID:</span> {form.id}
                </li>
            </ul>
            <h2 className="text-xl font-bold mb-4 text-center">Form Fields</h2>
            {Object.keys(properties).length > 0 ? (
                <div className="grid grid-cols-1 gap-4 mt-2">
                    {Object.keys(properties).map((key) => (
                        <div key={key} className="flex items-center gap-2">
                            <input
                                type="text"
                                value={
                                    key +
                                    (key in prefillMappedForm
                                        ? ": " + prefillMappedForm[key]
                                        : "")
                                }
                                readOnly
                                tabIndex={0}
                                className="cursor-pointer bg-gray-800 text-white border border-gray-500 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onClick={() =>
                                    onFieldClick(
                                        key,
                                        properties[key].avantos_type || ""
                                    )
                                }
                            />
                            {key in prefillMappedForm && (
                                <button
                                    className="ml-2 text-gray-400 hover:text-red-500 text-lg font-bold focus:outline-none"
                                    aria-label={`Clear ${key}`}
                                    type="button"
                                    onClick={clearPrefillMapping(key)}
                                >
                                    &times;
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p>No fields defined in schema.</p>
            )}
        </div>
    );
}
