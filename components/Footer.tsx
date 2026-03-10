'use client';

import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.73a8.19 8.19 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.16z" />
    </svg>
  );
}

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-black text-white pt-12 sm:pt-24 pb-8 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-12 mb-10 sm:mb-20">
          {/* Brand + Contact */}
          <div className="lg:col-span-2 col-span-2">
            <Link href="/" className="font-display text-2xl sm:text-4xl font-bold tracking-wider mb-4 sm:mb-6 block">
              GOLDEN<span className="text-gold-500">BODY</span>
            </Link>
            <p className="text-gray-400 text-xs sm:text-base mb-4 sm:mb-6 max-w-sm leading-relaxed">
              {t.footer.slogan}
            </p>

            {/* Contact Info */}
            <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
              <a href="mailto:info@goldenbody.dz" className="flex items-center gap-3 text-gray-400 text-sm hover:text-gold-500 transition-colors group">
                <Mail className="w-4 h-4 text-gold-500 shrink-0" />
                <span>info@goldenbody.dz</span>
              </a>
              <a href="tel:+213770533338" className="flex items-center gap-3 text-gray-400 text-sm hover:text-gold-500 transition-colors">
                <Phone className="w-4 h-4 text-gold-500 shrink-0" />
                <span>+213 (0) 770 53 33 38</span>
              </a>
              <a href="tel:+21336372315" className="flex items-center gap-3 text-gray-400 text-sm hover:text-gold-500 transition-colors">
                <Phone className="w-4 h-4 text-gold-500 shrink-0" />
                <span>+213 (0) 36 37 23 15 (Fix)</span>
              </a>
              <div className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                <span>Oulad Saber, Setif, Algeria</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3 sm:gap-4">
              <a href="https://www.facebook.com/GOLDENBODYDZ/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-gold-500 hover:text-black transition-all duration-300 ease-out hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gold-500" aria-label="Facebook">
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="https://www.instagram.com/goldenbody_nutrition/?hl=en" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-gold-500 hover:text-black transition-all duration-300 ease-out hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gold-500" aria-label="Instagram">
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="https://www.tiktok.com/@goldenbody_nutrition" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-gold-500 hover:text-black transition-all duration-300 ease-out hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gold-500" aria-label="TikTok">
                <TikTokIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-display text-base sm:text-xl uppercase mb-4 sm:mb-8">{t.footer.shop}</h4>
            <ul className="space-y-2 sm:space-y-4 text-gray-400 text-xs sm:text-sm">
              <li><Link href="/shop" className="hover:text-gold-500 transition-colors duration-300 inline-block active:scale-95 focus:outline-none focus:ring-1 focus:ring-gold-500 rounded-sm">{t.footer.allProducts}</Link></li>
              <li><Link href="/shop" className="hover:text-gold-500 transition-colors duration-300 inline-block active:scale-95 focus:outline-none focus:ring-1 focus:ring-gold-500 rounded-sm">{t.footer.bestSellers}</Link></li>
              <li><Link href="/shop" className="hover:text-gold-500 transition-colors duration-300 inline-block active:scale-95 focus:outline-none focus:ring-1 focus:ring-gold-500 rounded-sm">{t.footer.protein}</Link></li>
              <li><Link href="/shop" className="hover:text-gold-500 transition-colors duration-300 inline-block active:scale-95 focus:outline-none focus:ring-1 focus:ring-gold-500 rounded-sm">{t.footer.preworkout}</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-display text-base sm:text-xl uppercase mb-4 sm:mb-8">{t.footer.company}</h4>
            <ul className="space-y-2 sm:space-y-4 text-gray-400 text-xs sm:text-sm">
              <li><Link href="/about" className="hover:text-gold-500 transition-colors duration-300 inline-block active:scale-95 focus:outline-none focus:ring-1 focus:ring-gold-500 rounded-sm">{t.footer.about}</Link></li>
              <li><Link href="/show" className="hover:text-gold-500 transition-colors duration-300 inline-block active:scale-95 focus:outline-none focus:ring-1 focus:ring-gold-500 rounded-sm">{t.footer.show}</Link></li>
              <li><Link href="/science" className="hover:text-gold-500 transition-colors duration-300 inline-block active:scale-95 focus:outline-none focus:ring-1 focus:ring-gold-500 rounded-sm">{t.footer.science}</Link></li>
              <li><Link href="/contact" className="hover:text-gold-500 transition-colors duration-300 inline-block active:scale-95 focus:outline-none focus:ring-1 focus:ring-gold-500 rounded-sm">{t.footer.contact}</Link></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-display text-base sm:text-xl uppercase mb-4 sm:mb-8">{t.footer.support}</h4>
            <ul className="space-y-2 sm:space-y-4 text-gray-400 text-xs sm:text-sm">
              <li><Link href="/faq" className="hover:text-gold-500 transition-colors duration-300 inline-block active:scale-95 focus:outline-none focus:ring-1 focus:ring-gold-500 rounded-sm">{t.footer.faq}</Link></li>
              <li><Link href="/shipping" className="hover:text-gold-500 transition-colors duration-300 inline-block active:scale-95 focus:outline-none focus:ring-1 focus:ring-gold-500 rounded-sm">{t.footer.shipping}</Link></li>
              <li><Link href="/track" className="hover:text-gold-500 transition-colors duration-300 inline-block active:scale-95 focus:outline-none focus:ring-1 focus:ring-gold-500 rounded-sm">{t.footer.track}</Link></li>
              <li><Link href="/login" className="hover:text-gold-500 transition-colors duration-300 inline-block active:scale-95 focus:outline-none focus:ring-1 focus:ring-gold-500 rounded-sm">{t.footer.myAccount}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            {t.footer.rights}
          </p>
          <div className="flex gap-8 text-gray-500 text-sm">
            <span className="hover:text-white transition-colors duration-300">{t.footer.privacy}</span>
            <span className="hover:text-white transition-colors duration-300">{t.footer.terms}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
