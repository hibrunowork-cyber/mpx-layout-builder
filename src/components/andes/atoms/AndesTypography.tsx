import { CanvasNode } from '@/types/canvas';

interface Props {
  node: CanvasNode;
}

const FONT = 'Proxima Nova, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

const TYPE_STYLES: Record<string, React.CSSProperties> = {
  'title-1': { fontSize: '32px', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.5px' },
  'title-2': { fontSize: '24px', fontWeight: 700, lineHeight: 1.3, letterSpacing: '-0.3px' },
  'title-3': { fontSize: '20px', fontWeight: 600, lineHeight: 1.35 },
  'body':    { fontSize: '16px', fontWeight: 400, lineHeight: 1.5 },
  'body-semibold': { fontSize: '16px', fontWeight: 600, lineHeight: 1.5 },
  'small':   { fontSize: '14px', fontWeight: 400, lineHeight: 1.5 },
  'caption': { fontSize: '12px', fontWeight: 400, lineHeight: 1.4 },
};

const COLOR_MAP: Record<string, string> = {
  primary:   '#1a1a2e',
  secondary: '#666666',
  link:      '#434ce4',
  positive:  '#00a650',
  negative:  '#f23d4f',
  disabled:  '#b2b2b2',
};

export function AndesTypography({ node }: Props) {
  const text  = (node.props.text  as string) ?? 'Texto de exemplo';
  const type  = node.variant.type  ?? 'body';
  const color = node.variant.color ?? 'primary';

  return (
    <div
      style={{
        fontFamily: FONT,
        color: COLOR_MAP[color] ?? COLOR_MAP.primary,
        userSelect: 'none',
        wordBreak: 'break-word',
        ...TYPE_STYLES[type] ?? TYPE_STYLES.body,
      }}
    >
      {text}
    </div>
  );
}
