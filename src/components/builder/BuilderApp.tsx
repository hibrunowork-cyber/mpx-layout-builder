'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import {
  DndContext,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useCanvasStore } from '@/store/canvas-store';
import { useCompositionRules } from '@/hooks/useCompositionRules';
import { Toolbar } from './Toolbar';
import { Canvas, CANVAS_DROP_ID } from './Canvas';
import { ComponentPalette } from '@/components/palette/ComponentPalette';
import { PropertyPanel } from '@/components/properties/PropertyPanel';
import { ScorePanel } from '@/components/feedback/ScorePanel';
import { app } from '@/data/tokens';
import { getComponent } from '@/data/components-catalog';
import { renderAndesComponent } from '@/components/andes/registry';
import { CanvasNode } from '@/types/canvas';

type ActiveDrag =
  | { origin: 'palette'; componentId: string }
  | { origin: 'canvas'; node: CanvasNode };

export function BuilderApp() {
  const { nodes, addNode, moveNode, reorderNodes, loadFromStorage } = useCanvasStore();
  const violations = useCompositionRules(nodes);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [activeDrag, setActiveDrag] = useState<ActiveDrag | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  // Load from localStorage on mount
  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCtrl = e.ctrlKey || e.metaKey;
      if (isCtrl && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        useCanvasStore.getState().undo();
      }
      if (isCtrl && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        useCanvasStore.getState().redo();
      }
      if (isCtrl && e.key === 'g') {
        e.preventDefault();
        useCanvasStore.getState().wrapInFrame();
      }
      if (e.key === 'Escape') {
        useCanvasStore.getState().selectNode(null);
      }
      if (e.key === 'Delete' || e.key === 'Backspace') {
        const { selectedId, selectedIds } = useCanvasStore.getState();
        const activeEl = document.activeElement?.tagName;
        if (activeEl === 'INPUT' || activeEl === 'SELECT' || activeEl === 'TEXTAREA') return;
        if (selectedIds.length > 0) {
          selectedIds.forEach((id) => useCanvasStore.getState().removeNode(id));
        } else if (selectedId) {
          useCanvasStore.getState().removeNode(selectedId);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const data = event.active.data.current;
    if (data?.origin === 'palette') {
      setActiveDrag({ origin: 'palette', componentId: data.componentId });
    } else if (data?.origin === 'canvas') {
      setActiveDrag({ origin: 'canvas', node: data.node });
    }
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setActiveDrag(null);
      const { active, over } = event;
      if (!over) return;

      const activeData = active.data.current;
      const overIdStr = String(over.id);

      // Drop into a Frame interior
      if (overIdStr.startsWith('into-frame-')) {
        const parentId = overIdStr.replace('into-frame-', '');
        if (activeData?.origin === 'palette') {
          addNode(activeData.componentId, parentId);
          return;
        }
        if (activeData?.origin === 'canvas' && String(active.id) !== parentId) {
          moveNode(String(active.id), parentId);
          return;
        }
        return;
      }

      // Palette → Canvas: add new component
      if (activeData?.origin === 'palette') {
        addNode(activeData.componentId);
        return;
      }

      // Canvas → Canvas reorder (root level)
      if (activeData?.origin === 'canvas' && active.id !== over.id) {
        const overIsCanvas = over.id === CANVAS_DROP_ID;
        const oldIndex = nodes.findIndex((n) => n.id === active.id);
        if (oldIndex === -1) return;

        const newIndex = overIsCanvas
          ? nodes.length - 1
          : nodes.findIndex((n) => n.id === over.id);

        if (newIndex !== -1 && oldIndex !== newIndex) {
          const reordered = arrayMove(nodes, oldIndex, newIndex);
          reorderNodes(reordered);
        }
      }
    },
    [addNode, moveNode, nodes, reorderNodes]
  );

  // Build overlay content
  let overlayContent: React.ReactNode = null;
  if (activeDrag) {
    const fakeNode =
      activeDrag.origin === 'palette'
        ? {
            id: '__preview__',
            componentId: activeDrag.componentId,
            props: Object.fromEntries(
              (getComponent(activeDrag.componentId)?.props ?? []).map((p) => [p.name, p.default])
            ),
            variant: Object.fromEntries(
              (getComponent(activeDrag.componentId)?.variants ?? []).map((v) => [v.name, v.default])
            ),
            children: [],
            parentId: null,
            order: 0,
          }
        : activeDrag.node;

    overlayContent = (
      <div
        style={{
          opacity: 0.9,
          pointerEvents: 'none',
          maxWidth: '400px',
          minWidth: '200px',
          padding: '10px',
          border: `2px dashed ${app.andesBlue}`,
          borderRadius: '8px',
          background: app.andesBlueBg,
          boxShadow: `0 8px 32px rgba(0,158,227,0.2)`,
        }}
      >
        {renderAndesComponent(fakeNode as CanvasNode)}
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          overflow: 'hidden',
          background: app.bg,
        }}
      >
        <Toolbar canvasRef={canvasRef} />

        <div style={{ flex: 1, display: 'flex', overflow: 'hidden', minHeight: 0 }}>
          <ComponentPalette />

          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div
              ref={canvasRef}
              style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
            >
              <Canvas violations={violations} />
            </div>
            <ScorePanel violations={violations} />
          </div>

          <PropertyPanel />
        </div>
      </div>

      <DragOverlay dropAnimation={{ duration: 150, easing: 'ease' }}>
        {overlayContent}
      </DragOverlay>
    </DndContext>
  );
}
