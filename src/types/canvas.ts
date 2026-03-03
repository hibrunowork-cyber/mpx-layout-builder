export interface ArtboardLayout {
  direction: 'vertical' | 'horizontal';
  gap: number;
  paddingV: number;
  paddingH: number;
  alignItems: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  justifyContent: 'flex-start' | 'center' | 'flex-end' | 'space-between';
  wrap: boolean;
}

export interface CanvasNode {
  id: string;
  componentId: string;
  props: Record<string, unknown>;
  variant: Record<string, string>;
  children: CanvasNode[];
  slotName?: string;
  parentId: string | null;
  order: number;
}

export interface HistoryEntry {
  nodes: CanvasNode[];
  selectedId: string | null;
  artboardLayout?: ArtboardLayout;
}

export interface CanvasState {
  nodes: CanvasNode[];
  selectedId: string | null;
  selectedIds: string[];
  history: HistoryEntry[];
  historyIndex: number;
  artboardLayout: ArtboardLayout;

  // Actions
  addNode: (componentId: string, parentId?: string, slotName?: string) => void;
  removeNode: (id: string) => void;
  moveNode: (id: string, targetParentId: string | null, slotName?: string, newOrder?: number) => void;
  reorderNodes: (ordered: CanvasNode[]) => void;
  updateProps: (id: string, props: Partial<Record<string, unknown>>) => void;
  updateVariant: (id: string, variant: Partial<Record<string, string>>) => void;
  updateArtboardLayout: (partial: Partial<ArtboardLayout>) => void;
  selectNode: (id: string | null) => void;
  toggleSelectNode: (id: string) => void;
  wrapInFrame: () => void;
  shuffle: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  clear: () => void;
  loadFromStorage: () => void;
}
