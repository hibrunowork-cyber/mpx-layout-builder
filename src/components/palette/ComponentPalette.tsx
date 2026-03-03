'use client';

import { useState, useMemo } from 'react';
import { COMPONENTS_CATALOG } from '@/data/components-catalog';
import { PaletteItem } from './PaletteItem';
import { app } from '@/data/tokens';
import { Search, X } from 'lucide-react';
import { ComponentCategory } from '@/types/catalog';

const CATEGORY_LABELS: Record<ComponentCategory, string> = {
  atoms: 'Atoms',
  molecules: 'Molecules',
  organisms: 'Organisms',
};

const CATEGORY_ORDER: ComponentCategory[] = ['atoms', 'molecules', 'organisms'];

export function ComponentPalette() {
  const [query, setQuery] = useState('');

  const grouped = useMemo(() => {
    const q = query.toLowerCase().trim();
    const filtered = q
      ? COMPONENTS_CATALOG.filter(
          (c) =>
            c.name.toLowerCase().includes(q) ||
            c.tags.some((t) => t.includes(q))
        )
      : COMPONENTS_CATALOG;

    const result: Partial<Record<ComponentCategory, typeof filtered>> = {};
    for (const cat of CATEGORY_ORDER) {
      const items = filtered.filter((c) => c.category === cat);
      if (items.length > 0) result[cat] = items;
    }
    return result;
  }, [query]);

  const categoryColors: Record<ComponentCategory, string> = {
    atoms: app.andesBlue,
    molecules: app.accent,
    organisms: '#a78bfa',
  };

  return (
    <aside
      style={{
        width: '224px',
        minWidth: '224px',
        background: app.bg,
        borderRight: `1px solid ${app.border}`,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '16px 16px 12px',
          borderBottom: `1px solid ${app.border}`,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-fraunces)',
            fontSize: '14px',
            fontWeight: 300,
            fontStyle: 'italic',
            color: app.text,
            marginBottom: '10px',
          }}
        >
          Componentes
        </div>

        {/* Search */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: app.surface,
            border: `1px solid ${app.border}`,
            borderRadius: '6px',
            padding: '0 10px',
            height: '32px',
          }}
        >
          <Search size={13} color={app.textDim} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontFamily: 'var(--font-geist-sans)',
              fontSize: '12px',
              color: app.text,
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}
            >
              <X size={12} color={app.textDim} />
            </button>
          )}
        </div>
      </div>

      {/* Component list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 12px' }}>
        {Object.keys(grouped).length === 0 ? (
          <div
            style={{
              padding: '20px 0',
              textAlign: 'center',
              fontSize: '12px',
              color: app.textDim,
              fontFamily: 'var(--font-geist-sans)',
            }}
          >
            Nenhum resultado
          </div>
        ) : (
          (CATEGORY_ORDER as ComponentCategory[])
            .filter((cat) => grouped[cat])
            .map((cat) => (
              <div key={cat} style={{ marginBottom: '16px' }}>
                {/* Category header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginBottom: '6px',
                    padding: '0 2px',
                  }}
                >
                  <div
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: categoryColors[cat],
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-geist-sans)',
                      fontSize: '10px',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      color: app.textDim,
                      textTransform: 'uppercase',
                    }}
                  >
                    {CATEGORY_LABELS[cat]}
                  </span>
                </div>

                {/* Items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {grouped[cat]!.map((comp) => (
                    <PaletteItem key={comp.id} component={comp} />
                  ))}
                </div>
              </div>
            ))
        )}
      </div>

      {/* Legend */}
      <div
        style={{
          padding: '10px 14px',
          borderTop: `1px solid ${app.border}`,
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}
      >
        {(Object.entries(categoryColors) as [ComponentCategory, string][]).map(([cat, color]) => (
          <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: color }} />
            <span style={{ fontSize: '10px', color: app.textDim, fontFamily: 'var(--font-geist-sans)' }}>
              {CATEGORY_LABELS[cat]}
            </span>
          </div>
        ))}
      </div>
    </aside>
  );
}
