'use client';

import { useMemo } from 'react';
import { CanvasNode } from '@/types/canvas';
import { RuleViolation } from '@/types/rules';
import { calculateScore, ScoreResult } from '@/engine/score-calculator';

export function useScore(nodes: CanvasNode[], violations: RuleViolation[]): ScoreResult {
  return useMemo(() => calculateScore(nodes, violations), [nodes, violations]);
}
