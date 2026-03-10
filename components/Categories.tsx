'use client';

import { useRef } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';

export default function Categories() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);

  const categories = [
    {
      key: 'protein' as const,
      image: '/images/products/ISO-CHOCO-2KG-600x800.png',
      colSpan: 'md:col-span-2',
      rowSpan: 'md:row-span-2',
      bg: 'from-neutral-900 to-black'
    },
    {
      key: 'preworkout' as const,
      image: '/images/products/CARBONOX-1KG-ORANGE-600x800.png',
      colSpan: 'md:col-span-1',
      rowSpan: 'md:row-span-1',
      bg: 'from-neutral-800 to-neutral-900'
    },
    {
      key: 'creatine' as const,
      image: '/images/products/creatine-1kg-600x800.png',
      colSpan: 'md:col-span-1',
      rowSpan: 'md:row-span-1',
      bg: 'from-neutral-800 to-black'
    },
    {
      key: 'recovery' as const,
      image: '/images/products/EAA-450g-FRUIT-PUNSH-600x800.png',
      colSpan: 'md:col-span-2',
      rowSpan: 'md:row-span-1',
      bg: 'from-neutral-900 to-neutral-800'
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22 opacity=%220.05%22/%3E%3C/svg%3E')] opacity-50 pointer-events-none mix-blend-overlay" />
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-8 h-px bg-gold-500" />
            <span className="text-gold-500 font-mono text-xs uppercase tracking-[0.3em]">{t.categories.label}</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-display text-white uppercase tracking-tight"
          >
            {t.categories.title}
          </motion.h2>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 auto-rows-[200px] sm:auto-rows-[240px] md:auto-rows-[320px]">
          {categories.map((cat, index) => {
            const catData = t.categories[cat.key];
            return (
              <Link
                href="/shop"
                key={cat.key}
                className={`relative group overflow-hidden rounded-2xl block ${cat.colSpan} ${cat.rowSpan} active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-gold-500 transition-all duration-300`}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                  className={`w-full h-full relative border border-white/10 group-hover:border-gold-500/50 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)] bg-gradient-to-br ${cat.bg} overflow-hidden`}
                >
                  <div className="absolute -inset-full bg-gradient-to-tr from-transparent via-white/5 to-transparent group-hover:animate-[shimmer_2s_infinite] pointer-events-none transform -skew-x-12" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(212,175,55,0.1),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  <div className="absolute inset-x-4 inset-y-4 md:inset-x-8 md:inset-y-8 flex items-center justify-center pointer-events-none z-10">
                    <Image
                      src={cat.image}
                      alt={catData.name}
                      fill
                      className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] transition-transform duration-700 ease-out group-hover:scale-[1.15] -translate-y-2 md:-translate-y-4 group-hover:-translate-y-4 md:group-hover:-translate-y-6 scale-90 md:scale-100"
                      sizes="(max-width: 768px) 50vw, 25vw"
                      quality={75}
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none z-20" />

                  <div className="absolute inset-0 p-4 sm:p-6 md:p-10 flex flex-col justify-end pointer-events-none z-30">
                    <motion.div className="transform transition-all duration-500 group-hover:-translate-y-8 md:group-hover:-translate-y-12">
                      <span className="text-gold-500 font-mono text-[8px] sm:text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] mb-1 md:mb-2 block opacity-80 group-hover:opacity-100 transition-opacity">
                        {catData.promo}
                      </span>
                      <h3 className={`font-display text-white uppercase tracking-tight leading-[0.9] ${cat.rowSpan.includes('row-span-2') ? 'text-2xl sm:text-3xl md:text-6xl' : 'text-lg sm:text-xl md:text-4xl'}`}>
                        {catData.name}
                      </h3>
                    </motion.div>

                    <div className="absolute bottom-4 sm:bottom-6 md:bottom-10 left-4 sm:left-6 md:left-10 right-4 sm:right-6 md:right-10 flex items-center justify-between opacity-0 transform translate-y-2 md:translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out border-t border-white/10 pt-2 md:pt-4 pointer-events-none mt-2 md:mt-0">
                      <span className="text-white text-[8px] sm:text-[10px] md:text-xs font-bold uppercase tracking-[0.1em] md:tracking-[0.2em]">
                        {t.categories.explore}
                      </span>
                      <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-gold-500/50 flex items-center justify-center text-gold-500 group-hover:bg-gold-500 group-hover:text-black transition-colors text-xs sm:text-sm rtl:rotate-180">
                        &rarr;
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-black" />
    </section>
  );
}
