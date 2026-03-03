import { CanvasNode } from '@/types/canvas';
import { typography } from '@/data/tokens';

interface Props {
  node: CanvasNode;
}

export function AndesMoneyAmount({ node }: Props) {
  const currency    = (node.props.currency    as string) ?? '$';
  const amount      = (node.props.amount      as string) ?? '1.299';
  const cents       = (node.props.cents       as string) ?? '99';
  const discountPct = (node.props.discountPct as string) ?? '';
  const size        = node.variant.size  ?? 'large';
  const color       = node.variant.color ?? 'primary';

  const colorMap: Record<string, string> = {
    primary:  '#1a1a2e',
    positive: '#00a650',
    negative: '#f23d4f',
    disabled: '#b2b2b2',
  };

  const sizeStyles: Record<string, { symbol: string; amount: string; cents: string }> = {
    large:       { symbol: '16px', amount: '40px', cents: '18px' },
    medium:      { symbol: '14px', amount: '28px', cents: '14px' },
    small:       { symbol: '12px', amount: '20px', cents: '12px' },
    'extra-small': { symbol: '10px', amount: '16px', cents: '10px' },
  };

  const s = sizeStyles[size] ?? sizeStyles.large;
  const c = colorMap[color] ?? colorMap.primary;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
        userSelect: 'none',
      }}
    >
      {/* Discount badge */}
      {discountPct && (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: '#e8f5e9',
            color: '#00a650',
            borderRadius: '4px',
            padding: '2px 6px',
            fontSize: '11px',
            fontWeight: 600,
            fontFamily: typography.fontFamily,
            width: 'fit-content',
          }}
        >
          {discountPct}% OFF
        </div>
      )}

      {/* Amount row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2px' }}>
        {/* Currency symbol */}
        <span
          style={{
            fontFamily: typography.fontFamily,
            fontSize: s.symbol,
            fontWeight: 600,
            color: c,
            lineHeight: 1.2,
            marginTop: '4px',
          }}
        >
          {currency}
        </span>

        {/* Main amount */}
        <span
          style={{
            fontFamily: typography.fontFamily,
            fontSize: s.amount,
            fontWeight: 700,
            color: c,
            lineHeight: 1,
          }}
        >
          {amount}
        </span>

        {/* Cents */}
        {cents && (
          <span
            style={{
              fontFamily: typography.fontFamily,
              fontSize: s.cents,
              fontWeight: 600,
              color: c,
              lineHeight: 1.2,
              marginTop: '4px',
            }}
          >
            {cents}
          </span>
        )}
      </div>
    </div>
  );
}
