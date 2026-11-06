import type { Metadata } from 'next';
import ContactSection from '@/components/ContactSection';

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Cuéntanos qué quieres automatizar o qué web necesitas. Te respondemos con una propuesta clara en menos de 24h.',
};

export default function ContactPage() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Contacto</span>
          <h1>
            Hablemos de tu <span className="gradient-text">proyecto</span>
          </h1>
          <p>Cuéntanos qué te gustaría automatizar o qué web necesitas: te respondemos con una propuesta concreta.</p>
        </div>
      </section>
      <ContactSection standalone />
    </>
  );
}
