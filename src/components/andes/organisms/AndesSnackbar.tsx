import { CanvasNode } from '@/types/canvas';
import { colors, borderRadius, typography } from '@/data/tokens';

interface Props {
  node: CanvasNode;
}

export function AndesSnackbar({ node }: Props) {
  const message = (node.props.message as string) ?? 'Mensagem de notificação';
  const actionLabel = (node.props.actionLabel as string) ?? '';
  const type = node.variant.type ?? 'default';

  const schemeMap: Record<string, { bg: string; text: string; icon: string; iconColor: string }> = {
    default: { bg: colors.neutral900, text: colors.white, icon: 'info', iconColor: colors.brandBlue },
    success: { bg: '#1a4731', text: colors.white, icon: 'check', iconColor: colors.success },
    error: { bg: '#4a0e16', text: colors.white, icon: 'x', iconColor: colors.error },
    warning: { bg: '#3d2e00', text: '#fff3b0', icon: 'warn', iconColor: '#ffd700' },
  };

  const scheme = schemeMap[type] ?? schemeMap.default;

  return (
    <div
      style={{
        background: scheme.bg,
        color: scheme.text,
        borderRadius: borderRadius.md,
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.24)',
        width: '100%',
        maxWidth: '380px',
      }}
    >
      {/* Icon */}
      <div style={{ flexShrink: 0 }}>
        {type === 'success' && (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill={scheme.iconColor} opacity="0.2" />
            <path d="M8 12l3 3 5-5" stroke={scheme.iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        {type === 'error' && (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill={scheme.iconColor} opacity="0.2" />
            <path d="M15 9l-6 6M9 9l6 6" stroke={scheme.iconColor} strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
        {(type === 'default' || type === 'warning') && (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill={scheme.iconColor} opacity="0.2" />
            <path d="M12 8v4M12 16h.01" stroke={scheme.iconColor} strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </div>

      {/* Message */}
      <span
        style={{
          fontFamily: typography.fontFamily,
          fontSize: '14px',
          lineHeight: 1.45,
          flex: 1,
          color: scheme.text,
        }}
      >
        {message}
      </span>

      {/* Action */}
      {actionLabel && (
        <span
          style={{
            fontFamily: typography.fontFamily,
            fontSize: '14px',
            fontWeight: typography.weights.semibold,
            color: colors.brandBlue,
            flexShrink: 0,
            cursor: 'default',
          }}
        >
          {actionLabel}
        </span>
      )}
    </div>
  );
}
