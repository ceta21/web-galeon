'use client';

import { useEffect, useState } from 'react';

// Escribe y borra frases, como si la IA estuviera tecleando.
export default function Rotator({ prefix, words }: { prefix: string; words: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index];
    let delay = deleting ? 35 : 70;
    if (!deleting && text === word) delay = 1800;
    if (deleting && text === '') delay = 300;

    const t = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === '') {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      } else setText(word.slice(0, text.length + (deleting ? -1 : 1)));
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, index, words]);

  return (
    <p className="rotator">
      <span className="rotator__prompt">›</span> {prefix}{' '}
      <span className="rotator__word">{text}</span>
      <span className="rotator__caret" aria-hidden="true" />
      <span className="sr-only">{words.join(', ')}</span>
    </p>
  );
}
