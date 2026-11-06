'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { novaScenarios } from '@/lib/content';
import Icon from './Icon';

// Conversación de ejemplo con Nova: el cliente escribe, Nova responde y la automatización
// deja hechas las tareas. Cambia de sector solo cada pocos segundos o al pulsar una pestaña.
export default function NovaChat() {
  const [index, setIndex] = useState(0);
  const [stage, setStage] = useState(0); // 0 nada · 1 cliente · 2 escribiendo · 3 respuesta · 4+ acciones
  const scenario = novaScenarios[index];
  const lastStage = 3 + scenario.actions.length;

  useEffect(() => {
    const delays = [400, 900, 1300, 700];
    const wait = stage >= lastStage ? 3800 : (delays[stage] ?? 450);
    const t = setTimeout(() => {
      if (stage >= lastStage) {
        setIndex((i) => (i + 1) % novaScenarios.length);
        setStage(0);
      } else setStage((s) => s + 1);
    }, wait);
    return () => clearTimeout(t);
  }, [stage, lastStage]);

  const choose = (i: number) => {
    setIndex(i);
    setStage(0);
  };

  return (
    <div className="nova">
      <div className="nova__head">
        <span className="nova__avatar">
          <Image src="/img/galeon-simbolo-blanco.svg" alt="" width={30} height={31} unoptimized />
        </span>
        <div>
          <strong>Nova</strong>
          <span>
            <i /> Atendiendo en directo
          </span>
        </div>
        <div className="nova__tabs" role="tablist" aria-label="Elige un sector">
          {novaScenarios.map((s, i) => (
            <button key={s.sector} role="tab" aria-selected={i === index} className={i === index ? 'is-active' : ''} onClick={() => choose(i)}>
              {s.sector}
            </button>
          ))}
        </div>
      </div>

      <div className="nova__body" aria-live="polite">
        {stage >= 1 && <p className="nova__msg nova__msg--user">{scenario.user}</p>}
        {stage === 2 && (
          <p className="nova__msg nova__msg--bot nova__typing" aria-label="Nova está escribiendo">
            <span />
            <span />
            <span />
          </p>
        )}
        {stage >= 3 && <p className="nova__msg nova__msg--bot">{scenario.reply}</p>}
      </div>

      <ul className="nova__actions">
        {scenario.actions.map((a, i) => (
          <li key={a} className={stage >= 4 + i ? 'is-done' : ''}>
            <Icon name="check" size={13} />
            {a}
          </li>
        ))}
      </ul>
      <p className="nova__note">Conversación de ejemplo</p>
    </div>
  );
}
