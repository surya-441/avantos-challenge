export type PrefillDataType = {
    source: string;
    fields: Field[];
};

export type Field = {
    fieldName: string;
    fieldType: string;
}