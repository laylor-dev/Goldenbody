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
  title: 'Goldenbody Nutrition | Elite Sports Performance',
  description: 'Premium sports nutrition, proteins, and supplements engineered for elite athletes and fitness excellence. Build your Goldenbody today.',
  keywords: ['nutrition', 'supplements', 'goldenbody', 'protein', 'fitness', 'algeria', 'sports performance', 'bodybuilding'],
  openGraph: {
    title: 'Goldenbody Nutrition | Elite Sports Performance',
    description: 'Premium sports nutrition and supplements engineered for elite athletes.',
    url: 'https://goldenbody.dz',
    siteName: 'Goldenbody Nutrition',
    images: [
      {
        url: '/icon.png',
        width: 800,
        height: 600,
        alt: 'Goldenbody Nutrition Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Goldenbody Nutrition',
    description: 'Premium sports nutrition and supplements.',
    images: ['/icon.png'],
  },
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
