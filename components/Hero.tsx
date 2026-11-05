import Link from 'next/link';
import { hero, services } from '@/lib/content';
import Icon from './Icon';

// Las dos líneas de negocio principales, resumidas en tarjetas al pie del hero.
const highlights = [services[0], services[2]];

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="container hero__inner">
        <span className="eyebrow eyebrow--light">{hero.eyebrow}</span>
        <h1 className="hero__title">
          {hero.titleStart} <span className="accent">{hero.titleHighlight}</span> {hero.titleEnd}
        </h1>
        <p className="hero__subtitle">{hero.subtitle}</p>
        <div className="hero__actions">
          <Link href={hero.primaryCta.href} className="btn btn--primary btn--lg">
            {hero.primaryCta.label}
            <Icon name="arrow" size={18} />
          </Link>
          <Link href={hero.secondaryCta.href} className="btn btn--outline-light btn--lg">
            {hero.secondaryCta.label}
          </Link>
        </div>

        <div className="hero__cards">
          {highlights.map((s) => (
            <Link key={s.title} href="/#servicios" className="hero-card">
              <span className="icon-box icon-box--sm">
                <Icon name={s.icon} size={20} />
              </span>
              <span>
                <strong>{s.title}</strong>
                <span>{s.description}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
