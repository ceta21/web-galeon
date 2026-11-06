import { about, useCases, quote } from '@/lib/content';
import Reveal from './Reveal';
import Card from './Card';
import Icon from './Icon';

export default function About() {
  return (
    <section className="section" id="nosotros">
      <div className="container">
        <div className="about">
          <Reveal className="about__text">
            <span className="eyebrow">
              <b>03</b>Quiénes somos
            </span>
            <h2>{about.title}</h2>
            <p>{about.text}</p>
          </Reveal>
          <div className="about__points">
            {about.points.map((p, i) => (
              <Reveal key={p.title} delay={i * 100} className="point">
                <span className="point__check">
                  <Icon name="check" size={16} />
                </span>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="usecases" id="casos-de-uso">
          <Reveal className="usecases__head">
            <span className="eyebrow">Casos de uso</span>
            <h2>Qué puedes automatizar con GALEON</h2>
          </Reveal>
          <div className="usecases__grid">
            {useCases.map((u, i) => (
              <Reveal key={u.title} delay={i * 80}>
                <Card className="usecase">
                  <div className="icon-box icon-box--sm">
                    <Icon name={u.icon} size={20} />
                  </div>
                  <h3>{u.title}</h3>
                  <p>{u.description}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal as="blockquote" className="quote">
          <p>“{quote}”</p>
          <cite>Equipo GALEON</cite>
        </Reveal>
      </div>
    </section>
  );
}
