import { CanvasNode } from '@/types/canvas';

interface Props {
  node: CanvasNode;
}

const BRAND = '#434ce4';
const FONT = 'Proxima Nova, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

export function AndesDropdown({ node }: Props) {
  const label       = (node.props.label       as string) ?? 'Selecione uma opção';
  const placeholder = (node.props.placeholder as string) ?? 'Selecionar';
  const value       = (node.props.value       as string) ?? '';
  const errorText   = (node.props.errorText   as string) ?? '';
  const disabled    = (node.props.disabled    as boolean) ?? false;
  const state       = node.variant.state ?? 'default';

  const hasError = state === 'error' || errorText.length > 0;
  const isActive = state === 'active';
  const isDisabled = state === 'disabled' || disabled;
  const hasValue = value.length > 0;

  const borderColor = hasError
    ? '#f23d4f'
    : isActive
    ? BRAND
    : isDisabled
    ? '#e0e0e0'
    : '#d0d0d8';

  const bgColor = isDisabled ? '#f5f5f5' : '#ffffff';
  const textColor = isDisabled ? '#b2b2b2' : hasValue ? '#1a1a2e' : '#9898b0';
  const labelColor = isDisabled ? '#b2b2b2' : hasError ? '#f23d4f' : '#333333';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        fontFamily: FONT,
        opacity: isDisabled ? 0.65 : 1,
        width: '100%',
        userSelect: 'none',
      }}
    >
      {/* Label */}
      <span
        style={{
          fontSize: '14px',
          fontWeight: 600,
          color: labelColor,
          lineHeight: 1.4,
        }}
      >
        {label}
      </span>

      {/* Input row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '44px',
          border: `1.5px solid ${borderColor}`,
          borderRadius: '8px',
          background: bgColor,
          padding: '0 12px',
          gap: '8px',
          transition: 'border-color 150ms',
        }}
      >
        {/* Value or placeholder */}
        <span
          style={{
            flex: 1,
            fontSize: '14px',
            fontWeight: hasValue ? 400 : 400,
            color: textColor,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {hasValue ? value : placeholder}
        </span>

        {/* Chevron down */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
          <path
            d="M6 9l6 6 6-6"
            stroke={isDisabled ? '#b2b2b2' : BRAND}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Error text */}
      {hasError && errorText && (
        <span style={{ fontSize: '12px', color: '#f23d4f', lineHeight: 1.4 }}>
          {errorText}
        </span>
      )}
    </div>
  );
}
