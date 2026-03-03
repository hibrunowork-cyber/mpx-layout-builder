export type RuleType =
  | 'no-self-nesting'
  | 'requires-child'
  | 'max-children'
  | 'forbidden-parent'
  | 'max-depth'
  | 'min-children'
  | 'slot-type-mismatch'
  | 'max-instances'
  | 'root-position';

interface BaseRule {
  id: string;
  severity: 'error' | 'warning';
  message: string; // template, pode usar {{component}}, {{parent}}, etc.
}

export interface NoSelfNestingRule extends BaseRule {
  type: 'no-self-nesting';
  componentId: string;
}

export interface RequiresChildRule extends BaseRule {
  type: 'requires-child';
  componentId: string;
  requiredChildren?: string[]; // se vazio, qualquer filho
}

export interface MaxChildrenRule extends BaseRule {
  type: 'max-children';
  componentId: string;
  max: number;
  slotName?: string; // se undefined, conta todos os filhos
}

export interface MinChildrenRule extends BaseRule {
  type: 'min-children';
  componentId: string;
  min: number;
  slotName?: string;
}

export interface ForbiddenParentRule extends BaseRule {
  type: 'forbidden-parent';
  componentId: string;
  forbiddenParents: string[];
}

export interface MaxDepthRule extends BaseRule {
  type: 'max-depth';
  maxDepth: number;
}

export interface SlotTypeMismatchRule extends BaseRule {
  type: 'slot-type-mismatch';
  parentId: string;
  slotName: string;
  allowedTypes: string[];
}

export interface MaxInstancesRule extends BaseRule {
  type: 'max-instances';
  componentId: string;
  max: number;
}

export interface RootPositionRule extends BaseRule {
  type: 'root-position';
  componentId: string;
  position: 'first' | 'last';
}

export type CompositionRule =
  | NoSelfNestingRule
  | RequiresChildRule
  | MaxChildrenRule
  | MinChildrenRule
  | ForbiddenParentRule
  | MaxDepthRule
  | SlotTypeMismatchRule
  | MaxInstancesRule
  | RootPositionRule;

export interface RuleViolation {
  ruleId: string;
  nodeId: string;
  severity: 'error' | 'warning';
  message: string;
  componentName?: string;
}
