import { PrefillDataType } from "@/types/Prefill";

export const getMockGlobalData = (): PrefillDataType[] => {
  return [
    {
      source: "mockSource1",
      fields: [
        { fieldName: "name", fieldType: "string" },
        { fieldName: "email", fieldType: "string" },
      ],
    },
    {
      source: "mockSource2",
      fields: [
        { fieldName: "age", fieldType: "number" },
        { fieldName: "country", fieldType: "string" },
      ],
    },
  ];
};

