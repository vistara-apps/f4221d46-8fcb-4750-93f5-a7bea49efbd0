import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AssetSync - Unify Your Crypto Portfolio',
  description: 'Unify your crypto assets, see your whole portfolio at a glance.',
  keywords: ['crypto', 'portfolio', 'DeFi', 'assets', 'Base', 'Farcaster'],
  authors: [{ name: 'AssetSync Team' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
