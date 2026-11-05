'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { nav } from '@/lib/content';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const sections = nav
      .map((n) => document.getElementById(n.href.split('#')[1]))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((s) => io.observe(s));

    return () => {
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <Link href="/" className="navbar__brand" onClick={() => setOpen(false)}>
          <Image src="/img/galeon-mark.png" alt="" width={40} height={40} priority />
          <span>GALEON</span>
        </Link>

        <nav className="navbar__links" aria-label="Navegación principal">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={active === item.href.split('#')[1] ? 'is-active' : ''}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/#contacto" className="btn btn--primary btn--sm navbar__cta">
          Hablemos
        </Link>

        <button
          className={`navbar__toggle ${open ? 'is-open' : ''}`}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>


      <nav id="mobile-menu" className={`navbar__mobile ${open ? 'is-open' : ''}`} aria-label="Navegación móvil" hidden={!open}>
        {nav.map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </Link>
        ))}
        <Link href="/#contacto" className="btn btn--primary" onClick={() => setOpen(false)}>
          Hablemos
        </Link>
      </nav>
    </header>
  );
}
