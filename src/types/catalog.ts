export type PropType = 'string' | 'number' | 'boolean' | 'select' | 'color' | 'image';

export interface PropDefinition {
  name: string;
  label: string;
  type: PropType;
  default: unknown;
  options?: string[]; // for select type
  description?: string;
}

export interface VariantDefinition {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  default: string;
}

export interface SlotDefinition {
  name: string;
  label: string;
  accepts: string[]; // componentIds aceitos nesse slot
  multiple: boolean;
  required: boolean;
  maxChildren?: number;
}

export type ComponentCategory = 'atoms' | 'molecules' | 'organisms';

export interface ComponentDefinition {
  id: string;
  name: string;
  category: ComponentCategory;
  description: string;
  props: PropDefinition[];
  variants: VariantDefinition[];
  slots: SlotDefinition[];
  tags: string[];
  icon?: string; // lucide icon name
}
