'use client';

import type { ReactNode } from 'react';

// Tarjeta con un foco de luz que sigue al ratón.
export default function SpotlightCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return (
    <article className={`spotlight ${className}`} onPointerMove={onMove}>
      {children}
    </article>
  );
}
