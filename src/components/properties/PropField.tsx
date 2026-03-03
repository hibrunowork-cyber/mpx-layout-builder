'use client';

import { PropDefinition } from '@/types/catalog';
import { app } from '@/data/tokens';
import { IMAGES } from '@/data/images';

interface Props {
  def: PropDefinition;
  value: unknown;
  onChange: (value: unknown) => void;
}

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-geist-sans)',
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '0.05em',
  color: app.textDim,
  textTransform: 'uppercase',
  marginBottom: '5px',
  display: 'block',
};

const inputStyle: React.CSSProperties = {
  fontFamily: 'var(--font-geist-sans)',
  fontSize: '13px',
  color: app.text,
  background: app.surface,
  border: `1px solid ${app.border}`,
  borderRadius: '6px',
  padding: '6px 10px',
  outline: 'none',
  width: '100%',
};

export function PropField({ def, value, onChange }: Props) {
  switch (def.type) {
    case 'string':
      return (
        <div>
          <label style={labelStyle}>{def.label}</label>
          <input
            type="text"
            value={(value as string) ?? ''}
            onChange={(e) => onChange(e.target.value)}
            style={inputStyle}
          />
        </div>
      );

    case 'number':
      return (
        <div>
          <label style={labelStyle}>{def.label}</label>
          <input
            type="number"
            value={(value as number) ?? 0}
            onChange={(e) => onChange(Number(e.target.value))}
            style={inputStyle}
          />
        </div>
      );

    case 'boolean':
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
          <label
            style={{
              fontFamily: 'var(--font-geist-sans)',
              fontSize: '13px',
              color: app.text,
              cursor: 'pointer',
            }}
          >
            {def.label}
          </label>
          <button
            onClick={() => onChange(!(value as boolean))}
            style={{
              width: '36px',
              height: '20px',
              borderRadius: '10px',
              border: 'none',
              background: (value as boolean) ? app.andesBlue : app.border,
              cursor: 'pointer',
              position: 'relative',
              transition: 'background 150ms',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '2px',
                left: (value as boolean) ? '18px' : '2px',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: 'white',
                transition: 'left 150ms',
              }}
            />
          </button>
        </div>
      );

    case 'select':
      return (
        <div>
          <label style={labelStyle}>{def.label}</label>
          <select
            value={(value as string) ?? def.default}
            onChange={(e) => onChange(e.target.value)}
            style={{
              ...inputStyle,
              cursor: 'pointer',
              appearance: 'none',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23666663' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 10px center',
              paddingRight: '28px',
            }}
          >
            {def.options?.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      );

    case 'image': {
      const currentPath = (value as string) ?? '';
      return (
        <div>
          <label style={labelStyle}>{def.label}</label>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '6px',
            }}
          >
            {/* Opção "Nenhuma" */}
            <button
              onClick={() => onChange('')}
              style={{
                padding: '6px',
                borderRadius: '6px',
                border: `1px solid ${currentPath === '' ? app.andesBlue : app.border}`,
                background: currentPath === '' ? app.andesBlueBg : app.surface,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                transition: 'all 120ms',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '48px',
                  borderRadius: '4px',
                  background: app.border,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <line x1="4" y1="4" x2="20" y2="20" stroke={app.textDim} strokeWidth="2" strokeLinecap="round" />
                  <line x1="20" y1="4" x2="4" y2="20" stroke={app.textDim} strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-geist-sans)',
                  fontSize: '10px',
                  color: currentPath === '' ? app.andesBlue : app.textDim,
                }}
              >
                Nenhuma
              </span>
            </button>

            {IMAGES.map((img) => (
              <button
                key={img.id}
                onClick={() => onChange(img.path)}
                style={{
                  padding: '6px',
                  borderRadius: '6px',
                  border: `1px solid ${currentPath === img.path ? app.andesBlue : app.border}`,
                  background: currentPath === img.path ? app.andesBlueBg : app.surface,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'all 120ms',
                }}
              >
                <img
                  src={img.path}
                  alt={img.label}
                  style={{
                    width: '100%',
                    height: '48px',
                    objectFit: 'cover',
                    borderRadius: '4px',
                    display: 'block',
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-geist-sans)',
                    fontSize: '10px',
                    color: currentPath === img.path ? app.andesBlue : app.textDim,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '100%',
                  }}
                >
                  {img.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      );
    }

    default:
      return null;
  }
}
