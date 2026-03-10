'use client';

import Navbar from '@/components/Navbar';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/components/LanguageContext';

const ShopCatalog = dynamic(() => import('@/components/ShopCatalog'));
const Footer = dynamic(() => import('@/components/Footer'));

export default function Shop() {
  const { t } = useLanguage();
  return (
    <main className="min-h-screen bg-white pt-24">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-6xl font-display uppercase mb-4 sm:mb-8">{t.shop.title}</h1>
        <p className="text-neutral-600 mb-8 sm:mb-16 max-w-2xl text-sm sm:text-lg">{t.shop.subtitle}</p>
      </div>
      <ShopCatalog />
      <Footer />
    </main>
  );
}
