import Link from 'next/link';
import Image from 'next/image';
import { hero } from '@/lib/content';
import NovaChat from './NovaChat';
import Icon from './Icon';

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      {/* Espiral del logo, muy sutil, como textura de fondo */}
      <Image src="/img/galeon-simbolo-blanco.svg" alt="" width={700} height={715} className="hero__watermark" unoptimized aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__content">
          <span className="eyebrow eyebrow--light">{hero.eyebrow}</span>
          <h1 className="hero__title">
            {hero.titleStart} <span className="gradient-text">{hero.titleHighlight}</span> {hero.titleEnd}
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
        </div>
        <NovaChat />
      </div>

      <div className="container">
        <ul className="hero__badges">
          {hero.badges.map((b) => (
            <li key={b}>
              <Icon name="spark" size={14} />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
