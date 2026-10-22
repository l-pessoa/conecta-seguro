import type { Metadata, Viewport } from 'next';
import { Press_Start_2P, Silkscreen, Pixelify_Sans } from 'next/font/google';
import './tokens.css';
import './base.css';
import './landing.css';
import './flow.css';

const display = Press_Start_2P({ subsets: ['latin', 'latin-ext'], weight: '400', variable: '--font-ps2p', display: 'swap' });
const label = Silkscreen({ subsets: ['latin', 'latin-ext'], weight: ['400', '700'], variable: '--font-silk', display: 'swap' });
const body = Pixelify_Sans({ subsets: ['latin', 'latin-ext'], weight: ['400', '500', '600', '700'], variable: '--font-pixelify', display: 'swap' });

export const metadata: Metadata = {
  title: 'ConectaSeguro',
  description: 'Jornada curta sobre as decisões de segurança que você toma no celular. Sem prova, sem nota, sem ranking.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1a1033',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${label.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
