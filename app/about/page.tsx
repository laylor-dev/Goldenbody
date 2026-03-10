'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Storytelling from '@/components/Storytelling';
import { Factory, Globe, Shield, Award, Users, Beaker } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      className="tabular-nums"
    >
      {isInView && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {value.toLocaleString()}{suffix}
        </motion.span>
      )}
    </motion.span>
  );
}

/* Icon mappings for stats and timeline */
const statIcons = [Users, Factory, Shield, Globe];

export default function About() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(heroScroll, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.5], [1, 0]);
  const heroScale = useTransform(heroScroll, [0, 1], [1, 1.1]);

  const contentRef = useRef(null);
  const { scrollYProgress: contentScroll } = useScroll({
    target: contentRef,
    offset: ["start end", "end start"]
  });
  const contentY = useTransform(contentScroll, [0, 1], ["5%", "-5%"]);

  const { t } = useLanguage();
  const ab = t.about;

  const statsData = [
    { value: 250000, suffix: '+', label: ab.stats.athletes },
    { value: 1, suffix: 'st', label: ab.stats.factory },
    { value: 100, suffix: '%', label: ab.stats.algerian },
    { value: 48, suffix: '', label: ab.stats.wilayas },
  ];

  const timelineData = [
    { year: '2018', title: ab.timeline.y2018.title, desc: ab.timeline.y2018.desc },
    { year: '2019', title: ab.timeline.y2019.title, desc: ab.timeline.y2019.desc },
    { year: '2021', title: ab.timeline.y2021.title, desc: ab.timeline.y2021.desc },
    { year: '2024', title: ab.timeline.y2024.title, desc: ab.timeline.y2024.desc },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Parallax Hero Section */}
      <div ref={heroRef} className="relative h-[70vh] overflow-hidden bg-black">
        <motion.div
          style={{ y: heroY, scale: heroScale }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black z-10" />
          <div className="absolute inset-0 bg-[url('/images/content/athlete.jpg')] bg-cover bg-center" />
        </motion.div>

        {/* Floating Gold Orbs */}
        <motion.div
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(212,175,55,0.15)_0%,transparent_70%)] pointer-events-none z-10"
        />
        <motion.div
          animate={{ y: [0, 20, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(212,175,55,0.1)_0%,transparent_70%)] pointer-events-none z-10"
        />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-20 h-full flex flex-col justify-end pb-20 px-6"
        >
          <div className="max-w-7xl mx-auto w-full">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gold-500 font-mono text-sm uppercase tracking-[0.3em] mb-4"
            >
              {ab.label}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl md:text-8xl font-display uppercase tracking-tight text-white leading-[0.9] mb-6"
            >
              {ab.heroTitle}<br />
              <span className="text-gold-500">{ab.heroHighlight}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-neutral-300 text-xl font-light max-w-xl"
            >
              {ab.heroSubtitle}
            </motion.p>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-gold-500 rounded-full"
            />
          </div>
        </motion.div>
      </div>

      {/* Stats Bar */}
      <div className="bg-black border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((stat, i) => {
              const Icon = statIcons[i];
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="text-center group"
                >
                  <Icon className="w-6 h-6 text-gold-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <p className="text-3xl md:text-4xl font-display text-white mb-1">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-xs font-mono uppercase tracking-widest text-neutral-500">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content with Parallax */}
      <div ref={contentRef} className="relative overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <motion.div style={{ y: contentY }} className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

            {/* Left Column: Story */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <p className="text-xs font-mono uppercase tracking-[0.3em] text-gold-600 mb-4">{ab.storyLabel}</p>
                <h2 className="text-4xl md:text-5xl font-display uppercase tracking-tight text-black mb-8 leading-[0.95]">
                  {ab.storyTitle} <span className="text-gold-500">{ab.storyTitleHighlight}</span>{ab.storyTitleSuffix}
                </h2>
              </motion.div>

              {[
                ab.p1,
                ab.p2,
                ab.p3
              ].map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.7 }}
                  className="text-neutral-700 text-lg leading-relaxed font-light"
                  dangerouslySetInnerHTML={{ __html: typeof text === 'string' ? text.replace('Goldenbody', '<strong class="font-display uppercase tracking-wider text-black text-xl">Goldenbody</strong>').replace('goldenbody.dz', '<a href="https://goldenbody.dz" class="text-gold-600 hover:text-gold-500 underline decoration-gold-500/30 underline-offset-4 transition-colors">goldenbody.dz</a>') : String(text) }}
                />
              ))}
            </div>

            {/* Right Column: Arsenal Card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-black text-white p-10 rounded-3xl shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-gold-500/10 rounded-bl-full transition-transform duration-700 group-hover:scale-[2]" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gold-500/5 rounded-tr-full" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <Beaker className="w-6 h-6 text-gold-500" />
                  <h3 className="text-2xl font-display uppercase tracking-wider border-b border-gold-500/30 pb-2">{ab.arsenalTitle}</h3>
                </div>

                {[
                  { title: ab.wheyTitle, desc: ab.wheyDesc, icon: '🧬' },
                  { title: ab.massTitle, desc: ab.massDesc, icon: '⚡' },
                  { title: ab.perfTitle, desc: ab.perfDesc, icon: '🔥' },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="mb-6 last:mb-0 pl-4 border-l-2 border-gold-500/30 hover:border-gold-500 transition-colors"
                  >
                    <h4 className="font-bold text-white mb-1 flex items-center gap-2">{item.icon} {item.title}</h4>
                    <p className="text-neutral-400 text-sm">{item.desc}</p>
                  </motion.div>
                ))}

                <div className="mt-10 pt-8 border-t border-neutral-800">
                  <p className="text-sm font-medium text-neutral-500 uppercase tracking-widest mb-2">{ab.communityLabel}</p>
                  <p className="text-neutral-300 italic text-sm">{ab.communityQuote}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Timeline Section */}
      <div className="bg-neutral-50 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(212,175,55,0.05),transparent_60%)] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display uppercase text-center mb-16 tracking-tight"
          >
            {ab.journeyTitle} <span className="text-gold-500">{ab.journeyHighlight}</span>
          </motion.h2>

          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold-500/40 to-transparent hidden md:block" />

            <div className="space-y-16 md:space-y-0">
              {timelineData.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className={`md:flex items-center mb-16 last:mb-0 ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
                >
                  <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                    <span className="text-5xl font-display text-gold-500/30">{item.year}</span>
                    <h3 className="text-2xl font-display uppercase tracking-wider mt-2 mb-3">{item.title}</h3>
                    <p className="text-neutral-600 font-light leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="hidden md:flex w-4 h-4 bg-gold-500 rounded-full relative z-10 shrink-0 shadow-lg shadow-gold-500/30" />
                  <div className="md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Storytelling />
      <Footer />
    </main>
  );
}
