'use client';

import { RuleViolation } from '@/types/rules';
import { useScore } from '@/hooks/useScore';
import { useCanvasStore } from '@/store/canvas-store';
import { RuleViolationCard } from './RuleViolationCard';
import { app } from '@/data/tokens';
import { Grade } from '@/engine/score-calculator';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface Props {
  violations: RuleViolation[];
}

const gradeColors: Record<Grade, { text: string; bg: string; border: string }> = {
  A: { text: '#22c55e', bg: '#0a2b14', border: '#166534' },
  B: { text: '#60a5fa', bg: '#0a1a2e', border: '#1e40af' },
  C: { text: app.warningYellow, bg: '#1a1200', border: '#78400a' },
  D: { text: '#fb923c', bg: '#1a0e08', border: '#9a3412' },
  F: { text: app.errorRed, bg: '#2a0a0e', border: '#991b1b' },
};

export function ScorePanel({ violations }: Props) {
  const { nodes } = useCanvasStore();
  const score = useScore(nodes, violations);
  const [expanded, setExpanded] = useState(false);

  const gradeStyle = gradeColors[score.grade];
  const hasViolations = violations.length > 0;

  return (
    <footer
      style={{
        borderTop: `1px solid ${app.border}`,
        background: app.bg,
        flexShrink: 0,
      }}
    >
      {/* Summary bar */}
      <div
        onClick={() => hasViolations && setExpanded((p) => !p)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '8px 20px',
          cursor: hasViolations ? 'pointer' : 'default',
        }}
      >
        {/* Grade badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              border: `1.5px solid ${gradeStyle.border}`,
              background: gradeStyle.bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-fraunces)',
              fontSize: '18px',
              fontWeight: 700,
              color: gradeStyle.text,
            }}
          >
            {score.grade}
          </div>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-geist-sans)',
                fontSize: '13px',
                fontWeight: 600,
                color: gradeStyle.text,
              }}
            >
              {score.score}/100
            </div>
            <div
              style={{
                fontFamily: 'var(--font-geist-sans)',
                fontSize: '11px',
                color: app.textDim,
              }}
            >
              Score de composição
            </div>
          </div>
        </div>

        {/* Score bar */}
        <div
          style={{
            flex: 1,
            height: '4px',
            background: app.surface,
            borderRadius: '2px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${score.score}%`,
              background: gradeStyle.text,
              borderRadius: '2px',
              transition: 'width 400ms ease',
            }}
          />
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '12px', flexShrink: 0 }}>
          {score.errors > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: app.errorRed }} />
              <span style={{ fontFamily: 'var(--font-geist-sans)', fontSize: '12px', color: app.errorRed }}>
                {score.errors} erro{score.errors !== 1 ? 's' : ''}
              </span>
            </div>
          )}
          {score.warnings > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: app.warningYellow }} />
              <span style={{ fontFamily: 'var(--font-geist-sans)', fontSize: '12px', color: app.warningYellow }}>
                {score.warnings} aviso{score.warnings !== 1 ? 's' : ''}
              </span>
            </div>
          )}
          {score.errors === 0 && score.warnings === 0 && nodes.length > 0 && (
            <span style={{ fontFamily: 'var(--font-geist-sans)', fontSize: '12px', color: '#22c55e' }}>
              ✓ Sem violações
            </span>
          )}
        </div>

        {/* Toggle */}
        {hasViolations && (
          <button
            onClick={(e) => { e.stopPropagation(); setExpanded((p) => !p); }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: app.textDim,
              display: 'flex',
              alignItems: 'center',
              padding: '2px',
            }}
          >
            {expanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </button>
        )}
      </div>

      {/* Expanded violations list */}
      {expanded && hasViolations && (
        <div
          style={{
            padding: '0 20px 12px',
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
          }}
        >
          {violations.map((v) => (
            <div key={`${v.ruleId}-${v.nodeId}`} style={{ minWidth: '280px', flex: '1 1 280px', maxWidth: '400px' }}>
              <RuleViolationCard violation={v} />
            </div>
          ))}
        </div>
      )}
    </footer>
  );
}
