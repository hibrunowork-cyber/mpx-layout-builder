import { CanvasNode } from '@/types/canvas';
import { colors, typography } from '@/data/tokens';

interface Props {
  node: CanvasNode;
  children?: React.ReactNode;
}

export function AndesList({ node, children }: Props) {
  const showDivider = (node.props.showDivider as boolean) !== false;
  const size = node.variant.size ?? 'default';

  const paddingMap: Record<string, string> = {
    compact: '8px 12px',
    default: '12px 16px',
    large: '16px 16px',
  };

  const p = paddingMap[size] ?? paddingMap.default;

  const hasItems = node.children.length > 0;

  return (
    <div
      style={{
        background: colors.white,
        border: `1px solid ${colors.neutral200}`,
        borderRadius: '8px',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      {!hasItems ? (
        <div
          style={{
            padding: '20px 16px',
            textAlign: 'center',
            color: colors.neutral400,
            fontSize: '12px',
            fontFamily: typography.fontFamily,
          }}
        >
          Arraste itens para a lista
        </div>
      ) : (
        <div>
          {React.Children.map(children, (child, i) => (
            <div key={i}>
              <div style={{ padding: p }}>
                {child}
              </div>
              {showDivider && i < React.Children.count(children) - 1 && (
                <div style={{ height: '1px', background: colors.neutral100, margin: '0 16px' }} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Need to import React for Children.map
import React from 'react';
