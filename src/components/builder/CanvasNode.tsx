'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CanvasNode as CanvasNodeType } from '@/types/canvas';
import { useCanvasStore } from '@/store/canvas-store';
import { renderAndesComponent } from '@/components/andes/registry';
import { RuleViolation } from '@/types/rules';
import { app } from '@/data/tokens';
import { getComponent } from '@/data/components-catalog';
import { Trash2, GripVertical } from 'lucide-react';

interface Props {
  node: CanvasNodeType;
  violations: RuleViolation[];
  depth?: number;
}

export function CanvasNodeComponent({ node, violations, depth = 0 }: Props) {
  const { selectedId, selectedIds, selectNode, toggleSelectNode, removeNode } = useCanvasStore();
  const isSelected = selectedId === node.id;
  const isMultiSelected = selectedIds.includes(node.id);

  const nodeViolations = violations.filter((v) => v.nodeId === node.id);
  const hasError = nodeViolations.some((v) => v.severity === 'error');
  const hasWarning = nodeViolations.some((v) => v.severity === 'warning');

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: node.id,
    data: { origin: 'canvas', node },
  });

  const def = getComponent(node.componentId);

  const borderColor = isSelected
    ? app.andesBlue
    : isMultiSelected
    ? '#a78bfa'
    : hasError
    ? app.errorRed
    : hasWarning
    ? app.warningYellow
    : 'transparent';

  const renderedChildren = node.children.length > 0
    ? node.children.map((child) => (
        <CanvasNodeComponent
          key={child.id}
          node={child}
          violations={violations}
          depth={depth + 1}
        />
      ))
    : undefined;

  const andesElement = renderAndesComponent(node, renderedChildren, isSelected);

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.3 : 1,
        position: 'relative',
        width: depth === 0 ? '100%' : undefined,
      }}
    >
      {/* Node wrapper */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          if (e.shiftKey) {
            toggleSelectNode(node.id);
          } else {
            selectNode(node.id);
          }
        }}
        style={{
          border: `1.5px solid ${borderColor}`,
          borderRadius: '8px',
          background: isSelected
            ? `${app.andesBlue}08`
            : isMultiSelected
            ? '#a78bfa12'
            : 'transparent',
          position: 'relative',
          transition: 'border-color 120ms, background 120ms',
          cursor: 'default',
        }}
      >
        {/* Top bar (visible on hover/select) */}
        <div
          style={{
            position: 'absolute',
            top: -1,
            left: 0,
            right: 0,
            height: '22px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 4px',
            background: isSelected ? app.andesBlue : app.surface,
            borderTopLeftRadius: '6px',
            borderTopRightRadius: '6px',
            borderBottom: `1px solid ${borderColor}`,
            opacity: isSelected ? 1 : 0,
            pointerEvents: isSelected ? 'auto' : 'none',
            transition: 'opacity 120ms',
            zIndex: 10,
          }}
        >
          {/* Drag handle + name */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '4px', flex: 1, overflow: 'hidden' }}
            {...listeners}
            {...attributes}
          >
            <GripVertical size={10} color="rgba(255,255,255,0.8)" />
            <span
              style={{
                fontFamily: 'var(--font-geist-sans)',
                fontSize: '10px',
                fontWeight: 600,
                color: 'white',
                letterSpacing: '0.04em',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {def?.name ?? node.componentId}
            </span>
          </div>

          {/* Delete */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeNode(node.id);
            }}
            style={{
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer',
              padding: '2px',
              display: 'flex',
              alignItems: 'center',
              color: 'white',
            }}
          >
            <Trash2 size={10} />
          </button>
        </div>

        {/* Actual component */}
        <div style={{ padding: isSelected ? '20px 0 0' : '0' }}>
          {andesElement}
        </div>

        {/* Violation badges */}
        {nodeViolations.length > 0 && (
          <div
            style={{
              position: 'absolute',
              bottom: '4px',
              right: '4px',
              display: 'flex',
              gap: '3px',
            }}
          >
            {nodeViolations.map((v) => (
              <div
                key={v.ruleId}
                title={v.message}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: v.severity === 'error' ? app.errorRed : app.warningYellow,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
