'use client';

import { useState } from 'react';
import { site } from '@/lib/content';
import Reveal from './Reveal';
import Icon from './Icon';

type Errors = Partial<Record<'name' | 'email' | 'message', string>>;

export default function ContactSection({ standalone = false }: { standalone?: boolean }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const [errors, setErrors] = useState<Errors>({});
  const [serverMsg, setServerMsg] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setStatus('sending');
    setErrors({});
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrors(json.errors ?? {});
        setServerMsg(json.error ?? 'Revisa los campos marcados.');
        setStatus('error');
        return;
      }
      setServerMsg(json.message);
      setStatus('ok');
      form.reset();
    } catch {
      setServerMsg('No se ha podido enviar. Inténtalo de nuevo o escríbenos por email.');
      setStatus('error');
    }
  }

  return (
    <section className={`contact ${standalone ? 'contact--standalone' : ''}`} id="contacto">
      <div className="container">
        <Reveal className="contact__card">
          <div className="contact__info">
            <span className="eyebrow">Empecemos</span>
            <h2>
              ¿Listo para poner la <span className="gradient-text">IA</span> a trabajar?
            </h2>
            <p>
              Cuéntanos qué proceso te quita más tiempo o qué web necesitas, y te devolvemos una propuesta concreta en
              menos de 24h.
            </p>
            <ul className="contact__perks">
              <li>
                <Icon name="check" size={16} /> Diagnóstico inicial gratuito
              </li>
              <li>
                <Icon name="check" size={16} /> Sin compromiso
              </li>
              <li>
                <Icon name="check" size={16} /> Respuesta en menos de 24h
              </li>
            </ul>
            <a className="contact__mail" href={`mailto:${site.email}`}>
              <Icon name="mail" size={18} /> {site.email}
            </a>
          </div>

          <form className="form" onSubmit={onSubmit} noValidate>
            {status === 'ok' ? (
              <div className="form__success" role="status">
                <span>
                  <Icon name="check" size={28} />
                </span>
                <h3>¡Mensaje enviado!</h3>
                <p>{serverMsg}</p>
                <button type="button" className="btn btn--ghost" onClick={() => setStatus('idle')}>
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <>
                <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
                <Field label="Nombre" name="name" error={errors.name} autoComplete="name" />
                <Field label="Correo electrónico" name="email" type="email" error={errors.email} autoComplete="email" />
                <Field label="Cuéntanos tu proyecto" name="message" textarea error={errors.message} />
                {status === 'error' && !Object.keys(errors).length && (
                  <p className="form__error" role="alert">
                    {serverMsg}
                  </p>
                )}
                <button type="submit" className="btn btn--primary btn--lg form__submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Enviando…' : 'Enviar mensaje'}
                  <Icon name="send" size={18} />
                </button>
              </>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = 'text',
  textarea,
  error,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  error?: string;
  autoComplete?: string;
}) {
  const props = {
    id: name,
    name,
    placeholder: ' ',
    required: true,
    'aria-invalid': !!error,
    'aria-describedby': error ? `${name}-error` : undefined,
  };
  return (
    <div className={`field ${error ? 'field--error' : ''}`}>
      {textarea ? <textarea rows={5} {...props} /> : <input type={type} autoComplete={autoComplete} {...props} />}
      <label htmlFor={name}>{label}</label>
      {error && (
        <span className="field__error" id={`${name}-error`}>
          {error}
        </span>
      )}
    </div>
  );
}
