'use client';

import { useState } from 'react';
import { faqs } from '@/lib/content';
import SectionTitle from './SectionTitle';
import Reveal from './Reveal';
import Icon from './Icon';

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section section--alt" id="faqs">
      <div className="container container--narrow">
        <SectionTitle index="06"
          eyebrow="Dudas frecuentes" title="Preguntas"
          accent="frecuentes"
        />
        <Reveal className="faq">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.question} className={`faq__item ${isOpen ? 'is-open' : ''}`}>
                <h3>
                  <button
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    id={`faq-q-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    {f.question}
                    <span className="faq__icon">
                      <Icon name="plus" size={18} />
                    </span>
                  </button>
                </h3>
                <div className="faq__answer" id={`faq-${i}`} role="region" aria-labelledby={`faq-q-${i}`}>
                  <div>
                    <p>{f.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
