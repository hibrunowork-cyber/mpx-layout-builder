import { RuleViolation } from '@/types/rules';
import { CanvasNode } from '@/types/canvas';

export type Grade = 'A' | 'B' | 'C' | 'D' | 'F';

export interface ScoreResult {
  score: number;      // 0–100
  grade: Grade;
  errors: number;
  warnings: number;
  details: string[];
}

function toGrade(score: number): Grade {
  if (score >= 90) return 'A';
  if (score >= 75) return 'B';
  if (score >= 60) return 'C';
  if (score >= 40) return 'D';
  return 'F';
}

function countNodes(nodes: CanvasNode[]): number {
  let count = 0;
  function walk(arr: CanvasNode[]) {
    for (const n of arr) {
      count++;
      walk(n.children);
    }
  }
  walk(nodes);
  return count;
}

export function calculateScore(
  nodes: CanvasNode[],
  violations: RuleViolation[]
): ScoreResult {
  const errors = violations.filter((v) => v.severity === 'error').length;
  const warnings = violations.filter((v) => v.severity === 'warning').length;
  const totalNodes = countNodes(nodes);

  // Pontuação base
  let score = 100;

  // Penalidade por erros: -15 cada (errors são críticos)
  score -= errors * 15;

  // Penalidade por warnings: -5 cada
  score -= warnings * 5;

  // Bônus por complexidade saudável (layouts com 3+ componentes são mais ricos)
  if (totalNodes >= 3 && errors === 0) score = Math.min(100, score + 5);
  if (totalNodes >= 6 && errors === 0) score = Math.min(100, score + 5);

  // Canvas vazio = 0
  if (totalNodes === 0) score = 0;

  score = Math.max(0, Math.min(100, score));

  const details: string[] = [];
  if (totalNodes === 0) {
    details.push('Canvas vazio — arraste componentes para começar');
  } else {
    details.push(`${totalNodes} componente${totalNodes !== 1 ? 's' : ''} no layout`);
    if (errors > 0) details.push(`${errors} erro${errors !== 1 ? 's' : ''} crítico${errors !== 1 ? 's' : ''}`);
    if (warnings > 0) details.push(`${warnings} aviso${warnings !== 1 ? 's' : ''}`);
    if (errors === 0 && warnings === 0) details.push('Sem violações de regra');
  }

  return {
    score,
    grade: toGrade(score),
    errors,
    warnings,
    details,
  };
}
