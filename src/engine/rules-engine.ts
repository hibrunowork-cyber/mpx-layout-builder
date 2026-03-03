import { CanvasNode } from '@/types/canvas';
import { CompositionRule, RuleViolation } from '@/types/rules';
import { getComponent } from '@/data/components-catalog';

function flattenWithDepth(nodes: CanvasNode[], depth = 0): Array<{ node: CanvasNode; depth: number }> {
  const result: Array<{ node: CanvasNode; depth: number }> = [];
  for (const node of nodes) {
    result.push({ node, depth });
    if (node.children.length > 0) {
      result.push(...flattenWithDepth(node.children, depth + 1));
    }
  }
  return result;
}

function findNode(nodes: CanvasNode[], id: string): CanvasNode | undefined {
  for (const { node } of flattenWithDepth(nodes)) {
    if (node.id === id) return node;
  }
  return undefined;
}

function getParent(nodes: CanvasNode[], nodeId: string): CanvasNode | undefined {
  const flat = flattenWithDepth(nodes);
  const entry = flat.find((e) => e.node.id === nodeId);
  if (!entry || !entry.node.parentId) return undefined;
  return findNode(nodes, entry.node.parentId);
}

export function validateComposition(
  nodes: CanvasNode[],
  rules: CompositionRule[]
): RuleViolation[] {
  const violations: RuleViolation[] = [];
  const flatWithDepth = flattenWithDepth(nodes);

  for (const rule of rules) {
    switch (rule.type) {
      case 'no-self-nesting': {
        for (const { node } of flatWithDepth) {
          if (node.componentId !== rule.componentId) continue;
          const parent = getParent(nodes, node.id);
          if (parent && parent.componentId === rule.componentId) {
            violations.push({
              ruleId: rule.id,
              nodeId: node.id,
              severity: rule.severity,
              message: rule.message,
              componentName: getComponent(node.componentId)?.name,
            });
          }
        }
        break;
      }

      case 'requires-child': {
        for (const { node } of flatWithDepth) {
          if (node.componentId !== rule.componentId) continue;
          const hasChildren = node.children.length > 0;
          if (!hasChildren) {
            violations.push({
              ruleId: rule.id,
              nodeId: node.id,
              severity: rule.severity,
              message: rule.message,
              componentName: getComponent(node.componentId)?.name,
            });
          }
        }
        break;
      }

      case 'max-children': {
        for (const { node } of flatWithDepth) {
          if (node.componentId !== rule.componentId) continue;
          const children = rule.slotName
            ? node.children.filter((c) => c.slotName === rule.slotName)
            : node.children;
          if (children.length > rule.max) {
            violations.push({
              ruleId: rule.id,
              nodeId: node.id,
              severity: rule.severity,
              message: rule.message,
              componentName: getComponent(node.componentId)?.name,
            });
          }
        }
        break;
      }

      case 'min-children': {
        for (const { node } of flatWithDepth) {
          if (node.componentId !== rule.componentId) continue;
          const children = rule.slotName
            ? node.children.filter((c) => c.slotName === rule.slotName)
            : node.children;
          if (children.length < rule.min) {
            violations.push({
              ruleId: rule.id,
              nodeId: node.id,
              severity: rule.severity,
              message: rule.message,
              componentName: getComponent(node.componentId)?.name,
            });
          }
        }
        break;
      }

      case 'forbidden-parent': {
        for (const { node } of flatWithDepth) {
          if (node.componentId !== rule.componentId) continue;
          const parent = getParent(nodes, node.id);
          if (parent && rule.forbiddenParents.includes(parent.componentId)) {
            violations.push({
              ruleId: rule.id,
              nodeId: node.id,
              severity: rule.severity,
              message: rule.message,
              componentName: getComponent(node.componentId)?.name,
            });
          }
        }
        break;
      }

      case 'max-depth': {
        for (const { node, depth } of flatWithDepth) {
          if (depth > rule.maxDepth) {
            violations.push({
              ruleId: rule.id,
              nodeId: node.id,
              severity: rule.severity,
              message: rule.message,
              componentName: getComponent(node.componentId)?.name,
            });
          }
        }
        break;
      }

      case 'max-instances': {
        const instances = flatWithDepth.filter(({ node }) => node.componentId === rule.componentId);
        if (instances.length > rule.max) {
          instances.slice(rule.max).forEach(({ node }) => {
            violations.push({
              ruleId: rule.id,
              nodeId: node.id,
              severity: rule.severity,
              message: rule.message,
              componentName: getComponent(node.componentId)?.name,
            });
          });
        }
        break;
      }

      case 'root-position': {
        const rootMatches = nodes.filter((n) => n.componentId === rule.componentId);
        if (rootMatches.length === 0) break;
        const sortedRoots = [...nodes].sort((a, b) => a.order - b.order);
        for (const match of rootMatches) {
          const idx = sortedRoots.findIndex((n) => n.id === match.id);
          const isValid =
            rule.position === 'first' ? idx === 0 : idx === sortedRoots.length - 1;
          if (!isValid) {
            violations.push({
              ruleId: rule.id,
              nodeId: match.id,
              severity: rule.severity,
              message: rule.message,
              componentName: getComponent(match.componentId)?.name,
            });
          }
        }
        break;
      }

      // slot-type-mismatch handled by drag validation, not needed here
    }
  }

  return violations;
}
