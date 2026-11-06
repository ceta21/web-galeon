'use client';

import Image from 'next/image';
import { useState } from 'react';
import { heroPanel } from '@/lib/content';

// Tarjeta interactiva tipo "cuadro de mando": pestañas, indicadores, barras y donut.
export default function HeroPanel() {
  const [tab, setTab] = useState(0);
  const [hoverBar, setHoverBar] = useState<number | null>(null);
  const current = heroPanel.tabs[tab];

  // Donut: cada área es un arco de la circunferencia (r = 15.915 => perímetro 100).
  let offset = 0;
  const arcs = heroPanel.areas.map((a, i) => {
    const value = current.mix[i];
    const arc = { ...a, value, dash: `${value} ${100 - value}`, offset: 25 - offset };
    offset += value;
    return arc;
  });
  const top = arcs.reduce((a, b) => (b.value > a.value ? b : a));

  return (
    <div className="panel" aria-label="Ejemplo de panel de automatizaciones">
      <div className="panel__head">
        <strong>{heroPanel.title}</strong>
        <div className="panel__tabs" role="tablist">
          {heroPanel.tabs.map((t, i) => (
            <button
              key={t.label}
              role="tab"
              aria-selected={tab === i}
              className={tab === i ? 'is-active' : ''}
              onClick={() => setTab(i)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="panel__kpis">
        {current.kpis.map((k) => (
          <div key={k.label} className="panel__kpi">
            <strong key={k.value + tab}>{k.value}</strong>
            <span>{k.label}</span>
          </div>
        ))}
      </div>

      <div className="panel__charts">
        <div>
          <p className="panel__label">Tareas automatizadas por día</p>
          <div className="bars">
            {current.bars.map((v, i) => (
              <div
                key={i}
                className={`bars__col ${hoverBar === i ? 'is-hover' : ''}`}
                onPointerEnter={() => setHoverBar(i)}
                onPointerLeave={() => setHoverBar(null)}
              >
                <span className="bars__tip">{v}</span>
                <span className="bars__bar" style={{ height: `${v}%` }} />
                <em>{heroPanel.days[i]}</em>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="panel__label">Reparto por área</p>
          <div className="donut">
            <svg viewBox="0 0 42 42" aria-hidden="true">
              <circle cx="21" cy="21" r="15.915" fill="none" stroke="#eef2fa" strokeWidth="6" />
              {arcs.map((a) => (
                <circle
                  key={a.key}
                  cx="21"
                  cy="21"
                  r="15.915"
                  fill="none"
                  stroke={a.color}
                  strokeWidth="6"
                  strokeDasharray={a.dash}
                  strokeDashoffset={a.offset}
                />
              ))}
            </svg>
            <div className="donut__center">
              <strong>{top.value}%</strong>
              <span>{top.label}</span>
            </div>
          </div>
          <ul className="legend">
            {arcs.map((a) => (
              <li key={a.key}>
                <i style={{ background: a.color }} />
                {a.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="panel__note">{heroPanel.note}</p>

      <div className="panel__nova" aria-hidden="true">
        <Image src="/img/galeon-simbolo-blanco.svg" alt="" width={34} height={35} unoptimized />
        <div>
          <strong>Nova ha atendido a un cliente</strong>
          <span>
            <i /> Lead guardado en el CRM
          </span>
        </div>
      </div>
    </div>
  );
}
