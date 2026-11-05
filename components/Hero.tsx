import Link from 'next/link';
import { hero } from '@/lib/content';
import NeuralCanvas from './NeuralCanvas';
import Rotator from './Rotator';
import HeroLogo from './HeroLogo';
import Icon from './Icon';

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <NeuralCanvas />
      <div className="hero__aurora" aria-hidden="true" />
      <div className="hero__grid" aria-hidden="true" />

      <div className="container hero__inner">
        <div className="hero__content">
          <span className="badge">
            <span className="badge__dot" />
            {hero.eyebrow}
          </span>
          <h1 className="hero__title">
            {hero.titleStart} <span className="gradient-text">{hero.titleHighlight}</span> {hero.titleEnd}
          </h1>
          <p className="hero__subtitle">{hero.subtitle}</p>
          <Rotator prefix={hero.rotatorPrefix} words={hero.rotatorWords} />
          <div className="hero__actions">
            <Link href={hero.primaryCta.href} className="btn btn--primary btn--lg">
              {hero.primaryCta.label}
              <Icon name="arrow" size={18} />
            </Link>
            <Link href={hero.secondaryCta.href} className="btn btn--ghost btn--lg">
              {hero.secondaryCta.label}
            </Link>
          </div>
        </div>

        <HeroLogo chips={hero.chips} />
      </div>

      <a href="#servicios" className="hero__scroll" aria-label="Bajar a servicios">
        <span />
      </a>
    </section>
  );
}
