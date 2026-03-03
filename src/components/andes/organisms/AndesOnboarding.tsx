import { CanvasNode } from '@/types/canvas';
import { typography } from '@/data/tokens';

interface Props {
  node: CanvasNode;
}

const BRAND = '#434ce4';

export function AndesOnboarding({ node }: Props) {
  const title = (node.props.title as string) ?? 'Bem-vindo ao Mercado Pago';
  const description = (node.props.description as string) ?? 'Gerencie seu dinheiro com mais facilidade e segurança.';
  const backgroundImage = (node.props.backgroundImage as string) ?? '';
  const type = node.variant.type ?? 'centered';

  if (type === 'fullImage') {
    // Full-image variant: image takes most of screen, content overlay at bottom
    return (
      <div
        style={{
          width: '100%',
          minHeight: '480px',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            ...(backgroundImage
              ? {
                  backgroundImage: `url(${backgroundImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }
              : {
                  background: 'linear-gradient(160deg, #e9f1ff 0%, #c5d5f5 50%, #a0b8f0 100%)',
                }),
          }}
        >
          {!backgroundImage && (
            <>
              {/* Decorative circles (placeholder only) */}
              <div
                style={{
                  position: 'absolute',
                  top: '10%',
                  right: '10%',
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: 'rgba(67,76,228,0.12)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '30%',
                  left: '5%',
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'rgba(67,76,228,0.08)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '80px',
                  height: '80px',
                  borderRadius: '20px',
                  background: BRAND,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="15" r="7" fill="white" opacity="0.9" />
                  <path d="M8 32c0-6.627 5.373-12 12-12s12 5.373 12 12" fill="white" opacity="0.7" />
                </svg>
              </div>
            </>
          )}
        </div>

        {/* Bottom content card */}
        <div
          style={{
            marginTop: 'auto',
            position: 'relative',
            background: '#ffffff',
            borderRadius: '20px 20px 0 0',
            padding: '24px 20px 20px',
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontFamily: typography.fontFamily,
              fontSize: '20px',
              fontWeight: typography.weights.bold,
              color: '#1a1a2e',
              marginBottom: '8px',
              lineHeight: 1.3,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontFamily: typography.fontFamily,
              fontSize: '14px',
              color: '#666666',
              lineHeight: 1.5,
            }}
          >
            {description}
          </div>
        </div>
      </div>
    );
  }

  // centered variant (default)
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '40px 24px 32px',
        gap: '20px',
        background: '#ffffff',
      }}
    >
      {/* Illustration */}
      <div
        style={{
          width: '160px',
          height: '160px',
          borderRadius: '24px',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #e9f1ff 0%, #c5d5f5 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {backgroundImage ? (
          <img
            src={backgroundImage}
            alt={title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '18px',
              background: BRAND,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="15" r="7" fill="white" opacity="0.9" />
              <path d="M8 32c0-6.627 5.373-12 12-12s12 5.373 12 12" fill="white" opacity="0.7" />
            </svg>
          </div>
        )}
      </div>

      {/* Text */}
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div
          style={{
            fontFamily: typography.fontFamily,
            fontSize: '22px',
            fontWeight: typography.weights.bold,
            color: '#1a1a2e',
            lineHeight: 1.3,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: typography.fontFamily,
            fontSize: '14px',
            color: '#666666',
            lineHeight: 1.6,
          }}
        >
          {description}
        </div>
      </div>
    </div>
  );
}
