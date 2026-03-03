import { CanvasNode } from '@/types/canvas';
import { typography } from '@/data/tokens';

interface Props {
  node: CanvasNode;
}

const BRAND = '#434ce4';

export function AndesCheckbox({ node }: Props) {
  const label = (node.props.label as string) ?? 'Aceitar termos';
  const disabled = (node.props.disabled as boolean) ?? false;
  const state = node.variant.state ?? 'unchecked';

  const checked = state === 'checked';
  const indeterminate = state === 'indeterminate';
  const active = checked || indeterminate;

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        opacity: disabled ? 0.5 : 1,
        userSelect: 'none',
      }}
    >
      {/* Box */}
      <div
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '4px',
          border: active ? 'none' : `2px solid #8788ab`,
          background: active ? BRAND : '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {checked && (
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
            <path
              d="M1.5 5L4.5 8L10.5 2"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        {indeterminate && (
          <div
            style={{
              width: '10px',
              height: '2px',
              background: '#ffffff',
              borderRadius: '1px',
            }}
          />
        )}
      </div>

      {/* Label */}
      <span
        style={{
          fontFamily: typography.fontFamily,
          fontSize: '14px',
          fontWeight: typography.weights.regular,
          color: disabled ? '#9898b0' : '#333333',
          lineHeight: 1.4,
        }}
      >
        {label}
      </span>
    </div>
  );
}
