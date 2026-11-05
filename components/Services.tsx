import { services } from '@/lib/content';
import SectionTitle from './SectionTitle';
import Card from './Card';
import Reveal from './Reveal';
import Icon from './Icon';

export default function Services() {
  return (
    <section className="section" id="servicios">
      <div className="container">
        <SectionTitle
          eyebrow="Qué hacemos"
          title="IA aplicada a tu negocio, de principio a fin"
          subtitle="Combinamos consultoría de inteligencia artificial, automatización y desarrollo web para que tu empresa funcione mejor con menos esfuerzo manual."
        />
        <div className="bento">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 90} className={`bento__cell bento__cell--${i + 1}`}>
              <Card className="service-card">
                <div className="icon-box">
                  <Icon name={s.icon} size={24} />
                </div>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
                <ul className="tags">
                  {s.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <span className="service-card__index" aria-hidden="true">
                  0{i + 1}
                </span>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
