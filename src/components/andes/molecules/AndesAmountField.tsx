import { CanvasNode } from '@/types/canvas';

interface Props {
  node: CanvasNode;
}

const FONT = 'Proxima Nova, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

const SIZE_STYLES: Record<string, { fontSize: string; prefixSize: string; height: string; labelSize: string }> = {
  large:       { fontSize: '40px', prefixSize: '24px', height: '72px', labelSize: '12px' },
  medium:      { fontSize: '28px', prefixSize: '18px', height: '56px', labelSize: '12px' },
  small:       { fontSize: '20px', prefixSize: '14px', height: '44px', labelSize: '11px' },
  'extra-small': { fontSize: '16px', prefixSize: '12px', height: '36px', labelSize: '10px' },
};

export function AndesAmountField({ node }: Props) {
  const label    = (node.props.label    as string) ?? 'Valor';
  const currency = (node.props.currency as string) ?? '$';
  const value    = (node.props.value    as string) ?? '';
  const helper   = (node.props.helper   as string) ?? '';
  const size     = node.variant.size  ?? 'large';
  const state    = node.variant.state ?? 'placeholder';

  const s = SIZE_STYLES[size] ?? SIZE_STYLES.large;

  const isError = state === 'error';
  const isActive = state === 'active';
  const isFilled = state === 'filled' || value.length > 0;
  const isPlaceholder = !isFilled && state === 'placeholder';

  const displayValue = isFilled ? value : '0';
  const amountColor = isError ? '#f23d4f' : '#1a1a2e';
  const borderBottom = isActive
    ? '2px solid #434ce4'
    : isError
    ? '2px solid #f23d4f'
    : '1px solid #e0e0e0';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        fontFamily: FONT,
        width: '100%',
        userSelect: 'none',
      }}
    >
      {/* Label */}
      {label && (
        <span
          style={{
            fontSize: s.labelSize,
            fontWeight: 400,
            color: '#666666',
            lineHeight: 1.4,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {label}
        </span>
      )}

      {/* Amount row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '6px',
          borderBottom,
          height: s.height,
          paddingBottom: '8px',
          transition: 'border-color 150ms',
        }}
      >
        {/* Currency prefix */}
        <span
          style={{
            fontSize: s.prefixSize,
            fontWeight: 600,
            color: isPlaceholder ? '#b2b2b2' : amountColor,
            lineHeight: 1,
            paddingBottom: '2px',
          }}
        >
          {currency}
        </span>

        {/* Value */}
        <span
          style={{
            fontSize: s.fontSize,
            fontWeight: 700,
            color: isPlaceholder ? '#b2b2b2' : amountColor,
            lineHeight: 1,
          }}
        >
          {displayValue}
        </span>
      </div>

      {/* Helper / error text */}
      {(helper || isError) && (
        <span
          style={{
            fontSize: '12px',
            color: isError ? '#f23d4f' : '#666666',
            lineHeight: 1.4,
          }}
        >
          {isError ? (helper || 'Valor inválido') : helper}
        </span>
      )}
    </div>
  );
}
