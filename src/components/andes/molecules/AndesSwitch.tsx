import { CanvasNode } from '@/types/canvas';
import { colors, typography } from '@/data/tokens';

interface Props {
  node: CanvasNode;
}

export function AndesSwitch({ node }: Props) {
  const label = (node.props.label as string) ?? 'Label';
  const checked = (node.props.checked as boolean) ?? false;
  const disabled = (node.props.disabled as boolean) ?? false;

  const trackColor = checked ? colors.brandBlue : colors.neutral300;
  const thumbX = checked ? '20px' : '2px';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'default',
        userSelect: 'none',
        width: '100%',
      }}
    >
      {/* Label */}
      <span
        style={{
          fontFamily: typography.fontFamily,
          fontSize: '14px',
          color: disabled ? colors.neutral400 : colors.neutral800,
          lineHeight: 1.5,
        }}
      >
        {label}
      </span>

      {/* Track */}
      <div
        style={{
          position: 'relative',
          width: '44px',
          height: '24px',
          borderRadius: '12px',
          background: trackColor,
          flexShrink: 0,
          transition: 'background 200ms',
        }}
      >
        {/* Thumb */}
        <div
          style={{
            position: 'absolute',
            top: '2px',
            left: thumbX,
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: colors.white,
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            transition: 'left 200ms',
          }}
        />
      </div>
    </div>
  );
}
