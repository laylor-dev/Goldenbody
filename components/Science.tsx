'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { ShieldCheck, FlaskConical, Dna, PackageCheck, Beaker } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/components/LanguageContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: "0px 100px 0px 100px" });

  useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        videoRef.current.play().catch(() => { });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isInView]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full">
      <video
        ref={videoRef}
        src={src}
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80"
        preload="none"
      />
    </div>
  );
}

export default function Science() {
  const sectionRef = useRef(null);
  const { t } = useLanguage();

  return (
    <section ref={sectionRef} className="py-16 sm:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-4 sm:mb-6"
          >
            <div className="w-12 h-px bg-gold-500" />
            <span className="text-gold-500 font-mono text-xs uppercase tracking-[0.3em]">{t.homeScience.label}</span>
            <div className="w-12 h-px bg-gold-500" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-2xl sm:text-4xl md:text-6xl font-display text-black uppercase tracking-tight mb-4 sm:mb-6"
          >
            {t.homeScience.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-neutral-600 text-base sm:text-xl font-light max-w-prose leading-relaxed mx-auto"
          >
            {t.homeScience.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-start">
          {/* Whey Protein Science */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="bg-neutral-50 p-6 sm:p-10 rounded-3xl border border-neutral-100 shadow-sm relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 rounded-bl-full transition-transform duration-500 group-hover:scale-150" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-10 -right-10 w-40 h-40 border border-gold-500/10 rounded-full pointer-events-none"
            />
            <div className="flex items-center gap-4 mb-6 relative z-10">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-gold-500 shadow-sm border border-neutral-100">
                <Dna className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-3xl font-display uppercase tracking-wider text-black">{t.homeScience.whey.title}</h3>
            </div>
            <p className="text-neutral-600 text-sm sm:text-lg mb-4 sm:mb-6 leading-relaxed relative z-10">
              {t.homeScience.whey.desc}
            </p>

            {/* Animated ingredient bars */}
            <div className="space-y-5 relative z-10">
              {[
                { name: t.homeScience.whey.stats.leucine, pct: 92, color: 'bg-gold-500' },
                { name: t.homeScience.whey.stats.absorption, pct: 88, color: 'bg-black' },
                { name: t.homeScience.whey.stats.bio, pct: 95, color: 'bg-gold-500' },
              ].map((bar) => (
                <div key={bar.name}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium text-black">{bar.name}</span>
                    <span className="font-mono text-neutral-500">{bar.pct}%</span>
                  </div>
                  <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${bar.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                      className={`h-full rounded-full ${bar.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <ul className="mt-6 space-y-4 relative z-10">
              {t.homeScience.whey.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-2 shrink-0" />
                  <p className="text-neutral-700 font-light"><strong className="font-medium text-black">{bullet.title}</strong> {bullet.desc}</p>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Muscle Fuel Anabolic Science */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="bg-black text-white p-6 sm:p-10 rounded-3xl shadow-xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-bl-full transition-transform duration-500 group-hover:scale-150" />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute -top-10 -left-10 w-44 h-44 border border-gold-500/10 rounded-full pointer-events-none"
            />
            <div className="flex items-center gap-4 mb-6 relative z-10">
              <div className="w-12 h-12 rounded-full bg-gold-500 flex items-center justify-center text-black shadow-sm">
                <FlaskConical className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-3xl font-display uppercase tracking-wider text-white">{t.homeScience.mass.title}</h3>
            </div>
            <p className="text-neutral-400 text-sm sm:text-lg mb-4 sm:mb-6 leading-relaxed relative z-10">
              {t.homeScience.mass.desc}
            </p>

            {/* Animated ingredient bars */}
            <div className="space-y-5 relative z-10 mb-8">
              {[
                { name: t.homeScience.mass.stats.energy, pct: 96, color: 'bg-gold-500' },
                { name: t.homeScience.mass.stats.recovery, pct: 90, color: 'bg-white' },
                { name: t.homeScience.mass.stats.efficiency, pct: 93, color: 'bg-gold-500' },
              ].map((bar) => (
                <div key={bar.name}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium text-white">{bar.name}</span>
                    <span className="font-mono text-neutral-500">{bar.pct}%</span>
                  </div>
                  <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${bar.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                      className={`h-full rounded-full ${bar.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 relative z-10">
              {t.homeScience.mass.bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-neutral-300"><strong className="text-white block">{bullet.title}</strong> {bullet.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Lab & Manufacturing Process */}
        <div className="mt-20 sm:mt-32 grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-20 items-center relative z-10">
          {/* Visuals: Video and Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative lg:h-[600px] w-full rounded-[2rem] overflow-hidden shadow-2xl group border border-neutral-100 bg-black aspect-[4/3] md:aspect-video lg:aspect-auto"
          >
            {/* The Video as background */}
            <VideoPlayer src="/videos/science0.mp4" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* The Image overlapping dynamically */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 w-1/3 sm:w-1/2 max-w-[180px] sm:max-w-[240px] rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-4 sm:border-[6px] border-white/10 backdrop-blur-sm group-hover:-translate-y-2 transition-transform duration-500 ease-out"
            >
              <Image
                src="/images/science0.jpg"
                alt="Golden Body Experts in the Lab"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-gold-500" />
              <span className="text-gold-500 font-mono text-xs sm:text-sm uppercase tracking-[0.3em]">{t.homeScience.process.label}</span>
            </div>

            <h3 className="text-2xl sm:text-4xl md:text-5xl font-display uppercase tracking-tight text-black mb-6 leading-[1.1]">
              {t.homeScience.process.title} <br />
              <span className="text-neutral-400">{t.homeScience.process.titleHighlight}</span>
            </h3>

            <p className="text-neutral-600 text-sm sm:text-lg leading-relaxed mb-6 font-light">
              {t.homeScience.process.p1}
            </p>
            <p className="text-neutral-600 text-sm sm:text-lg leading-relaxed mb-8 font-light">
              {t.homeScience.process.p2}
            </p>

            {/* Feature list */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-neutral-50 border border-transparent hover:border-neutral-100 transition-colors">
                <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500 shrink-0 mt-1">
                  <Beaker className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-black font-medium text-lg mb-1">{t.homeScience.process.features[0].title}</h4>
                  <p className="text-sm sm:text-base text-neutral-500 font-light">{t.homeScience.process.features[0].desc}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-neutral-50 border border-transparent hover:border-neutral-100 transition-colors pt-2">
                <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500 shrink-0 mt-1">
                  <PackageCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-black font-medium text-lg mb-1">{t.homeScience.process.features[1].title}</h4>
                  <p className="text-sm sm:text-base text-neutral-500 font-light">{t.homeScience.process.features[1].desc}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 sm:mt-20 flex flex-wrap items-center justify-center gap-4 sm:gap-8"
        >
          {[
            { label: t.homeScience.badges.lab, icon: '🔬' },
            { label: t.homeScience.badges.fillers, icon: '✅' },
            { label: t.homeScience.badges.made, icon: '🇩🇿' },
          ].map((badge) => (
            <div key={badge.label} className="flex items-center gap-2 text-neutral-500 text-xs sm:text-sm font-mono uppercase tracking-wider">
              <span className="text-base sm:text-lg">{badge.icon}</span>
              {badge.label}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Background grid pattern — static, no scroll JS */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Ambient glow near the transition */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-gold-500/10 rounded-[100%] blur-[80px] z-10 pointer-events-none" />

      {/* Smooth transition to Reviews (black) */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-black z-20 pointer-events-none" />
    </section>
  );
}
