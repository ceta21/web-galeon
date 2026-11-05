import { marquee } from '@/lib/content';

export default function Marquee() {
  const row = [...marquee, ...marquee];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {[0, 1].map((k) => (
          <div className="marquee__group" key={k}>
            {row.map((m, i) => (
              <span key={`${k}-${i}`}>
                {m}
                <i>✦</i>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
