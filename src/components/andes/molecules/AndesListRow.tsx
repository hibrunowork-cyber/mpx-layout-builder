import { CanvasNode } from '@/types/canvas';
import { typography } from '@/data/tokens';

interface Props {
  node: CanvasNode;
}

const BRAND = '#434ce4';

export function AndesListRow({ node }: Props) {
  const title = (node.props.title as string) ?? 'Título do item';
  const description = (node.props.description as string) ?? 'Descrição secundária do item';
  const badgeLabel = (node.props.badgeLabel as string) ?? '';
  const showThumbnail = (node.props.showThumbnail as boolean) !== false;
  const showChevron = (node.props.showChevron as boolean) !== false;
  const showBadge = badgeLabel.length > 0;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        background: '#ffffff',
        borderBottom: '1px solid #f0f0f0',
        userSelect: 'none',
        minHeight: '68px',
        width: '100%',
      }}
    >
      {/* Thumbnail */}
      {showThumbnail && (
        <div
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '8px',
            background: '#e9f1ff',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="3" fill="#c5d5f5" />
            <path
              d="M3 16l5-5 4 4 3-3 6 6"
              stroke="#434ce4"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <div
          style={{
            fontFamily: typography.fontFamily,
            fontSize: '14px',
            fontWeight: typography.weights.semibold,
            color: '#333333',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: typography.fontFamily,
            fontSize: '12px',
            fontWeight: typography.weights.regular,
            color: '#666666',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {description}
        </div>
      </div>

      {/* Badge */}
      {showBadge && (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '2px 8px',
            borderRadius: '9999px',
            background: '#e9f1ff',
            color: BRAND,
            fontSize: '11px',
            fontFamily: typography.fontFamily,
            fontWeight: typography.weights.semibold,
            flexShrink: 0,
          }}
        >
          {badgeLabel}
        </div>
      )}

      {/* Chevron */}
      {showChevron && (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
          <path
            d="M9 18l6-6-6-6"
            stroke="#8788ab"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
}
