'use client';

import { useDraggable } from '@dnd-kit/core';
import { ComponentDefinition } from '@/types/catalog';
import { CanvasNode } from '@/types/canvas';
import { app } from '@/data/tokens';
import { renderAndesComponent } from '@/components/andes/registry';
import { GripVertical } from 'lucide-react';

interface Props {
  component: ComponentDefinition;
}

const CATEGORY_COLOR: Record<string, string> = {
  atoms: app.andesBlue,
  molecules: app.accent,
  organisms: '#a78bfa',
};

// Escala de renderização por componente (coluna única, cards ~200px de largura)
// Inline: centralizados sem scale. Full-width: escala para caber nos 68px de altura.
const PREVIEW_SCALE: Record<string, number> = {
  // Atoms
  button:          1,
  badge:           1,
  typography:      1,
  tag:             1,
  thumbnail:       1,
  'radio-button':  1,
  'money-amount':  1,
  // Molecules
  checkbox:        1,
  progress:        1,
  pagination:      1,
  switch:          0.9,
  'list-row':      0.72,
  dropdown:        0.72,
  'amount-field':  0.72,
  textfield:       0.72,
  searchbar:       0.72,
  accordion:       0.72,
  // Organisms
  frame:           0.65,
  header:          0.7,
  'fixed-footer':  0.65,
  tabs:            0.7,
  onboarding:      0.6,
  snackbar:        0.65,
  card:            0.6,
  list:            0.65,
  'bottom-sheet':  0.55,
};

// Largura base (em px) usada para calcular transform-origin
const PREVIEW_BASE_WIDTH = 200;

function buildPreviewNode(component: ComponentDefinition): CanvasNode {
  return {
    id: `__preview_${component.id}__`,
    componentId: component.id,
    props: Object.fromEntries(component.props.map((p) => [p.name, p.default])),
    variant: Object.fromEntries(component.variants.map((v) => [v.name, v.default])),
    children: [],
    parentId: null,
    order: 0,
  };
}

export function PaletteItem({ component }: Props) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${component.id}`,
    data: { origin: 'palette', componentId: component.id },
  });

  const dot = CATEGORY_COLOR[component.category] ?? app.andesBlue;
  const scale = PREVIEW_SCALE[component.id] ?? 0.8;
  const previewNode = buildPreviewNode(component);
  const rendered = renderAndesComponent(previewNode);

  // Componentes inline são centralizados sem absolute positioning
  const isInline = [
    'button', 'badge', 'typography', 'tag', 'thumbnail',
    'radio-button', 'money-amount', 'checkbox', 'progress', 'pagination',
  ].includes(component.id);

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        borderRadius: '8px',
        border: `1px solid ${isDragging ? app.andesBlue : app.border}`,
        background: isDragging ? app.andesBlueBg : app.surface,
        cursor: 'grab',
        opacity: isDragging ? 0.4 : 1,
        transition: 'border-color 120ms, background 120ms, opacity 120ms',
        userSelect: 'none',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ── Preview area ── */}
      <div
        style={{
          height: '68px',
          background: '#F6F5F2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: isInline ? 'center' : 'flex-start',
          overflow: 'hidden',
          padding: isInline ? '8px' : '0',
          position: 'relative',
        }}
      >
        {isInline ? (
          // Componentes inline: só renderiza no centro sem scale
          <div style={{ pointerEvents: 'none', maxWidth: '100%' }}>
            {rendered}
          </div>
        ) : (
          // Componentes full-width: scale + transform-origin top-left
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: `${PREVIEW_BASE_WIDTH}px`,
              transformOrigin: 'top left',
              transform: `scale(${scale})`,
              pointerEvents: 'none',
            }}
          >
            {rendered}
          </div>
        )}
      </div>

      {/* ── Name bar ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '5px 8px',
          borderTop: `1px solid ${app.border}`,
        }}
      >
        <GripVertical size={10} color={app.textDim} style={{ flexShrink: 0 }} />
        <div
          style={{
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            background: dot,
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-geist-sans)',
            fontSize: '11px',
            fontWeight: 500,
            color: app.textMuted,
            flex: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {component.name}
        </span>
      </div>
    </div>
  );
}
