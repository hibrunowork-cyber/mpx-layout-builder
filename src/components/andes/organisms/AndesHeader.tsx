import { CanvasNode } from '@/types/canvas';
import { typography } from '@/data/tokens';

interface Props {
  node: CanvasNode;
}

const BRAND = '#434ce4';
const BRAND_LIGHT = '#e9f1ff';

export function AndesHeader({ node }: Props) {
  const title    = (node.props.title    as string) ?? 'Título';
  const subtitle = (node.props.subtitle as string) ?? '';
  const showBack = (node.props.showBack as boolean) !== false;
  const type     = node.variant.type    ?? 'default';
  const variant  = node.variant.variant ?? 'standard';

  const bgMap: Record<string, string> = {
    default:     '#ffffff',
    transparent: 'transparent',
    colored:     BRAND,
  };

  const textColor     = type === 'colored' ? '#ffffff' : '#1a1a2e';
  const subColor      = type === 'colored' ? 'rgba(255,255,255,0.75)' : '#666666';
  const backBg        = type === 'colored' ? 'rgba(255,255,255,0.2)' : BRAND_LIGHT;
  const backIconColor = type === 'colored' ? '#ffffff' : BRAND;
  const borderBottom  = type === 'transparent' ? 'none' : '1px solid #eeeeee';

  const isExtended = variant === 'extended' || variant === 'flow';
  const height = isExtended ? 'auto' : '56px';
  const padding = isExtended ? '12px 16px' : '0 16px';

  return (
    <div
      style={{
        background: bgMap[type] ?? bgMap.default,
        borderBottom,
        display: 'flex',
        alignItems: isExtended ? 'flex-start' : 'center',
        padding,
        minHeight: height,
        gap: '12px',
        width: '100%',
        flexShrink: 0,
      }}
    >
      {/* Back button */}
      {showBack && (
        <div
          style={{
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            background: backBg,
            flexShrink: 0,
            marginTop: isExtended ? '2px' : '0',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18l-6-6 6-6"
              stroke={backIconColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}

      {/* Title + optional subtitle */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <span
          style={{
            fontFamily: typography.fontFamily,
            fontSize: isExtended ? '20px' : '16px',
            fontWeight: isExtended ? 700 : 600,
            color: textColor,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: isExtended ? 'normal' : 'nowrap',
            lineHeight: 1.3,
          }}
        >
          {title}
        </span>

        {isExtended && (subtitle || variant === 'flow') && (
          <span
            style={{
              fontFamily: typography.fontFamily,
              fontSize: '14px',
              fontWeight: 400,
              color: subColor,
              lineHeight: 1.5,
              marginTop: '2px',
            }}
          >
            {subtitle || 'Descrição da tela ou tarefa'}
          </span>
        )}
      </div>
    </div>
  );
}
