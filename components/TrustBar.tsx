import { highlights } from '@/lib/content';
import Reveal from './Reveal';

// Banda azul con degradado y las cifras clave de cómo trabajamos.
export default function TrustBar() {
  return (
    <section className="stats" aria-label="GALEON en cifras">
      <div className="container">
        <Reveal className="stats__head">
          <span className="stats__eyebrow">Cómo trabajamos, en cifras</span>
          <h2>Compromisos que cumplimos en cada proyecto</h2>
        </Reveal>
        <div className="stats__grid">
          {highlights.map((h, i) => (
            <Reveal key={h.label} delay={i * 80} className="stats__item">
              <strong>{h.value}</strong>
              <span>{h.label}</span>
              <small>{h.detail}</small>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
