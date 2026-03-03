'use client';

import { create } from 'zustand';
import { produce } from 'immer';
import { nanoid } from 'nanoid';
import { ArtboardLayout, CanvasNode, CanvasState, HistoryEntry } from '@/types/canvas';
import { getComponent } from '@/data/components-catalog';
import { getRandomTemplate } from '@/data/layout-templates';

const STORAGE_KEY = 'mpx-layout-builder-canvas';
const MAX_HISTORY = 50;

export const ARTBOARD_LAYOUT_DEFAULT: ArtboardLayout = {
  direction: 'vertical',
  gap: 12,
  paddingV: 16,
  paddingH: 16,
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  wrap: false,
};

function getDefaultProps(componentId: string): Record<string, unknown> {
  const def = getComponent(componentId);
  if (!def) return {};
  return Object.fromEntries(def.props.map((p) => [p.name, p.default]));
}

function getDefaultVariants(componentId: string): Record<string, string> {
  const def = getComponent(componentId);
  if (!def) return {};
  return Object.fromEntries(def.variants.map((v) => [v.name, v.default]));
}

function flattenNodes(nodes: CanvasNode[]): CanvasNode[] {
  const result: CanvasNode[] = [];
  function walk(arr: CanvasNode[]) {
    for (const node of arr) {
      result.push(node);
      if (node.children.length > 0) walk(node.children);
    }
  }
  walk(nodes);
  return result;
}

function findNode(nodes: CanvasNode[], id: string): CanvasNode | undefined {
  return flattenNodes(nodes).find((n) => n.id === id);
}

function removeNodeById(nodes: CanvasNode[], id: string): CanvasNode[] {
  return nodes
    .filter((n) => n.id !== id)
    .map((n) => ({ ...n, children: removeNodeById(n.children, id) }));
}

function updateNodeInTree(
  nodes: CanvasNode[],
  id: string,
  updater: (node: CanvasNode) => CanvasNode
): CanvasNode[] {
  return nodes.map((n) => {
    if (n.id === id) return updater(n);
    return { ...n, children: updateNodeInTree(n.children, id, updater) };
  });
}

function saveToStorage(nodes: CanvasNode[], artboardLayout: ArtboardLayout) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ nodes, artboardLayout }));
  } catch {
    // ignore
  }
}

