import { CanvasNode } from '@/types/canvas';
import { typography } from '@/data/tokens';

interface Props {
  node: CanvasNode;
}

const BRAND = '#434ce4';
const BRAND_LIGHT = '#e9f1ff';

export function AndesFixedFooter({ node }: Props) {
  const primaryLabel = (node.props.primaryLabel as string) ?? 'Continuar';
  const secondaryLabel = (node.props.secondaryLabel as string) ?? '';
  const layout = node.variant.layout ?? 'single';

  return (
    <div
      style={{
        background: '#ffffff',
        borderTop: '1px solid #eeeeee',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: '100%',
        flexShrink: 0,
      }}
    >
      {/* Primary button */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '48px',
          borderRadius: '12px',
          background: BRAND,
          color: '#ffffff',
          fontFamily: typography.fontFamily,
          fontSize: '16px',
          fontWeight: typography.weights.semibold,
          userSelect: 'none',
          width: '100%',
        }}
      >
        {primaryLabel}
      </div>

      {/* Secondary button (optional) */}
      {(layout === 'double' || secondaryLabel) && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '48px',
            borderRadius: '12px',
            background: BRAND_LIGHT,
            color: BRAND,
            fontFamily: typography.fontFamily,
            fontSize: '16px',
            fontWeight: typography.weights.semibold,
            userSelect: 'none',
            width: '100%',
          }}
        >
          {secondaryLabel || 'Cancelar'}
        </div>
      )}
    </div>
  );
}
