import { CanvasNode } from '@/types/canvas';
import { colors, borderRadius, typography, shadows } from '@/data/tokens';

interface Props {
  node: CanvasNode;
  children?: React.ReactNode;
  isSelected?: boolean;
}

export function AndesCard({ node, children, isSelected }: Props) {
  const title = (node.props.title as string) ?? '';
  const hasPadding = (node.props.padding as boolean) !== false;
  const shadow = node.variant.shadow ?? 'flat';

  const shadowMap: Record<string, string> = {
    none: 'none',
    flat: shadows.card,
    elevated: shadows.dropdown,
  };

  const contentChildren = node.children.filter((c) => c.slotName === 'content' || !c.slotName);
  const actionChildren = node.children.filter((c) => c.slotName === 'actions');

  const hasContent = contentChildren.length > 0;
  const hasActions = actionChildren.length > 0;

  return (
    <div
      style={{
        background: colors.white,
        border: `1px solid ${isSelected ? colors.brandBlue : colors.neutral200}`,
        borderRadius: borderRadius.lg,
        boxShadow: shadowMap[shadow] ?? shadowMap.flat,
        overflow: 'hidden',
        width: '100%',
      }}
    >
      {/* Title */}
      {title && (
        <div
          style={{
            padding: hasPadding ? '16px 16px 0' : '12px 12px 0',
            borderBottom: (hasContent || hasActions) ? `1px solid ${colors.neutral100}` : 'none',
            paddingBottom: (hasContent || hasActions) ? '12px' : hasPadding ? '16px' : '12px',
          }}
        >
          <span
            style={{
              fontFamily: typography.fontFamily,
              fontSize: '16px',
              fontWeight: typography.weights.semibold,
              color: colors.neutral900,
              lineHeight: 1.3,
            }}
          >
            {title}
          </span>
        </div>
      )}

      {/* Content slot */}
      {hasContent && (
        <div style={{ padding: hasPadding ? '12px 16px' : '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {children}
        </div>
      )}

      {/* Empty state */}
      {!hasContent && !hasActions && (
        <div
          style={{
            padding: '24px 16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            color: colors.neutral400,
          }}
        >
          <span style={{ fontSize: '12px', fontFamily: typography.fontFamily }}>
            Arraste componentes para cá
          </span>
        </div>
      )}

      {/* Actions slot */}
      {hasActions && (
        <div
          style={{
            borderTop: `1px solid ${colors.neutral100}`,
            padding: '12px 16px',
            display: 'flex',
            gap: '8px',
            justifyContent: 'flex-end',
          }}
        >
          {/* Actions rendered by parent */}
        </div>
      )}
    </div>
  );
}
