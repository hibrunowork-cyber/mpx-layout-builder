import { CanvasNode } from '@/types/canvas';
import { typography } from '@/data/tokens';

interface Props {
  node: CanvasNode;
}

const BRAND = '#434ce4';
const BRAND_LIGHT = '#e9f1ff';

export function AndesButton({ node }: Props) {
  const label = (node.props.label as string) ?? 'Continuar';
  const disabled = (node.props.disabled as boolean) ?? false;
  const fullWidth = (node.props.fullWidth as boolean) ?? false;
  const hierarchy = node.variant.hierarchy ?? 'loud';
  const size = node.variant.size ?? 'large';

  const heightMap = { large: '48px', medium: '40px', small: '32px' };
  const fontSizeMap = { large: '16px', medium: '14px', small: '12px' };
  const paddingMap = { large: '0 24px', medium: '0 20px', small: '0 16px' };
  const radiusMap = { large: '12px', medium: '10px', small: '8px' };

  const h = heightMap[size as keyof typeof heightMap] ?? '48px';
  const fs = fontSizeMap[size as keyof typeof fontSizeMap] ?? '16px';
  const px = paddingMap[size as keyof typeof paddingMap] ?? '0 24px';
  const br = radiusMap[size as keyof typeof radiusMap] ?? '12px';

  const styleMap: Record<string, React.CSSProperties> = {
    loud: {
      background: disabled ? '#d0d0d8' : BRAND,
      color: disabled ? '#9898b0' : '#ffffff',
      border: 'none',
    },
    quiet: {
      background: disabled ? 'transparent' : BRAND_LIGHT,
      color: disabled ? '#9898b0' : BRAND,
      border: 'none',
    },
    transparent: {
      background: 'transparent',
      color: disabled ? '#9898b0' : BRAND,
      border: 'none',
    },
  };

  const base = styleMap[hierarchy] ?? styleMap.loud;

  return (
    <div
      style={{
        display: fullWidth ? 'flex' : 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: h,
        padding: px,
        borderRadius: br,
        fontFamily: typography.fontFamily,
        fontSize: fs,
        fontWeight: typography.weights.semibold,
        cursor: disabled ? 'not-allowed' : 'default',
        opacity: disabled ? 0.65 : 1,
        width: fullWidth ? '100%' : 'fit-content',
        userSelect: 'none',
        ...base,
      }}
    >
      {label}
    </div>
  );
}
