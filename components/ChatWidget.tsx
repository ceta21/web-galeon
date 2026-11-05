'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

type Msg = { role: 'user' | 'assistant'; content: string; error?: boolean };

const SUGGESTIONS = ['¿Qué podéis automatizar?', '¿Cuánto tarda un proyecto?', 'Quiero una web nueva'];

// Asistente "Nova": habla con /api/assistant, que llama a Groq desde el servidor.
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: 'assistant',
      content: '¡Hola! Soy Nova, la asistente de GALEON 👋 ¿Qué proceso de tu negocio te gustaría automatizar?',
    },
  ]);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || typing) return;
    const next: Msg[] = [...messages, { role: 'user', content }];
    setMessages(next);
    setInput('');
    setTyping(true);
    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: next.filter((m) => !m.error).slice(-10).map(({ role, content }) => ({ role, content })),
        }),
      });
      const json = await res.json();
      setMessages((m) => [
        ...m,
        res.ok ? { role: 'assistant', content: json.reply } : { role: 'assistant', content: json.error, error: true },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: 'assistant', content: 'No he podido conectar. Inténtalo de nuevo en unos segundos.', error: true },
      ]);
    } finally {
      setTyping(false);
    }
  }

  const showSuggestions = messages.length === 1;

  return (
    <div className={`chat ${open ? 'is-open' : ''}`}>
      <div className="chat__panel" role="dialog" aria-label="Chat con Nova, asistente de GALEON" hidden={!open}>
        <header className="chat__head">
          <div className="chat__avatar">
            <Image src="/img/galeon-mark.png" alt="" width={36} height={36} />
          </div>
          <div>
            <strong>Nova</strong>
            <span>
              <i /> Asistente IA · en línea
            </span>
          </div>
          <button className="chat__close" onClick={() => setOpen(false)} aria-label="Cerrar chat">
            <Icon name="close" size={18} />
          </button>
        </header>

        <div className="chat__list" ref={listRef} aria-live="polite">
          {messages.map((m, i) => (
            <div key={i} className={`chat__msg chat__msg--${m.role} ${m.error ? 'chat__msg--error' : ''}`}>
              {m.content}
            </div>
          ))}
          {typing && (
            <div className="chat__msg chat__msg--assistant chat__typing" aria-label="Nova está escribiendo">
              <span />
              <span />
              <span />
            </div>
          )}
          {showSuggestions && (
            <div className="chat__suggestions">
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => send(s)}>
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        <form
          className="chat__form"
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu mensaje…"
            maxLength={600}
            aria-label="Tu mensaje"
          />
          <button type="submit" disabled={!input.trim() || typing} aria-label="Enviar">
            <Icon name="send" size={18} />
          </button>
        </form>
      </div>

      <button className="chat__launcher" onClick={() => setOpen((v) => !v)} aria-label={open ? 'Cerrar chat' : 'Abrir chat con Nova'} aria-expanded={open}>
        {open ? <Icon name="close" size={24} /> : <Icon name="chat" size={26} />}
      </button>
    </div>
  );
}
