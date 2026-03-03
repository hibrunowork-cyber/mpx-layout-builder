import { CanvasNode } from '@/types/canvas';
import { typography } from '@/data/tokens';

interface Props {
  node: CanvasNode;
  children?: React.ReactNode;
}

export function AndesAccordion({ node, children }: Props) {
  const title    = (node.props.title    as string)  ?? 'Título do accordion';
  const expanded = (node.props.expanded as boolean) ?? false;
  const size     = node.variant.size ?? 'medium';

  const heightMap: Record<string, { padding: string; fontSize: string; titleWeight: number }> = {
    large:  { padding: '16px',  fontSize: '16px', titleWeight: 600 },
    medium: { padding: '14px',  fontSize: '14px', titleWeight: 600 },
    small:  { padding: '10px',  fontSize: '13px', titleWeight: 600 },
  };

  const s = heightMap[size] ?? heightMap.medium;

  return (
    <div
      style={{
        width: '100%',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        background: '#ffffff',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: s.padding,
          cursor: 'default',
          gap: '12px',
        }}
      >
        <span
          style={{
            fontFamily: typography.fontFamily,
            fontSize: s.fontSize,
            fontWeight: s.titleWeight,
            color: '#1a1a2e',
            flex: 1,
            lineHeight: 1.4,
          }}
        >
          {title}
        </span>

        {/* Chevron icon */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          style={{
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 200ms',
            flexShrink: 0,
          }}
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="#666666"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Content */}
      {expanded && (
        <div
          style={{
            borderTop: '1px solid #f0f0f0',
            padding: s.padding,
          }}
        >
          {children ? (
            children
          ) : (
            <span
              style={{
                fontFamily: typography.fontFamily,
                fontSize: '13px',
                color: '#b2b2b2',
              }}
            >
              Conteúdo do accordion
            </span>
          )}
        </div>
      )}
    </div>
  );
}
