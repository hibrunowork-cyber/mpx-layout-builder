import { CanvasNode } from '@/types/canvas';
import { typography } from '@/data/tokens';

interface Props {
  node: CanvasNode;
}

const BRAND = '#434ce4';
const BORDER = '#8788ab';

export function AndesRadioButton({ node }: Props) {
  const label    = (node.props.label    as string)  ?? 'Opção';
  const disabled = (node.props.disabled as boolean) ?? false;
  const state    = node.variant.state ?? 'unchecked';
  const size     = node.variant.size  ?? 'default';

  const isChecked = state === 'checked';
  const outerSize = size === 'small' ? 18 : 22;
  const innerSize = size === 'small' ? 8  : 10;
  const fontSize  = size === 'small' ? '13px' : '14px';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'default',
        userSelect: 'none',
        width: '100%',
      }}
    >
      {/* Radio circle */}
      <div
        style={{
          width: outerSize,
          height: outerSize,
          borderRadius: '50%',
          border: `2px solid ${isChecked ? BRAND : BORDER}`,
          background: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {isChecked && (
          <div
            style={{
              width: innerSize,
              height: innerSize,
              borderRadius: '50%',
              background: BRAND,
            }}
          />
        )}
      </div>

      {/* Label */}
      <span
        style={{
          fontFamily: typography.fontFamily,
          fontSize,
          fontWeight: 400,
          color: disabled ? '#b2b2b2' : '#1a1a2e',
          lineHeight: 1.5,
          flex: 1,
        }}
      >
        {label}
      </span>
    </div>
  );
}
