import { trust } from '@/lib/content';
import Reveal from './Reveal';

export default function TrustBar() {
  return (
    <div className="container">
      <Reveal className="trust">
        {trust.map((t) => (
          <div key={t.label} className="trust__item">
            <strong>{t.value}</strong>
            <span>{t.label}</span>
          </div>
        ))}
      </Reveal>
    </div>
  );
}
