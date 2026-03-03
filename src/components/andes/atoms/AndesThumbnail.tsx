import { CanvasNode } from '@/types/canvas';
import { colors, borderRadius } from '@/data/tokens';

interface Props {
  node: CanvasNode;
}

export function AndesThumbnail({ node }: Props) {
  const alt = (node.props.alt as string) ?? 'Imagem';
  const src = (node.props.src as string) ?? '';
  const size = node.variant.size ?? 'md';
  const shape = node.variant.shape ?? 'rounded';

  const sizeMap: Record<string, number> = {
    xs: 32, sm: 48, md: 64, lg: 96, xl: 128,
  };

  const px = sizeMap[size] ?? 64;

  const radiusMap: Record<string, string> = {
    square: borderRadius.none,
    circle: borderRadius.full,
    rounded: borderRadius.md,
  };

  const radius = radiusMap[shape] ?? borderRadius.md;

  return (
    <div
      style={{
        width: px,
        height: px,
        borderRadius: radius,
        background: `linear-gradient(135deg, ${colors.neutral100} 0%, ${colors.neutral200} 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        overflow: 'hidden',
        border: `1px solid ${colors.neutral200}`,
      }}
      title={alt}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      ) : (
        <svg width={px * 0.4} height={px * 0.4} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="14" rx="2" fill={colors.neutral300} />
          <circle cx="8.5" cy="8.5" r="1.5" fill={colors.neutral400} />
          <path d="M3 17l5-5 3 3 3-3 7 7" stroke={colors.neutral400} strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
}
