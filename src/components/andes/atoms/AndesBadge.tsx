import { CanvasNode } from '@/types/canvas';
import { typography } from '@/data/tokens';

interface Props {
  node: CanvasNode;
}

const BRAND = '#434ce4';

export function AndesBadge({ node }: Props) {
  const label = (node.props.label as string) ?? 'Novo';
  const color = node.variant.color ?? 'accent';

  const colorMap: Record<string, { bg: string; text: string }> = {
    accent: { bg: '#fff3b0', text: '#6b5200' },
    loud:   { bg: BRAND, text: '#ffffff' },
    quiet:  { bg: '#e9f1ff', text: BRAND },
    neutral: { bg: '#f0f0f0', text: '#666666' },
    positive: { bg: '#e8f5e9', text: '#00a650' },
    negative: { bg: '#fde8ea', text: '#f23d4f' },
  };

  const scheme = colorMap[color] ?? colorMap.accent;

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3px 10px',
        borderRadius: '9999px',
        background: scheme.bg,
        color: scheme.text,
        fontSize: '12px',
        fontFamily: typography.fontFamily,
        fontWeight: typography.weights.semibold,
        lineHeight: 1.4,
        flexShrink: 0,
        userSelect: 'none',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </div>
  );
}
