'use client';

import { useRef, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'motion/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Science from '@/components/Science';
import { useLanguage } from '@/components/LanguageContext';
import {
  ShieldCheck,
  FlaskConical,
  Microscope,
  Award,
  Atom,
  Search,
  TestTubes,
  BadgeCheck,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const Spline = dynamic(
  () => import('@/components/SplineWrapper'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
      </div>
    ),
  }
);

/* ─── Static icon list for philosophy cards in order ─── */
const cardIcons = [Microscope, Award, ShieldCheck];
/* ─── Static icon list for process steps in order ─── */
const processIcons = [Search, FlaskConical, TestTubes, BadgeCheck];



/* ─── Process steps (icons only — text from translations) ─── */


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function SciencePage() {
  const { t } = useLanguage();
  const sc = t.science;
  /* ── Parallax refs ── */
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(heroProgress, [0, 1], ['0%', '40%']);
  const heroOpacity = useTransform(heroProgress, [0, 0.6], [1, 0]);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* ═══════════════════════════════════════════════════════
          SECTION 1 — Spline 3D Hero
          ═══════════════════════════════════════════════════════ */}
      <div ref={heroRef} className="relative h-[90vh] overflow-hidden bg-black">
        {/* Spline 3D Background */}
        <div className="absolute inset-0 z-0">
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center bg-black">
                <div className="w-10 h-10 border-2 border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
              </div>
            }
          >
            <Spline scene="/scene-clean.splinecode" />
          </Suspense>
          {/* Bruteforce Watermark Mask - Physical Black Patch */}
          <div className="absolute bottom-0 right-0 w-64 h-24 bg-black z-[100] pointer-events-none shadow-[0_0_20px_20px_#000]" />
        </div>

        {/* Floating Gold Orbs */}
        <motion.div
          animate={{ y: [0, -20, 0], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-[15%] w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(212,175,55,0.15)_0%,transparent_70%)] pointer-events-none z-[1]"
        />
        <motion.div
          animate={{ y: [0, 25, 0], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-1/4 right-[10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(212,175,55,0.1)_0%,transparent_70%)] pointer-events-none z-[1]"
        />

        {/* Bottom gradient to transition into white */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/70 to-transparent z-[2] pointer-events-none" />

        {/* ── Creative Right-Side Overlay ── */}
        <motion.div
          style={{ y: useTransform(heroProgress, [0, 1], ['0%', '25%']) }}
          className="absolute right-[-5%] md:right-[5%] lg:right-[10%] top-[15%] md:top-[20%] w-[300px] md:w-[400px] lg:w-[500px] aspect-[3/4] z-10 pointer-events-none"
        >
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-gold-500/10 blur-[80px] rounded-full" />

          {/* Product Image */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 z-20"
          >
            <Image
              src="/images/products/ISO-CHOCO-2KG-600x800.png"
              alt="Goldenbody Iso Pro"
              fill
              className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              sizes="(max-width: 768px) 100vw, 500px"
              priority
            />
          </motion.div>

          {/* Technical UI Elements */}
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="absolute -right-8 top-1/4 flex flex-col items-end gap-2"
          >
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-gold-500/70 tracking-widest uppercase">Isolate Matrix</span>
              <div className="w-12 h-[1px] bg-gold-500/50" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-white/50 tracking-widest">90% PURITY</span>
              <div className="w-8 h-[1px] bg-white/30" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-white/50 tracking-widest">RAPID ABSORPTION</span>
              <div className="w-16 h-[1px] bg-white/30" />
            </div>
          </motion.div>

          {/* Technical scanning line */}
          <motion.div
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500/50 to-transparent z-30"
          />
        </motion.div>

        {/* Text overlay */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 h-full flex flex-col justify-end pb-20 px-6 pointer-events-none"
        >
          <div className="max-w-7xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-12 h-px bg-gold-500" />
              <span className="text-gold-500 font-mono text-xs uppercase tracking-[0.3em]">
                {sc.rdLabel}
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-5xl md:text-8xl font-display uppercase tracking-tight text-white leading-[0.9] mb-6"
            >
              {sc.heroTitle}<br />
              <span className="text-gold-500">{sc.heroHighlight}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-neutral-400 text-xl font-light max-w-xl"
            >
              {sc.heroSubtitle}
            </motion.p>
          </div>
        </motion.div>

        {/* Scroll indicator */}
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

      {/* ═══════════════════════════════════════════════════════
          SECTION 2 — Formulation Philosophy
          ═══════════════════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-white relative overflow-hidden">
        {/* Subtle grid bg */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Left — Heading */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="w-12 h-px bg-gold-500" />
                <span className="text-gold-500 font-mono text-xs uppercase tracking-[0.3em]">
                  {sc.philLabel}
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl font-display uppercase tracking-tight text-black leading-[0.95] mb-8"
              >
                {sc.philTitle} <span className="text-gold-500">{sc.philHighlight}</span>,<br />
                {sc.philSuffix}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-neutral-600 text-lg font-light leading-relaxed max-w-lg"
              >
                {sc.philDesc}
              </motion.p>
            </div>

            {/* Right — 3 Philosophy cards */}
            <div className="space-y-6">
              {sc.cards.map((card: { title: string; desc: string }, i: number) => {
                const Icon = cardIcons[i];
                return (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.15 }}
                    className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100 group hover:border-gold-500/40 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gold-500/5 rounded-bl-full transition-transform duration-500 group-hover:scale-[2]" />
                    <div className="flex items-start gap-5 relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-gold-500 shadow-sm border border-neutral-100 shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-display uppercase tracking-wider text-black mb-2">
                          {card.title}
                        </h3>
                        <p className="text-neutral-600 font-light leading-relaxed">{card.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 4 — R&D Process Timeline
          ═══════════════════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-neutral-50 relative overflow-hidden">
        {/* Radial gold glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.06),transparent_60%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <div className="w-12 h-px bg-gold-500" />
              <span className="text-gold-500 font-mono text-xs uppercase tracking-[0.3em]">
                Our Process
              </span>
              <div className="w-12 h-px bg-gold-500" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-display uppercase tracking-tight text-black mb-6"
            >
              From Lab to <span className="text-gold-500">Label</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-neutral-600 text-lg font-light max-w-prose leading-relaxed mx-auto"
            >
              Four rigorous phases ensure that every product bearing the Goldenbody name is the real deal.
            </motion.p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Gold connector line (desktop) */}
            <div className="hidden md:block absolute top-[60px] left-0 right-0 h-px">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-gold-500/20 via-gold-500 to-gold-500/20 origin-left"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
              {sc.process.map((step: { title: string; desc: string }, i: number) => {
                const Icon = processIcons[i];
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.15 }}
                    className="text-center group"
                  >
                    {/* Icon circle */}
                    <div className="relative mx-auto mb-6">
                      <div className="w-[120px] h-[120px] rounded-full bg-white border-2 border-neutral-200 group-hover:border-gold-500 transition-colors duration-300 flex items-center justify-center mx-auto shadow-lg group-hover:shadow-gold-500/20">
                        <Icon className="w-10 h-10 text-neutral-400 group-hover:text-gold-500 transition-colors duration-300" />
                      </div>
                      {/* Step number badge */}
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gold-500 flex items-center justify-center text-black text-sm font-bold shadow-md">
                        {i + 1}
                      </div>
                    </div>

                    <h3 className="text-2xl font-display uppercase tracking-wider text-black mb-3">
                      {step.title}
                    </h3>
                    <p className="text-neutral-600 font-light leading-relaxed text-sm max-w-xs mx-auto">
                      {step.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 4.5 — The Laboratory Process (from Homepage)
          ═══════════════════════════════════════════════════════ */}
      <Science />

      {/* ═══════════════════════════════════════════════════════
          SECTION 5 — CTA
          ═══════════════════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-black relative overflow-hidden">
        {/* Gold glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[40vh] bg-[radial-gradient(ellipse,rgba(212,175,55,0.06)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="w-12 h-px bg-gold-500" />
            <Atom className="w-5 h-5 text-gold-500" />
            <div className="w-12 h-px bg-gold-500" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-display uppercase tracking-tight text-white mb-6"
          >
            {sc.ctaTitle} <span className="text-gold-500">{sc.ctaHighlight}</span>{sc.ctaSuffix}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-neutral-400 text-xl font-light max-w-prose mx-auto mb-12 leading-relaxed"
          >
            {sc.ctaDesc}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 min-h-[52px] px-8 bg-gold-500 text-black font-bold uppercase tracking-widest text-sm rounded-full hover:bg-gold-400 transition-all duration-300 active:scale-95 shadow-lg shadow-gold-500/25 group"
            >
              {sc.ctaShop}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center min-h-[52px] px-8 border-2 border-neutral-700 text-white font-bold uppercase tracking-widest text-sm rounded-full hover:border-gold-500 hover:text-gold-500 transition-all duration-300 active:scale-95"
            >
              {sc.ctaStory}
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
