import Reveal from './Reveal';

// Título de sección: etiqueta en píldora, titular con la parte final en degradado y subtítulo.
export default function SectionTitle({
  eyebrow,
  title,
  accent,
  subtitle,
  align = 'center',
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  subtitle?: string;
  align?: 'center' | 'left';
}) {
  return (
    <Reveal className={`section-title section-title--${align}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>
        {title} {accent && <span className="gradient-text">{accent}</span>}
      </h2>
      {subtitle && <p>{subtitle}</p>}
    </Reveal>
  );
}
