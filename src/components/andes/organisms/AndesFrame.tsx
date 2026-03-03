'use client';

import { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { CanvasNode } from '@/types/canvas';

interface Props {
  node: CanvasNode;
  children?: React.ReactNode;
}

export function AndesFrame({ node, children }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const { setNodeRef, isOver } = useDroppable({
    id: `into-frame-${node.id}`,
    data: { type: 'frame-interior', nodeId: node.id },
  });
  const direction = (node.props.direction as string) ?? 'vertical';
  const gap = (node.props.gap as number) ?? 12;
  const paddingH = (node.props.paddingH as number) ?? 16;
  const paddingV = (node.props.paddingV as number) ?? 16;
  const alignItems = (node.props.alignItems as string) ?? 'flex-start';
  const justifyContent = (node.props.justifyContent as string) ?? 'flex-start';
  const wrap = (node.props.wrap as boolean) ?? false;

  const isEmpty = node.children.length === 0;

  const showBorder = isOver || isHovered;

  return (
    <div
      ref={setNodeRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        flexDirection: direction === 'horizontal' ? 'row' : 'column',
        flexWrap: wrap ? 'wrap' : 'nowrap',
        gap: `${gap}px`,
        padding: `${paddingV}px ${paddingH}px`,
        alignItems,
        justifyContent,
        border: isOver
          ? '1.5px dashed #434ce4'
          : showBorder
          ? '1.5px dashed #cccccc'
          : '1.5px dashed transparent',
        borderRadius: '4px',
        minHeight: '64px',
        width: '100%',
        boxSizing: 'border-box',
        background: isOver ? 'rgba(67,76,228,0.05)' : 'transparent',
        transition: 'border-color 120ms, background 120ms',
      }}
    >
      {isEmpty ? (
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#aaaaaa',
            fontFamily: 'var(--font-geist-sans)',
            fontSize: '11px',
            minHeight: '32px',
          }}
        >
          Arraste componentes para cá
        </div>
      ) : (
        children
      )}
    </div>
  );
}
