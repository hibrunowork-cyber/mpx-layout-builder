import { CanvasNode } from '@/types/canvas';
import { typography } from '@/data/tokens';

interface Props {
  node: CanvasNode;
}

const BRAND = '#434ce4';

export function AndesTabs({ node }: Props) {
  const tab1       = (node.props.tab1       as string) ?? 'Tab 1';
  const tab2       = (node.props.tab2       as string) ?? 'Tab 2';
  const tab3       = (node.props.tab3       as string) ?? '';
  const tab4       = (node.props.tab4       as string) ?? '';
  const activeTab  = (node.props.activeTab  as number) ?? 0;
  const variant    = node.variant.variant ?? 'proportional';

  const tabs = [tab1, tab2, tab3, tab4].filter(Boolean);

  return (
    <div
      style={{
        width: '100%',
        background: '#ffffff',
        borderBottom: '1px solid #e0e0e0',
        userSelect: 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          overflowX: 'auto',
        }}
      >
        {tabs.map((label, i) => {
          const isActive = i === activeTab;
          return (
            <div
              key={i}
              style={{
                flex: variant === 'proportional' ? 1 : undefined,
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                cursor: 'default',
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: typography.fontFamily,
                  fontSize: '14px',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? BRAND : '#666666',
                  whiteSpace: 'nowrap',
                }}
              >
                {label}
              </span>
              {/* Active indicator */}
              {isActive && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: BRAND,
                    borderRadius: '2px 2px 0 0',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
