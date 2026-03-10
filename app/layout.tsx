import type { Metadata } from 'next';
import { Inter, Oswald, Cairo } from 'next/font/google';
import SmoothScrolling from '@/components/SmoothScrolling';
import { LanguageProvider } from '@/components/LanguageContext';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-display',
});

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-arabic',
  weight: ['400', '600', '700', '900'],
});

export const metadata: Metadata = {
  title: 'Golden Body | Premium Supplements',
  description: 'Cinematic, immersive sports nutrition brand.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${oswald.variable} ${cairo.variable}`}>
      <body suppressHydrationWarning className="bg-white text-black antialiased selection:bg-gold-500 selection:text-white transition-all duration-300">
        <LanguageProvider>
          <SmoothScrolling>
            {children}
          </SmoothScrolling>
        </LanguageProvider>
      </body>
    </html>
  );
}
