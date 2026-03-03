'use client';

import { useEffect, useState, useRef } from 'react';
import { CanvasNode } from '@/types/canvas';
import { RuleViolation } from '@/types/rules';
import { validateComposition } from '@/engine/rules-engine';
import { COMPOSITION_RULES } from '@/data/composition-rules';

export function useCompositionRules(nodes: CanvasNode[]): RuleViolation[] {
  const [violations, setViolations] = useState<RuleViolation[]>([]);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const result = validateComposition(nodes, COMPOSITION_RULES);
      setViolations(result);
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [nodes]);

  return violations;
}
