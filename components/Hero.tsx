'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';

const Particles = () => {
  const [mounted, setMounted] = useState(false);
  const [particlesValues, setParticlesValues] = useState<{
    x: number, y: number, scale: number, duration: number, delay: number, animY: number, animOpacity: number
  }[]>([]);

  useEffect(() => {
    const vals = [...Array(30)].map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      scale: Math.random() * 0.5 + 0.5,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
      animY: Math.random() * 300 + 100,
      animOpacity: Math.random() * 0.5 + 0.2
    }));
    const timer = setTimeout(() => { setParticlesValues(vals); setMounted(true); }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted || particlesValues.length === 0) return null;

  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
      {particlesValues.map((val, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gold-400 rounded-full"
          initial={{ x: val.x, y: val.y, scale: val.scale, opacity: 0 }}
          animate={{ y: [null, val.y - val.animY], opacity: [0, val.animOpacity, 0] }}
          transition={{ duration: val.duration, repeat: Infinity, ease: "linear", delay: val.delay }}
        />
      ))}
    </div>
  );
};

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const { t } = useLanguage();

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const textVariants = {
    hidden: { opacity: 0, y: 80, filter: 'blur(8px)' },
    visible: (i: number) => ({
      opacity: 1, y: 0, filter: 'blur(0px)',
      transition: { delay: i * 0.15, duration: 1.2 }
    })
  };

  return (
    <section ref={ref} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Cinematic Noise Overlay */}
      <div
        className="absolute inset-0 z-20 pointer-events-none opacity-[0.04] mix-blend-overlay"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />
      <Particles />

      {/* Background Layer */}
      <motion.div style={{ y: bgY, opacity }} className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          className="w-full h-full relative"
        >
          <Image
            src="/hero-better.png"
            alt="Golden Body Athlete"
            fill
            className="object-cover opacity-50"
            priority
            quality={85}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />
      </motion.div>

      {/* Foreground Content — overflow-hidden is here so no child bleeds out */}
      <motion.div style={{ y: textY }} className="relative z-30 text-center px-6 max-w-5xl mx-auto mt-20 overflow-hidden w-full">
        <div className="overflow-hidden pb-4 -mb-2">
          <motion.h1
            custom={1} initial="hidden" animate="visible" variants={textVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-display text-white uppercase leading-[1.1] tracking-tight"
          >
            {t.hero.power} <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">{t.hero.routine}</span>
          </motion.h1>
        </div>
        <div className="overflow-hidden pb-4 -mb-2">
          <motion.h1
            custom={2} initial="hidden" animate="visible" variants={textVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-display text-white uppercase leading-[1.1] tracking-tight"
          >
            {t.hero.fuel} <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">{t.hero.progress}</span>
          </motion.h1>
        </div>

        <motion.p
          custom={3} initial="hidden" animate="visible" variants={textVariants}
          className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* Buttons — overflow-hidden prevents arrow from bleeding */}
        <motion.div
          custom={4} initial="hidden" animate="visible" variants={textVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link href="/shop" className="group relative w-full sm:w-auto px-8 py-4 bg-gold-500 text-black font-display text-xl uppercase tracking-wider overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.3)] hover:shadow-[0_0_60px_rgba(212,175,55,0.5)] transition-shadow duration-500">
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">{t.hero.shopBtn}</span>
            <div className="absolute inset-0 bg-black transform scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
          </Link>
          <Link href="/science" className="group relative w-full sm:w-auto px-8 py-4 bg-transparent border border-white/30 text-white font-display text-xl uppercase tracking-wider overflow-hidden backdrop-blur-sm hover:border-white transition-colors duration-500">
            <span className="relative z-10 transition-colors duration-300 group-hover:text-black">{t.hero.scienceBtn}</span>
            <div className="absolute inset-0 bg-white transform scale-x-0 origin-right transition-transform duration-500 ease-out group-hover:scale-x-100" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
