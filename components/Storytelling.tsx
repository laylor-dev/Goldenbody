'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';

export default function Storytelling() {
  const { t } = useLanguage();
  const containerRef = useRef(null);

  return (
    <section ref={containerRef} className="py-16 sm:py-32 bg-black relative overflow-hidden">
      <div className="absolute top-1/4 -right-64 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(212,175,55,0.1)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-64 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(255,255,255,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div
        className="absolute inset-0 z-0 bg-white lg:hidden [clip-path:polygon(0_25%,100%_15%,100%_100%,0_100%)] rtl:[clip-path:polygon(0_15%,100%_25%,100%_100%,0_100%)]"
      />
      <div
        className="absolute inset-0 z-0 bg-white hidden lg:block transition-all duration-1000 [clip-path:polygon(45%_0,100%_0,100%_100%,25%_100%)] rtl:[clip-path:polygon(0_0,55%_0,75%_100%,0_100%)]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 w-full h-full">
              <Image
                src="/images/content/athlete.jpg"
                alt="Algerian Sponsored Athlete"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </motion.div>

          <div className="flex flex-col justify-center relative z-10 text-black lg:pl-12 pt-8 sm:pt-16 lg:pt-0">
            <div className="overflow-hidden pb-4 -mb-2 sm:mb-4">
              <motion.h2
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display uppercase leading-[1.1]"
              >
                {t.storytelling.title} <br />
                <span className="text-gold-500">{t.storytelling.titleHighlight}</span>
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="space-y-4 sm:space-y-6 text-gray-800 text-sm sm:text-lg font-light max-w-prose leading-relaxed"
            >
              <p>{t.storytelling.p1}</p>
              <p>{t.storytelling.p2}</p>
              <p className="text-black font-medium text-base sm:text-xl border-l-4 border-gold-500 pl-4 sm:pl-6 py-2 my-4 sm:my-8 bg-gradient-to-r from-black/5 to-transparent">
                {t.storytelling.quote}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="mt-6 sm:mt-10"
            >
              <Link href="/about" className="group relative inline-flex items-center justify-center min-h-[44px] min-w-[44px] px-5 py-3 sm:px-8 sm:py-4 bg-black text-white font-display text-sm sm:text-xl uppercase tracking-wider overflow-hidden rounded-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-gold-500 transition-all duration-300 ease-out">
                <span className="relative z-10 transition-colors duration-300 ease-out group-hover:text-black">{t.storytelling.cta}</span>
                <div className="absolute inset-0 bg-gold-500 transform scale-y-0 origin-bottom transition-transform duration-500 ease-out group-hover:scale-y-100" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-white z-20 pointer-events-none" />
    </section>
  );
}
