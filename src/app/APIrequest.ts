import type { ActionBlueprintGraphDescriptionType } from "@/types/APIresponse";

export const fetchData = async (): Promise<
  ActionBlueprintGraphDescriptionType | undefined
> => {
  try {
    const response = await fetch(
      "http://localhost:3000/api/v1/test/actions/blueprints/test/graph"
    );
    if (!response.ok) {
      throw new Error("Invalid request");
    }
    const data = await response.json();
    return data as ActionBlueprintGraphDescriptionType;
  } catch (error) {
    console.error("Fetch data failed", error);
  }
};
