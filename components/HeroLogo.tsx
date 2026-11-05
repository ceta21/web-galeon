'use client';

import Image from 'next/image';
import { useRef } from 'react';

// Logo flotante que se inclina siguiendo el ratón.
export default function HeroLogo({ chips }: { chips: string[] }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--rx', `${-y * 14}deg`);
    el.style.setProperty('--ry', `${x * 14}deg`);
  };
  const onLeave = () => {
    ref.current?.style.setProperty('--rx', '0deg');
    ref.current?.style.setProperty('--ry', '0deg');
  };

  return (
    <div className="hero-logo" ref={ref} onPointerMove={onMove} onPointerLeave={onLeave}>
      <div className="hero-logo__rings" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="hero-logo__glow" aria-hidden="true" />
      <div className="hero-logo__tilt">
        <Image src="/img/galeon-logo.png" alt="Logotipo de GALEON" width={460} height={460} priority className="hero-logo__img" />
      </div>
      {chips.map((chip, i) => (
        <span key={chip} className={`hero-chip hero-chip--${i + 1}`} aria-hidden="true">
          <i />
          {chip}
        </span>
      ))}
    </div>
  );
}
