import Link from 'next/link';
import { packages } from '@/lib/content';
import SectionTitle from './SectionTitle';
import Reveal from './Reveal';
import Icon from './Icon';

export default function Packages() {
  return (
    <section className="section" id="paquetes">
      <div className="container">
        <SectionTitle
          eyebrow="Cómo empezar"
          title="Elige cómo quieres"
          accent="empezar"
          subtitle="Cada servicio funciona de forma independiente: no hace falta contratarlo todo junto."
        />
        <div className="packages">
          {packages.map((p, i) => (
            <Reveal key={p.name} delay={i * 100} className={`package ${p.featured ? 'package--featured' : ''}`}>
              {p.featured && <span className="package__badge">Recomendado</span>}
              <h3>{p.name}</h3>
              <p className="package__price">{p.price}</p>
              <p className="package__desc">{p.description}</p>
              <ul>
                {p.items.map((it) => (
                  <li key={it}>
                    <Icon name="check" size={16} />
                    {it}
                  </li>
                ))}
              </ul>
              <Link href="/#contacto" className={`btn ${p.featured ? 'btn--primary' : 'btn--ghost'} package__cta`}>
                Solicitar presupuesto
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
