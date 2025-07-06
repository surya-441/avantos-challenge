import type { JsonSchema, UISchemaElement } from "@jsonforms/core";

export interface EdgeType {
  source: string;
  target: string;
}

export interface FormType {
  id: string;
  name: string;
  description: string;
  is_reusable: boolean;
  field_schema: JsonSchema;
  ui_schema?: UISchemaElement;
  dynamic_field_config: Record<string, unknown>;
}

export interface NodeDataType {
  id: string;
  component_key: string;
  component_type: string;
  component_id: string;
  name: string;
  prerequisites: string[];
  permitted_roles: string[];
  input_mapping: Record<string, unknown>;
  sla_duration: {
    number: number;
    unit: string;
  };
  approval_required: boolean;
  approval_roles: string[];
}

export interface NodeType {
  id: string;
  type: "form";
  position: Record<string, unknown>;
  data: NodeDataType;
}

export interface ActionBlueprintGraphDescriptionType {
  readonly $schema?: string;

  id: string;
  tenant_id: string;
  name: string;
  description: string | null;
  category: string | null;

  branches: [] | null;
  edges: EdgeType[] | null;
  nodes: NodeType[] | null;
  forms: FormType[] | null;
  triggers: [] | null;
}
