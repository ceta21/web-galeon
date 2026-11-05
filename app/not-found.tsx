import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="page-header page-header--center">
      <div className="hero__aurora" aria-hidden="true" />
      <div className="container">
        <span className="eyebrow">Error 404</span>
        <h1>
          Esta página no <span className="gradient-text">existe</span>
        </h1>
        <p>Puede que el enlace esté roto o que la página se haya movido.</p>
        <Link href="/" className="btn btn--primary btn--lg">
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
