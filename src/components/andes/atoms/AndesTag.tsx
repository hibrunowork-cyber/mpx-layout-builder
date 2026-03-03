import { CanvasNode } from '@/types/canvas';
import { colors, borderRadius, typography } from '@/data/tokens';

interface Props {
  node: CanvasNode;
}

export function AndesTag({ node }: Props) {
  const label = (node.props.label as string) ?? 'Tag';
  const type = node.variant.type ?? 'general';
  const size = node.variant.size ?? 'default';

  const schemeMap: Record<string, { bg: string; text: string; border: string }> = {
    general: { bg: colors.neutral050, text: colors.neutral700, border: colors.neutral200 },
    success: { bg: colors.successLight, text: '#006b35', border: '#b3e5c8' },
    warning: { bg: colors.warningLight, text: '#8a6d00', border: '#ffe680' },
    error: { bg: colors.errorLight, text: '#c00d1e', border: '#f9bcc2' },
  };

  const scheme = schemeMap[type] ?? schemeMap.general;

  const sizeStyles = size === 'small'
    ? { fontSize: '11px', padding: '2px 8px', height: '20px' }
    : { fontSize: '12px', padding: '3px 10px', height: '24px' };

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: borderRadius.sm,
        border: `1px solid ${scheme.border}`,
        background: scheme.bg,
        color: scheme.text,
        fontFamily: typography.fontFamily,
        fontWeight: typography.weights.semibold,
        userSelect: 'none',
        flexShrink: 0,
        ...sizeStyles,
      }}
    >
      {label}
    </div>
  );
}
