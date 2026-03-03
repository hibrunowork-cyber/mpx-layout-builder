import { CanvasNode } from '@/types/canvas';
import { colors, borderRadius, typography } from '@/data/tokens';

interface Props {
  node: CanvasNode;
}

export function AndesSearchBar({ node }: Props) {
  const placeholder = (node.props.placeholder as string) ?? 'Buscar...';
  const disabled = (node.props.disabled as boolean) ?? false;
  const compact = node.variant.size === 'compact';

  const height = compact ? '36px' : '48px';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height,
        border: `1px solid ${disabled ? colors.neutral200 : colors.neutral300}`,
        borderRadius: borderRadius.full,
        background: disabled ? colors.neutral050 : colors.white,
        padding: '0 16px',
        gap: '10px',
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? 'not-allowed' : 'default',
      }}
    >
      {/* Ícone de busca */}
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="7" stroke={colors.neutral500} strokeWidth="2" />
        <path d="M16.5 16.5L21 21" stroke={colors.neutral500} strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span
        style={{
          fontFamily: typography.fontFamily,
          fontSize: compact ? '13px' : '14px',
          color: colors.neutral400,
          flex: 1,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {placeholder}
      </span>
    </div>
  );
}
