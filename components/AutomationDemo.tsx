'use client';

import { useEffect, useRef, useState } from 'react';
import { demoFlow } from '@/lib/content';
import SectionTitle from './SectionTitle';
import Reveal from './Reveal';
import Icon from './Icon';

// Simula en bucle una automatización real: el usuario ve cómo un lead se procesa solo.
export default function AutomationDemo() {
  const [step, setStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setRunning(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(
      () => setStep((s) => (s >= demoFlow.length ? -1 : s + 1)),
      step >= demoFlow.length ? 2600 : step === -1 ? 500 : 1100,
    );
    return () => clearTimeout(t);
  }, [running, step]);

  const done = step >= demoFlow.length;
  const fill = Math.max(0, Math.min(step, demoFlow.length - 1)) / (demoFlow.length - 1);

  return (
    <section className="section section--alt" id="demo">
      <div className="container demo">
        <div className="demo__text">
          <SectionTitle
            eyebrow="Cómo funciona"
            title="Así trabaja una"
            accent="automatización de GALEON"
            align="left"
            subtitle="Un mensaje entra por tu web, la IA lo entiende, lo registra en tu CRM y responde, en segundos y sin que nadie de tu equipo toque nada."
          />
          <Reveal className="demo__stats">
            <div>
              <strong>24/7</strong>
              <span>Siempre activo</span>
            </div>
            <div>
              <strong>0</strong>
              <span>Tareas manuales</span>
            </div>
            <div>
              <strong>Segundos</strong>
              <span>en vez de horas</span>
            </div>
          </Reveal>
        </div>

        <Reveal className="demo__panel">
          <div className="demo__window" ref={ref}>
            <div className="demo__bar">
              <span />
              <span />
              <span />
              <em>galeon · flujo-leads</em>
              <b className={done ? 'is-done' : ''}>{done ? 'Completado' : step >= 0 ? 'Ejecutando…' : 'En espera'}</b>
            </div>
            <ol className="flow" style={{ ['--fill' as string]: fill }}>
              {demoFlow.map((f, i) => (
                <li key={f.title} className={`flow__step ${i < step || done ? 'is-done' : ''} ${i === step && !done ? 'is-active' : ''}`}>
                  <span className="flow__dot">{i < step || done ? <Icon name="check" size={14} /> : i + 1}</span>
                  <div>
                    <strong>{f.title}</strong>
                    <p>{f.detail}</p>
                  </div>
                  <time>{f.time}</time>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
