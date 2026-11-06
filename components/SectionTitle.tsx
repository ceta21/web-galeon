import Reveal from './Reveal';

// Título de sección editorial: número + etiqueta, titular con la palabra clave subrayada en
// cian y, en pantallas anchas, el subtítulo a la derecha.
export default function SectionTitle({
  index,
  eyebrow,
  title,
  accent,
  subtitle,
  stacked = false,
}: {
  index?: string;
  eyebrow: string;
  title: string;
  accent?: string;
  subtitle?: string;
  stacked?: boolean;
}) {
  return (
    <Reveal className={`section-title ${stacked || !subtitle ? 'section-title--stacked' : ''}`}>
      <div>
        <span className="eyebrow">
          {index && <b>{index}</b>}
          {eyebrow}
        </span>
        <h2>
          {title} {accent && <span className="gradient-text">{accent}</span>}
        </h2>
      </div>
      {subtitle && <p>{subtitle}</p>}
    </Reveal>
  );
}
