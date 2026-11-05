import type { Metadata, Viewport } from 'next';
import { Montserrat } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import { site } from '@/lib/content';
import './globals.css';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-montserrat', display: 'swap' });

export const metadata: Metadata = {
  title: {
    default: 'GALEON | Consultora de inteligencia artificial',
    template: '%s | GALEON',
  },
  description: site.description,
  openGraph: {
    title: 'GALEON | Consultora de inteligencia artificial',
    description: site.description,
    type: 'website',
    locale: 'es_ES',
    images: ['/img/galeon-logo.png'],
  },
};

export const viewport: Viewport = {
  themeColor: '#0f1b5c',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={montserrat.variable}>
      <body>
        <a href="#main" className="skip-link">
          Saltar al contenido
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
