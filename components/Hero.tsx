import Link from 'next/link';
import { hero } from '@/lib/content';
import HeroPanel from './HeroPanel';
import Icon from './Icon';

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero__grid" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__content">
          <span className="eyebrow">{hero.eyebrow}</span>
          <h1 className="hero__title">
            {hero.titleStart} <span className="gradient-text">{hero.titleHighlight}</span> {hero.titleEnd}
          </h1>
          <p className="hero__subtitle">{hero.subtitle}</p>
          <div className="hero__actions">
            <Link href={hero.primaryCta.href} className="btn btn--primary btn--lg">
              {hero.primaryCta.label}
              <Icon name="arrow" size={18} />
            </Link>
            <Link href={hero.secondaryCta.href} className="btn btn--outline btn--lg">
              {hero.secondaryCta.label}
            </Link>
          </div>
          <ul className="hero__badges">
            {hero.badges.map((b) => (
              <li key={b}>
                <Icon name="check" size={14} />
                {b}
              </li>
            ))}
          </ul>
        </div>
        <HeroPanel />
      </div>
    </section>
  );
}
