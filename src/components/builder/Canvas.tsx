'use client';

import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useCanvasStore } from '@/store/canvas-store';
import { CanvasNodeComponent } from './CanvasNode';
import { RuleViolation } from '@/types/rules';
import { app } from '@/data/tokens';
import { LayoutGrid } from 'lucide-react';

export const CANVAS_DROP_ID = 'canvas-root';

const ARTBOARD_W = 360;
const ARTBOARD_H = 800;

interface Props {
  violations: RuleViolation[];
}

export function Canvas({ violations }: Props) {
  const { nodes, selectNode, artboardLayout } = useCanvasStore();
  const { setNodeRef, isOver } = useDroppable({ id: CANVAS_DROP_ID });

  const isEmpty = nodes.length === 0;
  const artboardBg = isEmpty && !isOver ? '#C8C8C8' : '#FFFFFF';

  const isHorizontal = artboardLayout.direction === 'horizontal';

  return (
    // Workspace — dark dotted infinite background
    <div
      onClick={() => selectNode(null)}
      style={{
        flex: 1,
        minHeight: 0,
        overflowY: 'auto',
        overflowX: 'auto',
        background: app.bg,
        backgroundImage: `radial-gradient(circle, ${app.border} 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '48px 40px 48px',
      }}
    >
      {/* Artboard label */}
      <div
        style={{
          width: `${ARTBOARD_W}px`,
          display: 'flex',
          alignItems: 'baseline',
          gap: '8px',
          marginBottom: '8px',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-fraunces)',
            fontSize: '12px',
            fontWeight: 300,
            fontStyle: 'italic',
            color: app.textDim,
          }}
        >
          Mobile
        </span>
        <span
          style={{
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '10px',
            color: app.textDim,
            opacity: 0.6,
          }}
        >
          {ARTBOARD_W} × {ARTBOARD_H}
        </span>
      </div>

      {/* Artboard */}
      <div
        ref={setNodeRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: `${ARTBOARD_W}px`,
          minHeight: `${ARTBOARD_H}px`,
          flexShrink: 0,
          background: artboardBg,
          borderRadius: '4px',
          boxShadow: isOver
            ? `0 0 0 2px ${app.andesBlue}, 0 16px 48px rgba(0,0,0,0.5)`
            : '0 8px 40px rgba(0,0,0,0.45)',
          display: 'flex',
          flexDirection: 'column',
          transition: 'background 200ms, box-shadow 150ms',
          overflow: 'hidden',
        }}
      >
        {isEmpty ? (
          <EmptyArtboard isOver={isOver} />
        ) : (
          <SortableContext
            items={nodes.map((n) => n.id)}
            strategy={isHorizontal ? horizontalListSortingStrategy : verticalListSortingStrategy}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: isHorizontal ? 'row' : 'column',
                flexWrap: artboardLayout.wrap ? 'wrap' : 'nowrap',
                gap: `${artboardLayout.gap}px`,
                padding: `${artboardLayout.paddingV}px ${artboardLayout.paddingH}px`,
                alignItems: isHorizontal ? artboardLayout.alignItems : 'stretch',
                justifyContent: artboardLayout.justifyContent,
              }}
            >
              {nodes.map((node) => (
                <CanvasNodeComponent
                  key={node.id}
                  node={node}
                  violations={violations}
                />
              ))}
              <DropHint isOver={isOver} />
            </div>
          </SortableContext>
        )}
      </div>
    </div>
  );
}

function EmptyArtboard({ isOver }: { isOver: boolean }) {
  return (
    <div
      style={{
        flex: 1,
        minHeight: `${ARTBOARD_H}px`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '14px',
        transition: 'all 150ms',
      }}
    >
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '14px',
          border: `2px dashed ${isOver ? app.andesBlue : '#aaaaaa'}`,
          background: isOver ? app.andesBlueBg : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 150ms',
        }}
      >
        <LayoutGrid size={24} color={isOver ? app.andesBlue : '#aaaaaa'} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            fontFamily: 'var(--font-fraunces)',
            fontSize: '16px',
            fontWeight: 300,
            fontStyle: 'italic',
            color: isOver ? app.andesBlue : '#888888',
            marginBottom: '4px',
            transition: 'color 150ms',
          }}
        >
          {isOver ? 'Solte para adicionar' : 'Canvas vazio'}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-geist-sans)',
            fontSize: '12px',
            color: '#aaaaaa',
          }}
        >
          Arraste um componente da paleta para começar
        </div>
      </div>
    </div>
  );
}

function DropHint({ isOver }: { isOver: boolean }) {
  return (
    <div
      style={{
        height: '40px',
        border: `1.5px dashed ${isOver ? app.andesBlue : '#cccccc'}`,
        borderRadius: '8px',
        background: isOver ? app.andesBlueBg : 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-geist-sans)',
        fontSize: '12px',
        color: isOver ? app.andesBlue : '#999999',
        transition: 'all 150ms',
        flexShrink: 0,
      }}
    >
      {isOver ? '↓ Solte aqui' : 'Solte aqui para adicionar'}
    </div>
  );
}
