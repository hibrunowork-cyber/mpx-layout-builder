import { CanvasNode } from '@/types/canvas';
import { colors, borderRadius, typography } from '@/data/tokens';

interface Props {
  node: CanvasNode;
}

export function AndesTextField({ node }: Props) {
  const label = (node.props.label as string) ?? 'Label';
  const placeholder = (node.props.placeholder as string) ?? 'Placeholder';
  const helperText = (node.props.helperText as string) ?? '';
  const errorText = (node.props.errorText as string) ?? '';
  const state = node.variant.state ?? 'default';

  const isError = state === 'error' || Boolean(errorText);
  const isDisabled = state === 'disabled' || (node.props.disabled as boolean);
  const isFocus = state === 'focus';

  const borderColor = isError
    ? colors.error
    : isFocus
    ? colors.brandBlue
    : colors.neutral300;

  const bgColor = isDisabled ? colors.neutral050 : colors.white;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%' }}>
      {/* Label */}
      <div
        style={{
          fontSize: '12px',
          fontFamily: typography.fontFamily,
          fontWeight: typography.weights.semibold,
          color: isDisabled ? colors.neutral400 : colors.neutral700,
          lineHeight: 1.4,
        }}
      >
        {label}
      </div>

      {/* Input box */}
      <div
        style={{
          height: '44px',
          border: `${isFocus ? '2px' : '1px'} solid ${borderColor}`,
          borderRadius: borderRadius.sm,
          background: bgColor,
          display: 'flex',
          alignItems: 'center',
          padding: '0 12px',
          boxShadow: isFocus ? `0 0 0 4px ${colors.info}22` : undefined,
        }}
      >
        <span
          style={{
            fontFamily: typography.fontFamily,
            fontSize: '14px',
            color: isDisabled ? colors.neutral400 : colors.neutral400,
          }}
        >
          {placeholder}
        </span>
      </div>

      {/* Helper/Error text */}
      {(helperText || isError) && (
        <div
          style={{
            fontSize: '12px',
            fontFamily: typography.fontFamily,
            color: isError ? colors.error : colors.neutral600,
            lineHeight: 1.4,
          }}
        >
          {isError && errorText ? errorText : helperText}
        </div>
      )}
    </div>
  );
}
