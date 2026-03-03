'use client';

import { RuleViolation } from '@/types/rules';
import { useCanvasStore } from '@/store/canvas-store';
import { app } from '@/data/tokens';
import { AlertTriangle, XCircle, ChevronRight } from 'lucide-react';

interface Props {
  violation: RuleViolation;
}

export function RuleViolationCard({ violation }: Props) {
  const { selectNode } = useCanvasStore();
  const isError = violation.severity === 'error';

  return (
    <div
      onClick={() => selectNode(violation.nodeId)}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '8px',
        padding: '8px 12px',
        borderRadius: '6px',
        border: `1px solid ${isError ? `${app.errorRed}40` : `${app.warningYellow}40`}`,
        background: isError ? '#2a0a0e' : '#1a1200',
        cursor: 'pointer',
        transition: 'background 120ms',
        flexShrink: 0,
      }}
    >
      {isError ? (
        <XCircle size={14} color={app.errorRed} style={{ marginTop: '1px', flexShrink: 0 }} />
      ) : (
        <AlertTriangle size={14} color={app.warningYellow} style={{ marginTop: '1px', flexShrink: 0 }} />
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        {violation.componentName && (
          <div
            style={{
              fontFamily: 'var(--font-geist-sans)',
              fontSize: '10px',
              fontWeight: 600,
              color: isError ? app.errorRed : app.warningYellow,
              letterSpacing: '0.04em',
              marginBottom: '1px',
            }}
          >
            {violation.componentName}
          </div>
        )}
        <div
          style={{
            fontFamily: 'var(--font-geist-sans)',
            fontSize: '12px',
            color: app.textMuted,
            lineHeight: 1.45,
          }}
        >
          {violation.message}
        </div>
      </div>
      <ChevronRight size={12} color={app.textDim} style={{ flexShrink: 0, marginTop: '2px' }} />
    </div>
  );
}
