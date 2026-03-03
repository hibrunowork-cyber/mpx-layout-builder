import { CanvasNode } from '@/types/canvas';
import { typography } from '@/data/tokens';

interface Props {
  node: CanvasNode;
  children?: React.ReactNode;
}

export function AndesBottomSheet({ node, children }: Props) {
  const title         = (node.props.title         as string)  ?? 'Título';
  const showClose     = (node.props.showClose     as boolean) !== false;
  const primaryLabel  = (node.props.primaryLabel  as string)  ?? '';
  const secondaryLabel= (node.props.secondaryLabel as string) ?? '';

  const BRAND = '#434ce4';

  const hasActions = primaryLabel || secondaryLabel;

  return (
    <div
      style={{
        width: '100%',
        background: '#ffffff',
        borderRadius: '16px 16px 0 0',
        boxShadow: '0 -4px 24px rgba(0,0,0,0.16)',
        overflow: 'hidden',
        userSelect: 'none',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Handle bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '10px',
          paddingBottom: '6px',
        }}
      >
        <div
          style={{
            width: '40px',
            height: '4px',
            borderRadius: '2px',
            background: '#e0e0e0',
          }}
        />
      </div>

      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '4px 20px 12px',
        }}
      >
        <span
          style={{
            fontFamily: typography.fontFamily,
            fontSize: '18px',
            fontWeight: 700,
            color: '#1a1a2e',
            lineHeight: 1.3,
            flex: 1,
          }}
        >
          {title}
        </span>
        {showClose && (
          <div
            style={{
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'default',
              color: '#666666',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="#666666" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        )}
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: '#f0f0f0', margin: '0 20px' }} />

      {/* Content slot */}
      <div style={{ padding: '16px 20px', flex: 1 }}>
        {children ? (
          children
        ) : (
          <span
            style={{
              fontFamily: typography.fontFamily,
              fontSize: '14px',
              color: '#b2b2b2',
            }}
          >
            Conteúdo do bottom sheet
          </span>
        )}
      </div>

      {/* Actions */}
      {hasActions && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            padding: '0 20px 24px',
          }}
        >
          {primaryLabel && (
            <div
              style={{
                height: '48px',
                borderRadius: '12px',
                background: BRAND,
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: typography.fontFamily,
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'default',
              }}
            >
              {primaryLabel}
            </div>
          )}
          {secondaryLabel && (
            <div
              style={{
                height: '48px',
                borderRadius: '12px',
                background: '#e9f1ff',
                color: BRAND,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: typography.fontFamily,
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'default',
              }}
            >
              {secondaryLabel}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
