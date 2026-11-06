import { services } from '@/lib/content';
import SectionTitle from './SectionTitle';
import Reveal from './Reveal';
import Icon from './Icon';

// Servicios en formato lista editorial: una fila por servicio.
export default function Services() {
  return (
    <section className="section" id="servicios">
      <div className="container">
        <SectionTitle
          index="01"
          eyebrow="Qué hacemos"
          title="IA aplicada a tu negocio,"
          accent="de principio a fin"
          subtitle="Combinamos consultoría de inteligencia artificial, automatización y desarrollo web para que tu empresa funcione mejor con menos esfuerzo manual."
        />
        <ol className="services">
          {services.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 80} className="service">
              <span className="service__num">0{i + 1}</span>
              <span className="service__icon">
                <Icon name={s.icon} size={22} />
              </span>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
              <ul className="service__tags">
                {s.tags.map((t) => (
                  <li key={t}>#{t}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