export const useCanvasStore = create<CanvasState>((set, get) => ({
  nodes: [],
  selectedId: null,
  selectedIds: [],
  history: [],
  historyIndex: -1,
  artboardLayout: ARTBOARD_LAYOUT_DEFAULT,

  addNode: (componentId, parentId, slotName) => {
    set(
      produce((state: CanvasState) => {
        const def = getComponent(componentId);
        if (!def) return;

        const newNode: CanvasNode = {
          id: nanoid(8),
          componentId,
          props: getDefaultProps(componentId),
          variant: getDefaultVariants(componentId),
          children: [],
          slotName: slotName ?? undefined,
          parentId: parentId ?? null,
          order: 0,
        };

        if (!parentId) {
          newNode.order = state.nodes.length;
          state.nodes.push(newNode);
        } else {
          const parent = findNode(state.nodes, parentId);
          if (!parent) return;

          // Get slot definition to validate
          const slot = def ? undefined : undefined;
          void slot;

          newNode.order = parent.children.filter((c) => c.slotName === slotName).length;
          state.nodes = updateNodeInTree(state.nodes, parentId, (p) => ({
            ...p,
            children: [...p.children, newNode],
          }));
        }

        state.selectedId = newNode.id;

        const snapshot: HistoryEntry = {
          nodes: JSON.parse(JSON.stringify(state.nodes)),
          selectedId: newNode.id,
          artboardLayout: JSON.parse(JSON.stringify(state.artboardLayout)),
        };
        state.history = state.history.slice(0, state.historyIndex + 1);
        state.history.push(snapshot);
        if (state.history.length > MAX_HISTORY) {
          state.history.shift();
        } else {
          state.historyIndex++;
        }

        saveToStorage(state.nodes, state.artboardLayout);
      })
    );
  },

  removeNode: (id) => {
    set(
      produce((state: CanvasState) => {
        state.nodes = removeNodeById(state.nodes, id);
        if (state.selectedId === id) state.selectedId = null;

        const snapshot: HistoryEntry = {
          nodes: JSON.parse(JSON.stringify(state.nodes)),
          selectedId: state.selectedId,
          artboardLayout: JSON.parse(JSON.stringify(state.artboardLayout)),
        };
        state.history = state.history.slice(0, state.historyIndex + 1);
        state.history.push(snapshot);
        if (state.history.length > MAX_HISTORY) {
          state.history.shift();
        } else {
          state.historyIndex++;
        }

        saveToStorage(state.nodes, state.artboardLayout);
      })
    );
  },

  moveNode: (id, targetParentId, slotName, newOrder) => {
    set(
      produce((state: CanvasState) => {
        const node = findNode(state.nodes, id);
        if (!node) return;

        // Remove from current position
        state.nodes = removeNodeById(state.nodes, id);

        const movedNode: CanvasNode = {
          ...node,
          parentId: targetParentId,
          slotName,
          order: newOrder ?? 0,
        };

        if (!targetParentId) {
          state.nodes.push(movedNode);
          // Re-sort root nodes
          state.nodes = state.nodes.map((n, i) => ({ ...n, order: i }));
        } else {
          state.nodes = updateNodeInTree(state.nodes, targetParentId, (p) => ({
            ...p,
            children: [...p.children, movedNode],
          }));
        }

        const snapshot: HistoryEntry = {
          nodes: JSON.parse(JSON.stringify(state.nodes)),
          selectedId: state.selectedId,
          artboardLayout: JSON.parse(JSON.stringify(state.artboardLayout)),
        };
        state.history = state.history.slice(0, state.historyIndex + 1);
        state.history.push(snapshot);
        if (state.history.length > MAX_HISTORY) {
          state.history.shift();
        } else {
          state.historyIndex++;
        }

        saveToStorage(state.nodes, state.artboardLayout);
      })
    );
  },

  reorderNodes: (ordered) => {
    set(
      produce((state: CanvasState) => {
        state.nodes = ordered.map((n, i) => ({ ...n, order: i }));
        const snapshot: HistoryEntry = {
          nodes: JSON.parse(JSON.stringify(state.nodes)),
          selectedId: state.selectedId,
          artboardLayout: JSON.parse(JSON.stringify(state.artboardLayout)),
        };
        state.history = state.history.slice(0, state.historyIndex + 1);
        state.history.push(snapshot);
        if (state.history.length > MAX_HISTORY) {
          state.history.shift();
        } else {
          state.historyIndex++;
        }
        saveToStorage(state.nodes, state.artboardLayout);
      })
    );
  },

  updateProps: (id, props) => {
    set(
      produce((state: CanvasState) => {
        state.nodes = updateNodeInTree(state.nodes, id, (n) => ({
          ...n,
          props: { ...n.props, ...props },
        }));
        saveToStorage(state.nodes, state.artboardLayout);
      })
    );
  },

  updateVariant: (id, variant) => {
    set(
      produce((state: CanvasState) => {
        state.nodes = updateNodeInTree(state.nodes, id, (n) => ({
          ...n,
          variant: { ...n.variant, ...(variant as Record<string, string>) },
        }));
        saveToStorage(state.nodes, state.artboardLayout);
      })
    );
  },

  updateArtboardLayout: (partial) => {
    set(
      produce((state: CanvasState) => {
        state.artboardLayout = { ...state.artboardLayout, ...partial };

        const snapshot: HistoryEntry = {
          nodes: JSON.parse(JSON.stringify(state.nodes)),
          selectedId: state.selectedId,
          artboardLayout: JSON.parse(JSON.stringify(state.artboardLayout)),
        };
        state.history = state.history.slice(0, state.historyIndex + 1);
        state.history.push(snapshot);
        if (state.history.length > MAX_HISTORY) {
          state.history.shift();
        } else {
          state.historyIndex++;
        }

        saveToStorage(state.nodes, state.artboardLayout);
      })
    );
  },

  selectNode: (id) => {
    set({ selectedId: id, selectedIds: [] });
  },

  toggleSelectNode: (id) => {
    set(
      produce((state: CanvasState) => {
        const combined = new Set([
          ...state.selectedIds,
          ...(state.selectedId ? [state.selectedId] : []),
        ]);
        if (combined.has(id)) {
          combined.delete(id);
        } else {
          combined.add(id);
        }
        const arr = Array.from(combined);
        if (arr.length === 1) {
          state.selectedId = arr[0];
          state.selectedIds = [];
        } else {
          state.selectedId = null;
          state.selectedIds = arr;
        }
      })
    );
  },

  wrapInFrame: () => {
    set(
      produce((state: CanvasState) => {
        if (state.selectedIds.length < 2) return;

        // Only wrap root-level nodes
        const rootIds = new Set(state.nodes.map((n) => n.id));
        const toWrapIds = state.selectedIds.filter((id) => rootIds.has(id));
        if (toWrapIds.length < 2) return;

        const toWrapSet = new Set(toWrapIds);

        // Collect nodes to wrap in original order
        const toWrapNodes = state.nodes.filter((n) => toWrapSet.has(n.id));

        const frameId = nanoid(8);
        const frameNode: CanvasNode = {
          id: frameId,
          componentId: 'frame',
          props: {
            direction: 'vertical',
            gap: 12,
            paddingH: 16,
            paddingV: 16,
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            wrap: false,
          },
          variant: {},
          children: toWrapNodes.map((n, i) => ({ ...n, parentId: frameId, order: i })),
          parentId: null,
          order: 0,
        };

        // Rebuild root nodes: replace first selected with frame, skip the rest
        const result: CanvasNode[] = [];
        let frameInserted = false;
        for (const node of state.nodes) {
          if (toWrapSet.has(node.id)) {
            if (!frameInserted) {
              result.push(frameNode);
              frameInserted = true;
            }
          } else {
            result.push(node);
          }
        }
        state.nodes = result.map((n, i) => ({ ...n, order: i }));
        state.selectedId = frameId;
        state.selectedIds = [];

        const snapshot: HistoryEntry = {
          nodes: JSON.parse(JSON.stringify(state.nodes)),
          selectedId: frameId,
          artboardLayout: JSON.parse(JSON.stringify(state.artboardLayout)),
        };
        state.history = state.history.slice(0, state.historyIndex + 1);
        state.history.push(snapshot);
        if (state.history.length > MAX_HISTORY) {
          state.history.shift();
        } else {
          state.historyIndex++;
        }

        saveToStorage(state.nodes, state.artboardLayout);
      })
    );
  },

  shuffle: () => {
    set(
      produce((state: CanvasState) => {
        const template = getRandomTemplate();
        const newNodes = template.buildNodes();
        state.nodes = newNodes;
        state.selectedId = null;
        state.selectedIds = [];

        const snapshot: HistoryEntry = {
          nodes: JSON.parse(JSON.stringify(newNodes)),
          selectedId: null,
          artboardLayout: JSON.parse(JSON.stringify(state.artboardLayout)),
        };
        state.history = state.history.slice(0, state.historyIndex + 1);
        state.history.push(snapshot);
        if (state.history.length > MAX_HISTORY) {
          state.history.shift();
        } else {
          state.historyIndex++;
        }

        saveToStorage(newNodes, state.artboardLayout);
      })
    );
  },

  undo: () => {
    set(
      produce((state: CanvasState) => {
        if (state.historyIndex <= 0) return;
        state.historyIndex--;
        const entry = state.history[state.historyIndex];
        state.nodes = JSON.parse(JSON.stringify(entry.nodes));
        state.selectedId = entry.selectedId;
        state.selectedIds = [];
        if (entry.artboardLayout) {
          state.artboardLayout = JSON.parse(JSON.stringify(entry.artboardLayout));
        }
        saveToStorage(state.nodes, state.artboardLayout);
      })
    );
  },

  redo: () => {
    set(
      produce((state: CanvasState) => {
        if (state.historyIndex >= state.history.length - 1) return;
        state.historyIndex++;
        const entry = state.history[state.historyIndex];
        state.nodes = JSON.parse(JSON.stringify(entry.nodes));
        state.selectedId = entry.selectedId;
        state.selectedIds = [];
        if (entry.artboardLayout) {
          state.artboardLayout = JSON.parse(JSON.stringify(entry.artboardLayout));
        }
        saveToStorage(state.nodes, state.artboardLayout);
      })
    );
  },

  canUndo: () => get().historyIndex > 0,
  canRedo: () => get().historyIndex < get().history.length - 1,

  clear: () => {
    set({
      nodes: [],
      selectedId: null,
      selectedIds: [],
      history: [],
      historyIndex: -1,
      artboardLayout: ARTBOARD_LAYOUT_DEFAULT,
    });
    saveToStorage([], ARTBOARD_LAYOUT_DEFAULT);
  },

  loadFromStorage: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Handle both old format (array) and new format (object)
        if (Array.isArray(parsed)) {
          set({ nodes: parsed, history: [], historyIndex: -1 });
        } else {
          set({
            nodes: parsed.nodes ?? [],
            artboardLayout: parsed.artboardLayout ?? ARTBOARD_LAYOUT_DEFAULT,
            history: [],
            historyIndex: -1,
          });
        }
      }
    } catch {
      // ignore
    }
  },
}));
