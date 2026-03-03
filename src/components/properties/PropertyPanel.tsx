'use client';

import { useCanvasStore } from '@/store/canvas-store';
import { ArtboardLayout } from '@/types/canvas';
import { getComponent } from '@/data/components-catalog';
import { PropField } from './PropField';
import { app } from '@/data/tokens';
import { Settings2, LayoutGrid, Frame } from 'lucide-react';

// ─── Layout Panel ─────────────────────────────────────────────────────────────

interface LayoutPanelProps {
  layout: ArtboardLayout;
  onChange: (partial: Partial<ArtboardLayout>) => void;
}

function LayoutPanel({ layout, onChange }: LayoutPanelProps) {
  const btnBase: React.CSSProperties = {
    fontFamily: 'var(--font-geist-sans)',
    fontSize: '11px',
    padding: '3px 8px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 120ms',
    border: `1px solid ${app.border}`,
  };

  const btnActive = (active: boolean): React.CSSProperties => ({
    ...btnBase,
    background: active ? app.andesBlueBg : app.surface,
    color: active ? app.andesBlue : app.textMuted,
    borderColor: active ? app.andesBlue : app.border,
    fontWeight: active ? 600 : 400,
  });

  const rowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '10px',
    gap: '8px',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-geist-sans)',
    fontSize: '11px',
    color: app.textDim,
    flexShrink: 0,
  };

  const inputStyle: React.CSSProperties = {
    fontFamily: 'var(--font-geist-mono)',
    fontSize: '11px',
    background: app.surface,
    border: `1px solid ${app.border}`,
    borderRadius: '4px',
    color: app.text,
    padding: '3px 6px',
    width: '52px',
    textAlign: 'right',
  };

  const alignOptions: { value: ArtboardLayout['alignItems']; label: string }[] = [
    { value: 'flex-start', label: 'Início' },
    { value: 'center',     label: 'Centro' },
    { value: 'flex-end',   label: 'Fim' },
    { value: 'stretch',    label: 'Fill' },
  ];

  const justifyOptions: { value: ArtboardLayout['justifyContent']; label: string }[] = [
    { value: 'flex-start',    label: 'Início' },
    { value: 'center',        label: 'Centro' },
    { value: 'flex-end',      label: 'Fim' },
    { value: 'space-between', label: 'Entre' },
  ];

  return (
    <section style={{ marginBottom: '4px' }}>
      <div
        style={{
          fontFamily: 'var(--font-geist-sans)',
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '0.08em',
          color: app.accent,
          textTransform: 'uppercase',
          marginBottom: '12px',
        }}
      >
        Auto-layout
      </div>

      {/* Direction */}
      <div style={rowStyle}>
        <span style={labelStyle}>Direção</span>
        <div style={{ display: 'flex', gap: '4px' }}>
          <button
            style={btnActive(layout.direction === 'horizontal')}
            onClick={() => onChange({ direction: 'horizontal' })}
          >
            → H
          </button>
          <button
            style={btnActive(layout.direction === 'vertical')}
            onClick={() => onChange({ direction: 'vertical' })}
          >
            ↓ V
          </button>
        </div>
      </div>

      {/* Gap */}
      <div style={rowStyle}>
        <span style={labelStyle}>Gap</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <input
            type="number"
            min={0}
            max={200}
            value={layout.gap}
            onChange={(e) => onChange({ gap: Number(e.target.value) })}
            style={inputStyle}
          />
          <span style={{ ...labelStyle, opacity: 0.6 }}>px</span>
        </div>
      </div>

      {/* Padding H / V */}
      <div style={rowStyle}>
        <span style={labelStyle}>Padding</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ ...labelStyle, opacity: 0.6 }}>H</span>
          <input
            type="number"
            min={0}
            max={200}
            value={layout.paddingH}
            onChange={(e) => onChange({ paddingH: Number(e.target.value) })}
            style={{ ...inputStyle, width: '44px' }}
          />
          <span style={{ ...labelStyle, opacity: 0.6 }}>V</span>
          <input
            type="number"
            min={0}
            max={200}
            value={layout.paddingV}
            onChange={(e) => onChange({ paddingV: Number(e.target.value) })}
            style={{ ...inputStyle, width: '44px' }}
          />
        </div>
      </div>

      {/* Align items */}
      <div style={{ marginBottom: '10px' }}>
        <div style={{ ...labelStyle, marginBottom: '6px' }}>Align</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {alignOptions.map((opt) => (
            <button
              key={opt.value}
              style={btnActive(layout.alignItems === opt.value)}
              onClick={() => onChange({ alignItems: opt.value })}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Justify content */}
      <div style={{ marginBottom: '10px' }}>
        <div style={{ ...labelStyle, marginBottom: '6px' }}>Justify</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {justifyOptions.map((opt) => (
            <button
              key={opt.value}
              style={btnActive(layout.justifyContent === opt.value)}
              onClick={() => onChange({ justifyContent: opt.value })}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Wrap */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <input
          type="checkbox"
          id="layout-wrap"
          checked={layout.wrap}
          onChange={(e) => onChange({ wrap: e.target.checked })}
          style={{ cursor: 'pointer', accentColor: app.andesBlue }}
        />
        <label
          htmlFor="layout-wrap"
          style={{ ...labelStyle, cursor: 'pointer' }}
        >
          Wrap (quebrar linha)
        </label>
      </div>
    </section>
  );
}

// ─── Property Panel ───────────────────────────────────────────────────────────

export function PropertyPanel() {
  const { nodes, selectedId, selectedIds, updateProps, updateVariant, artboardLayout, updateArtboardLayout, wrapInFrame } = useCanvasStore();

  function findNode(arr: typeof nodes, id: string): (typeof nodes)[0] | undefined {
    for (const n of arr) {
      if (n.id === id) return n;
      const found = findNode(n.children, id);
      if (found) return found;
    }
    return undefined;
  }

  const selectedNode = selectedId ? findNode(nodes, selectedId) : null;
  const def = selectedNode ? getComponent(selectedNode.componentId) : null;
  const isFrame = selectedNode?.componentId === 'frame';

  // ── Multi-seleção ──────────────────────────────────────────────────────────
  if (selectedIds.length >= 2) {
    return (
      <aside
        style={{
          width: '240px',
          minWidth: '240px',
          background: app.bg,
          borderLeft: `1px solid ${app.border}`,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '14px 16px 12px',
            borderBottom: `1px solid ${app.border}`,
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
            <Frame size={14} color="#a78bfa" />
            <span
              style={{
                fontFamily: 'var(--font-geist-sans)',
                fontSize: '13px',
                fontWeight: 600,
                color: app.text,
              }}
            >
              {selectedIds.length} selecionados
            </span>
          </div>
        </div>

        {/* Ação principal */}
        <div style={{ padding: '12px 16px', borderBottom: `1px solid ${app.border}` }}>
          <button
            onClick={wrapInFrame}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '8px 12px',
              background: '#a78bfa22',
              border: '1px solid #a78bfa',
              borderRadius: '6px',
              color: '#a78bfa',
              fontFamily: 'var(--font-geist-sans)',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 120ms',
            }}
          >
            <Frame size={12} />
            Agrupar em Frame
          </button>
          <div
            style={{
              fontFamily: 'var(--font-geist-sans)',
              fontSize: '10px',
              color: app.textDim,
              textAlign: 'center',
              marginTop: '6px',
            }}
          >
            atalho: Ctrl+G
          </div>
        </div>

        {/* Lista de componentes selecionados */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 16px' }}>
          {selectedIds.map((id) => {
            const node = findNode(nodes, id);
            const compDef = node ? getComponent(node.componentId) : null;
            return (
              <div
                key={id}
                style={{
                  fontFamily: 'var(--font-geist-sans)',
                  fontSize: '11px',
                  color: app.textMuted,
                  padding: '4px 0',
                  borderBottom: `1px solid ${app.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <div
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#a78bfa',
                    flexShrink: 0,
                  }}
                />
                {compDef?.name ?? id}
              </div>
            );
          })}
        </div>
      </aside>
    );
  }

  // ── Nothing selected → artboard layout panel ──────────────────────────────
  if (!selectedNode || !def) {
    return (
      <aside
        style={{
          width: '240px',
          minWidth: '240px',
          background: app.bg,
          borderLeft: `1px solid ${app.border}`,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '14px 16px 12px',
            borderBottom: `1px solid ${app.border}`,
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
            <LayoutGrid size={14} color={app.textDim} />
            <span
              style={{
                fontFamily: 'var(--font-geist-sans)',
                fontSize: '13px',
                fontWeight: 600,
                color: app.text,
              }}
            >
              Artboard
            </span>
          </div>
          <div style={{ fontFamily: 'var(--font-geist-sans)', fontSize: '11px', color: app.textDim }}>
            Mobile · 360 × 800
          </div>
        </div>

        {/* Layout controls */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px' }}>
          <LayoutPanel
            layout={artboardLayout}
            onChange={updateArtboardLayout}
          />
        </div>
      </aside>
    );
  }

  // ── Frame selected → layout controls + optional props ─────────────────────
  if (isFrame) {
    const frameLayout: ArtboardLayout = {
      direction: (selectedNode.props.direction as ArtboardLayout['direction']) ?? 'vertical',
      gap: (selectedNode.props.gap as number) ?? 12,
      paddingH: (selectedNode.props.paddingH as number) ?? 16,
      paddingV: (selectedNode.props.paddingV as number) ?? 16,
      alignItems: (selectedNode.props.alignItems as ArtboardLayout['alignItems']) ?? 'flex-start',
      justifyContent: (selectedNode.props.justifyContent as ArtboardLayout['justifyContent']) ?? 'flex-start',
      wrap: (selectedNode.props.wrap as boolean) ?? false,
    };

    return (
      <aside
        style={{
          width: '240px',
          minWidth: '240px',
          background: app.bg,
          borderLeft: `1px solid ${app.border}`,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '14px 16px 12px',
            borderBottom: `1px solid ${app.border}`,
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
            <Settings2 size={14} color={app.andesBlue} />
            <span
              style={{
                fontFamily: 'var(--font-geist-sans)',
                fontSize: '13px',
                fontWeight: 600,
                color: app.text,
              }}
            >
              Frame
            </span>
          </div>
          <div style={{ fontFamily: 'var(--font-geist-sans)', fontSize: '11px', color: app.textDim }}>
            ID: {selectedNode.id}
          </div>
        </div>

        {/* Layout controls */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px' }}>
          <LayoutPanel
            layout={frameLayout}
            onChange={(partial) => updateProps(selectedNode.id, partial as Partial<Record<string, unknown>>)}
          />
        </div>
      </aside>
    );
  }

  // ── Regular component selected ─────────────────────────────────────────────
  return (
    <aside
      style={{
        width: '240px',
        minWidth: '240px',
        background: app.bg,
        borderLeft: `1px solid ${app.border}`,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '14px 16px 12px',
          borderBottom: `1px solid ${app.border}`,
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
          <Settings2 size={14} color={app.andesBlue} />
          <span
            style={{
              fontFamily: 'var(--font-geist-sans)',
              fontSize: '13px',
              fontWeight: 600,
              color: app.text,
            }}
          >
            {def.name}
          </span>
        </div>
        <div
          style={{
            fontFamily: 'var(--font-geist-sans)',
            fontSize: '11px',
            color: app.textDim,
          }}
        >
          ID: {selectedNode.id}
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px' }}>

        {/* Variants */}
        {def.variants.length > 0 && (
          <section style={{ marginBottom: '20px' }}>
            <div
              style={{
                fontFamily: 'var(--font-geist-sans)',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                color: app.accent,
                textTransform: 'uppercase',
                marginBottom: '10px',
              }}
            >
              Variantes
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {def.variants.map((v) => (
                <div key={v.name}>
                  <div
                    style={{
                      fontFamily: 'var(--font-geist-sans)',
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '0.05em',
                      color: app.textDim,
                      textTransform: 'uppercase',
                      marginBottom: '6px',
                    }}
                  >
                    {v.label}
                  </div>
                  {/* Variant chips */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {v.options.map((opt) => {
                      const isActive = (selectedNode.variant[v.name] ?? v.default) === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => updateVariant(selectedNode.id, { [v.name]: opt.value })}
                          style={{
                            fontFamily: 'var(--font-geist-sans)',
                            fontSize: '11px',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            border: `1px solid ${isActive ? app.andesBlue : app.border}`,
                            background: isActive ? app.andesBlueBg : app.surface,
                            color: isActive ? app.andesBlue : app.textMuted,
                            cursor: 'pointer',
                            transition: 'all 120ms',
                            fontWeight: isActive ? 600 : 400,
                          }}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Props */}
        {def.props.length > 0 && (
          <section>
            <div
              style={{
                fontFamily: 'var(--font-geist-sans)',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                color: app.accent,
                textTransform: 'uppercase',
                marginBottom: '10px',
              }}
            >
              Propriedades
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {def.props.map((prop) => (
                <PropField
                  key={prop.name}
                  def={prop}
                  value={selectedNode.props[prop.name]}
                  onChange={(val) => updateProps(selectedNode.id, { [prop.name]: val })}
                />
              ))}
            </div>
          </section>
        )}

        {def.props.length === 0 && def.variants.length === 0 && (
          <div
            style={{
              fontFamily: 'var(--font-geist-sans)',
              fontSize: '12px',
              color: app.textDim,
              textAlign: 'center',
              padding: '16px 0',
            }}
          >
            Sem propriedades configuráveis
          </div>
        )}
      </div>
    </aside>
  );
}
