import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import { site } from '@/lib/content';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const grotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-grotesk', display: 'swap' });

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
  themeColor: '#05070d',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${grotesk.variable}`}>
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
