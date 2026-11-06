import { process } from '@/lib/content';
import SectionTitle from './SectionTitle';
import Reveal from './Reveal';

// Proceso en línea de tiempo: una línea cian que une los cuatro pasos.
export default function Process() {
  return (
    <section className="section section--alt" id="proceso">
      <div className="container">
        <SectionTitle
          index="04"
          eyebrow="Cómo trabajamos"
          title="De la idea al"
          accent="lanzamiento"
          subtitle="Un proceso claro, sin sorpresas, pensado para avanzar rápido sin perder calidad."
        />
        <ol className="timeline">
          {process.map((p, i) => (
            <Reveal as="li" key={p.number} delay={i * 120} className="timeline__step">
              <span className="timeline__num">{p.number}</span>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
