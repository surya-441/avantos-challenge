import { fetchData } from "../app/APIrequest";
import type { ActionBlueprintGraphDescriptionType } from "@/types/APIresponse";

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("fetchData", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns data when fetch is successful", async () => {
    const mockData: ActionBlueprintGraphDescriptionType = {
      id: "test",
      tenant_id: "t1",
      name: "n",
      description: null,
      category: null,
      branches: [],
      edges: [
        { source: "a", target: "b" }
      ],
      nodes: [
        {
          id: "node1",
          type: "form",
          position: {},
          data: {
            id: "node1",
            component_key: "form-1",
            component_type: "form",
            component_id: "f_01",
            name: "Form 1",
            prerequisites: [],
            permitted_roles: [],
            input_mapping: {},
            sla_duration: { number: 0, unit: "minutes" },
            approval_required: false,
            approval_roles: []
          }
        }
      ],
      forms: [
        {
          id: "f_01",
          name: "Form 1",
          description: "desc",
          is_reusable: false,
          field_schema: {},
          ui_schema: undefined,
          dynamic_field_config: {}
        }
      ],
      triggers: []
    };
    const mockResponse = {
      ok: true,
      json: async () => mockData,
    };
    mockFetch.mockResolvedValueOnce(mockResponse);
    const data = await fetchData();
    expect(data).toBeDefined();
    expect(data?.id).toBe("test");
    expect(data?.forms?.[0].id).toBe("f_01");
    expect(data?.nodes?.[0].data.component_key).toBe("form-1");
  });

  it("throws error when response is not ok", async () => {
    const mockResponse = { ok: false };
    mockFetch.mockResolvedValueOnce(mockResponse);
    const data = await fetchData();
    expect(data).toBeUndefined();
  });

  it("returns undefined and logs error on fetch failure", async () => {
    const error = new Error("Network error");
    mockFetch.mockRejectedValueOnce(error);
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    const data = await fetchData();
    expect(data).toBeUndefined();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
