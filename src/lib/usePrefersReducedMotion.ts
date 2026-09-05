'use client';

import { useEffect, useState } from 'react';

/**
 * Direct prefers-reduced-motion check. framer-motion ships its own
 * useReducedMotion, but it snapshots the media query once via a shared
 * module-level singleton the first time any motion component mounts
 * anywhere on the page — in a tree with many motion components that can
 * resolve before this component needs it, and it never updates. Reading
 * matchMedia ourselves, after mount, is small and reliable.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(query.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    query.addEventListener('change', handler);
    return () => query.removeEventListener('change', handler);
  }, []);

  return reduced;
}
