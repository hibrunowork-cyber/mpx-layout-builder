import { CanvasNode } from '@/types/canvas';

interface Props {
  node: CanvasNode;
}

const BRAND = '#434ce4';

export function AndesPagination({ node }: Props) {
  const currentPage  = (node.props.currentPage  as number) ?? 2;
  const totalPages   = (node.props.totalPages   as number) ?? 20;
  const size         = node.variant.size ?? 'large';

  const isLarge = size === 'large';
  const btnSize = isLarge ? '40px' : '32px';
  const fontSize = isLarge ? '14px' : '12px';
  const inputW = isLarge ? '48px' : '38px';
  const inputH = isLarge ? '36px' : '28px';

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: isLarge ? '8px' : '6px',
        userSelect: 'none',
        fontFamily: 'Proxima Nova, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      {/* Label "Página" */}
      <span style={{ fontSize, color: '#666666', fontWeight: 400 }}>
        Página
      </span>

      {/* Current page input box */}
      <div
        style={{
          width: inputW,
          height: inputH,
          border: `1.5px solid ${BRAND}`,
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize,
          fontWeight: 600,
          color: '#1a1a2e',
        }}
      >
        {currentPage}
      </div>

      {/* "de N" */}
      <span style={{ fontSize, color: '#666666', fontWeight: 400 }}>
        de <strong style={{ color: '#1a1a2e', fontWeight: 700 }}>{totalPages}</strong>
      </span>

      {/* Prev button */}
      <div
        style={{
          width: btnSize,
          height: btnSize,
          borderRadius: '8px',
          border: `1.5px solid #d0d0d8`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: currentPage <= 1 ? 'not-allowed' : 'pointer',
          opacity: currentPage <= 1 ? 0.4 : 1,
          background: '#ffffff',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M15 18l-6-6 6-6" stroke="#434ce4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Next button */}
      <div
        style={{
          width: btnSize,
          height: btnSize,
          borderRadius: '8px',
          border: `1.5px solid #d0d0d8`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: currentPage >= totalPages ? 'not-allowed' : 'pointer',
          opacity: currentPage >= totalPages ? 0.4 : 1,
          background: '#ffffff',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M9 18l6-6-6-6" stroke="#434ce4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}
