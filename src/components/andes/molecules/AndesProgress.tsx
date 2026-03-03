import { CanvasNode } from '@/types/canvas';

interface Props {
  node: CanvasNode;
}

const BRAND = '#434ce4';

export function AndesProgress({ node }: Props) {
  const total = Math.max(2, Math.min(8, (node.props.total as number) ?? 4));
  const current = Math.max(1, Math.min(total, (node.props.current as number) ?? 1));
  const type = node.variant.type ?? 'dots';

  if (type === 'segmented') {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          userSelect: 'none',
          padding: '4px 0',
        }}
      >
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: '4px',
              borderRadius: '2px',
              background: i < current ? BRAND : '#e0e0e0',
              transition: 'background 200ms',
            }}
          />
        ))}
      </div>
    );
  }

  // dots variant (default)
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        userSelect: 'none',
        padding: '4px 0',
      }}
    >
      {Array.from({ length: total }, (_, i) => {
        const active = i === current - 1;
        return (
          <div
            key={i}
            style={{
              width: active ? '20px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: active ? BRAND : '#d0d0d8',
              transition: 'all 200ms',
            }}
          />
        );
      })}
    </div>
  );
}
