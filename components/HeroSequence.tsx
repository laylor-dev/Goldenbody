'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import InteractiveAura from './InteractiveAura';
import { useLanguage } from '@/components/LanguageContext';
import MagneticButton from '@/components/MagneticButton';

const TOTAL_FRAMES = 120;
const SCROLL_HEIGHT_MULTIPLIER = 5;

const Particles = () => {
  const [mounted, setMounted] = useState(false);
  const [particlesValues, setParticlesValues] = useState<{
    x: number,
    y: number,
    scale: number,
    duration: number,
    delay: number,
    animY: number,
    animOpacity: number
  }[]>([]);

  useEffect(() => {
    // Generate random values once on mount to avoid impure function during render
    const vals = [...Array(20)].map(() => ({
      x: Math.random() * 100, // use percentage for better scaling
      y: Math.random() * 100,
      scale: Math.random() * 0.5 + 0.5,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
      animY: Math.random() * 30 + 10,
      animOpacity: Math.random() * 0.5 + 0.2
    }));
    // Defer state updates to avoid synchronous cascading render warning
    const timer = setTimeout(() => {
      setParticlesValues(vals);
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted || particlesValues.length === 0) return null;

  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
      {particlesValues.map((val, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gold-400 rounded-full"
          initial={{
            left: `${val.x}%`,
            top: `${val.y}%`,
            scale: val.scale,
            opacity: 0
          }}
          animate={{
            y: [0, -val.animY],
            opacity: [0, val.animOpacity, 0],
          }}
          transition={{
            duration: val.duration,
            repeat: Infinity,
            ease: "linear",
            delay: val.delay
          }}
        />
      ))}
    </div>
  );
};

function getFramePath(index: number): string {
  const num = String((index * 2) + 1).padStart(3, '0');
  // Use raw JPEGs directly to avoid pixelation/blur from aggressive compression/resizing
  return `/sequence/ezgif-frame-${num}.jpg`;
}

export default function HeroSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);       // mobile canvas
  const canvasDesktopRef = useRef<HTMLCanvasElement>(null); // desktop canvas
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const { t, locale } = useLanguage();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Apply a butter-smooth spring physics damper to the raw scroll value
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 300, // Snappier response for mobile touch scrolling
    damping: 30,    // Tighter damping to prevent rubber-banding
    restDelta: 0.001
  });

  // Crossfade Parallax values
  // Hero text fades out and scales up as we scroll from 0 to 15%
  const heroOpacity = useTransform(smoothScroll, [0, 0.15], [1, 0]);
  const heroScale = useTransform(smoothScroll, [0, 0.15], [1, 1.3]);
  const heroY = useTransform(smoothScroll, [0, 0.15], ["0%", "-30%"]);
  const heroBlur = useTransform(smoothScroll, [0, 0.15], ["blur(0px)", "blur(10px)"]);

  // The 3D sequence fades IN as the Hero text fades OUT (10% to 20%)
  const sequenceOpacity = useTransform(smoothScroll, [0.1, 0.2], [0, 1]);

  // Mobile scroll progress: 0→1 across the whole sequence phase (20%→100%)
  const mobileScrollProgress = useTransform(smoothScroll, [0.2, 1.0], [0, 1]);
  // Scroll hint fades out quickly once you start scrolling into the sequence
  const scrollHintOpacity = useTransform(smoothScroll, [0.2, 0.35], [1, 0]);

  const textVariants = {
    hidden: { opacity: 0, y: 80, filter: 'blur(8px)' },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        delay: i * 0.15,
        duration: 1.2
      }
    })
  };

  // Draw a frame onto both canvases with smart scaling
  const drawFrame = useCallback((frameIndex: number) => {
    const drawToCanvas = (canvas: HTMLCanvasElement | null) => {
      const ctx = canvas?.getContext('2d');
      const img = imagesRef.current[frameIndex];
      if (!canvas || !ctx || !img || !img.complete || !img.naturalWidth) return;
      const isMobile = window.innerWidth <= 768;
      const maxDpr = isMobile ? 1.5 : 2;
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      const cw = canvas.width / dpr;
      const ch = canvas.height / dpr;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const cropSrcH = ih * 0.95; // Ignore bottom 5% of original frame entirely to cut off watermark

      const scale = Math.min(cw / iw, ch / cropSrcH);
      const finalScale = scale * 0.90; // Shrink 10% from perfect fit to give the cap physical breathing space

      const sw = iw * finalScale;
      const sh = cropSrcH * finalScale;
      const sx = (cw - sw) / 2;
      const sy = (ch - sh) / 2;

      ctx.fillStyle = '#E5E5E5';
      ctx.fillRect(0, 0, cw, ch);
      
      // Draw image with the specific cropped source dimensions
      ctx.drawImage(img, 0, 0, iw, cropSrcH, sx, sy, sw, sh);
    };
    drawToCanvas(canvasRef.current);
    drawToCanvas(canvasDesktopRef.current);
  }, []);

  // Resize both canvases to fill their respective containers
  const handleResize = useCallback(() => {
    const resizeCanvas = (canvas: HTMLCanvasElement | null) => {
      if (!canvas) return;
      const isMobile = window.innerWidth <= 768;
      const maxDpr = isMobile ? 1.5 : 2;
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      const w = canvas.parentElement?.clientWidth || window.innerWidth;
      const h = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.scale(dpr, dpr);
    };
    resizeCanvas(canvasRef.current);
    resizeCanvas(canvasDesktopRef.current);
    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  // Preload all images
  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new window.Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loaded++;
        setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100));
        if (loaded === TOTAL_FRAMES) {
          setIsLoading(false);
          // Draw first frame
          drawFrame(0);
        }
      };
      img.onerror = () => {
        loaded++;
        setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100));
        if (loaded === TOTAL_FRAMES) {
          setIsLoading(false);
        }
      };
      images.push(img);
    }
    imagesRef.current = images;
  }, [drawFrame]);

  // Set up resize listener
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  // Smoothed scroll handler: maps scroll position to frame index using a spring-like dampening
  // standard DOM events can fire inconsistently, so we interpolate custom velocity framing
  useEffect(() => {
    let targetFrame = 0;

    const onScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollHeight = container.offsetHeight - window.innerHeight;

      const rawProgress = -rect.top / scrollHeight;
      const progress = Math.min(Math.max(rawProgress, 0), 1);

      // The first 20% of scroll is for the Hero text. 
      // The 3D sequence frames (0 to 239) happen between progress 0.2 and 1.0
      const sequenceProgress = Math.min(Math.max((progress - 0.2) / 0.8, 0), 1);

      targetFrame = sequenceProgress * (TOTAL_FRAMES - 1);
    };

    // Render loop for buttery smooth interpolation
    const renderLoop = () => {
      // Linear interpolation (lerp) towards the target frame for buttery smooth "spring" effect
      // Increased to 0.15 for tighter 1:1 tracking on mobile touch devices
      currentFrameRef.current += (targetFrame - currentFrameRef.current) * 0.15;

      // Calculate the closest integer frame to draw safely
      const safeFrameIndex = Math.min(
        Math.max(Math.round(currentFrameRef.current), 0),
        TOTAL_FRAMES - 1
      );

      drawFrame(safeFrameIndex);

      rafRef.current = requestAnimationFrame(renderLoop);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    rafRef.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [drawFrame]);

  return (
    <section
      ref={containerRef}
      className="sequence-section bg-black"
      style={{ height: `${100 * SCROLL_HEIGHT_MULTIPLIER}vh` }}
    >
      {/* Sticky viewport container */}
      <div className="sequence-sticky bg-black">

        {/* Background Layer (Hero + Particles) fading out on scroll */}
        <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0 z-0">
          {/* Interactive Liquid Gold Aura */}
          <InteractiveAura />

          {/* Cinematic Noise Overlay */}
          <div
            className="absolute inset-0 z-20 pointer-events-none opacity-[0.04] mix-blend-overlay"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
          ></div>

          {/* Particle Motion */}
          <Particles />

          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.02 }}
            transition={{ duration: 30, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
            className="absolute inset-0 z-10 pointer-events-none"
          >
            <Image
              src="/hero-better.png"
              alt="Golden Body Hero"
              fill
              className="object-cover opacity-70"
              priority
              quality={85}
            />
          </motion.div>
          <div className="absolute inset-0 z-20 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
          <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/60 via-transparent to-transparent pointer-events-none" />
        </motion.div>

        {/* Animated Hero Foreground Content */}
        {!isLoading && (
          <motion.div
            style={{ opacity: heroOpacity, scale: heroScale, y: heroY, filter: heroBlur }}
            className="absolute inset-0 z-40 flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto pointer-events-none"
          >
            <div className="pointer-events-auto flex flex-col items-center">
              <div className="overflow-hidden pb-4 -mb-2">
                <motion.h1
                  custom={1}
                  initial="hidden"
                  animate="visible"
                  variants={textVariants}
                  className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-display text-white uppercase leading-[1.1] tracking-tight"
                >
                  {t.hero.power} <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">{t.hero.routine}</span>
                </motion.h1>
              </div>
              <div className="overflow-hidden pb-4 -mb-2">
                <motion.h1
                  custom={2}
                  initial="hidden"
                  animate="visible"
                  variants={textVariants}
                  className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-display text-white uppercase leading-[1.1] tracking-tight"
                >
                  {t.hero.fuel} {t.hero.progress}
                </motion.h1>
              </div>

              <motion.p
                custom={3}
                initial="hidden"
                animate="visible"
                variants={textVariants}
                className="text-sm sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-10 max-w-2xl mx-auto font-light max-w-prose leading-relaxed"
              >
                {t.hero.subtitle}
              </motion.p>

              <motion.div
                custom={4}
                initial="hidden"
                animate="visible"
                variants={textVariants}
                className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6"
              >
                <MagneticButton magneticStrength={0.2}>
                  <Link href="/shop" className="group relative inline-flex items-center justify-center w-full sm:w-auto min-h-[44px] min-w-[44px] px-5 py-3 sm:px-8 sm:py-4 bg-gold-500 text-black font-display text-sm sm:text-xl uppercase tracking-wider overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.3)] hover:shadow-[0_0_60px_rgba(212,175,55,0.5)] transition-shadow duration-300 ease-out active:scale-95 focus:ring-2 focus:ring-gold-400 focus:outline-none">
                    <span className="relative z-10 transition-colors duration-300 ease-out group-hover:text-white">{t.hero.shopBtn}</span>
                    <div className="absolute inset-0 bg-black transform scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
                  </Link>
                </MagneticButton>

                <MagneticButton magneticStrength={0.15}>
                  <Link href="/science" className="group relative inline-flex items-center justify-center w-full sm:w-auto min-h-[44px] min-w-[44px] px-5 py-3 sm:px-8 sm:py-4 bg-transparent border border-white/30 text-white font-display text-sm sm:text-xl uppercase tracking-wider overflow-hidden backdrop-blur-sm hover:border-white transition-colors duration-300 ease-out active:scale-95 focus:ring-2 focus:ring-white focus:outline-none">
                    <span className="relative z-10 transition-colors duration-300 ease-out group-hover:text-black">{t.hero.scienceBtn}</span>
                    <div className="absolute inset-0 bg-white transform scale-x-0 origin-right transition-transform duration-500 ease-out group-hover:scale-x-100" />
                  </Link>
                </MagneticButton>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* The Emerging 3D Sequence Layer */}
        <motion.div
          style={{ opacity: isLoading ? 0 : sequenceOpacity }}
          className="absolute inset-0 z-30 flex items-center justify-center p-3 pt-24 pb-3 md:p-8 md:px-16 md:pt-32 md:pb-16"
        >
          {/* Creative side text - Left (desktop only) */}
          <motion.div
            style={{ opacity: sequenceOpacity, x: useTransform(smoothScroll, [0.2, 0.4], [locale === 'ar' ? 50 : -50, 0]) }}
            className="hidden lg:flex flex-col justify-center w-64 h-[60vh] lg:h-[70vh] rtl:pl-8 ltr:pr-8 rtl:border-l ltr:border-r border-white/10"
          >
            <p className="text-gold-500 font-display text-xs tracking-widest uppercase mb-4">{t.heroSequence.phase}</p>
            <h3 className="text-white font-display text-2xl uppercase tracking-wider mb-2">{t.heroSequence.standard}</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              {t.heroSequence.standardDesc}
            </p>
            <div className="flex flex-col gap-2 mt-auto pb-4">
              <span className="text-white/40 text-xs font-mono uppercase tracking-widest">{t.heroSequence.active}</span>
              <span className="text-white text-sm font-mono tracking-wider">{t.heroSequence.bioAvailable}</span>
              <span className="text-white text-sm font-mono tracking-wider">{t.heroSequence.clinicalDose}</span>
            </div>
          </motion.div>

          {/* ═══════════════════════════════════════════ */}
          {/* MOBILE ENHANCED LAYOUT — wrapper with product + info */}
          {/* ═══════════════════════════════════════════ */}
          <div className="lg:hidden relative w-full flex flex-col justify-center gap-4 h-full pl-5 pr-1">

            {/* ── Scroll-progress bar (vertical, left edge) ── */}
            <div className="absolute left-0 top-6 bottom-6 w-[2px] bg-white/10 rounded-full z-50">
              <motion.div
                className="w-full bg-gradient-to-b from-gold-400 to-gold-600 rounded-full origin-top"
                style={{ scaleY: mobileScrollProgress, height: '100%' }}
              />
            </div>

            {/* ── Central Product Frame ── */}
            <div className="relative w-full h-[60vh] max-h-[500px] min-h-[300px] rounded-2xl overflow-hidden bg-white/95 shadow-[0_0_60px_rgba(212,175,55,0.15)] ring-1 ring-white/20">

              {/* Pulsing gold border glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none z-20"
                animate={{ boxShadow: ['inset 0 0 0px rgba(212,175,55,0)', 'inset 0 0 20px rgba(212,175,55,0.12)', 'inset 0 0 0px rgba(212,175,55,0)'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Floating Phase badge — top left */}
              <motion.div
                style={{ opacity: sequenceOpacity }}
                className="absolute top-3 left-3 z-30 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-gold-500/30"
              >
                <span className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-pulse" />
                <span className="text-gold-400 font-mono text-[9px] uppercase tracking-widest">{t.heroSequence.phase}</span>
              </motion.div>

              {/* Ambient Background Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.05)_0%,transparent_50%)] pointer-events-none" />

              {/* Canvas */}
              <canvas
                ref={canvasRef}
                className="sequence-canvas w-full h-full object-cover scale-100 mix-blend-multiply drop-shadow-2xl"
              />

              {/* Inner vignette */}
              <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_rgba(0,0,0,0.08)]" />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/10 via-transparent to-transparent" />

              {/* Inner Gold glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.06)_0%,transparent_70%)] z-10" />

              {/* "Scroll to explore" hint — fades out as user scrolls */}
              <motion.div
                style={{ opacity: scrollHintOpacity }}
                className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 pointer-events-none"
              >
                <span className="text-white/50 text-[9px] font-mono uppercase tracking-[0.2em]">Scroll</span>
                <motion.div
                  className="w-[1px] h-4 bg-gradient-to-b from-white/50 to-transparent"
                  animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.div>
            </div>

            {/* ── Bottom Info Card ── */}
            <div className="w-full bg-black/75 backdrop-blur-xl rounded-2xl border border-white/10 p-4 shrink-0">
              {/* Title row */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-white font-display text-base uppercase tracking-wider leading-tight">{t.heroSequence.standard}</h3>
                  <p className="text-gray-400 text-[11px] leading-relaxed mt-0.5">{t.heroSequence.standardDesc}</p>
                </div>
                <Link
                  href="/shop"
                  className="shrink-0 ml-3 bg-gold-500 text-black text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full hover:bg-gold-400 transition-colors active:scale-95"
                >
                  Shop →
                </Link>
              </div>

              {/* Spec stats row */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                {[
                  { label: t.heroSequence.bioAvailable, value: '100%' },
                  { label: t.heroSequence.clinicalDose, value: '✓' },
                  { label: t.heroSequence.purity, value: 'A+' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white/5 rounded-xl p-2 text-center border border-white/5">
                    <p className="text-gold-400 font-mono font-bold text-sm">{stat.value}</p>
                    <p className="text-white/40 text-[9px] uppercase tracking-wider mt-0.5 leading-tight">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Synergy tags */}
              <div className="flex gap-1.5 flex-wrap">
                {[t.heroSequence.recovery, t.heroSequence.endurance, t.heroSequence.hypertrophy].map((tag) => (
                  <span key={tag} className="text-[9px] font-mono uppercase tracking-widest border border-white/15 text-white/50 px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════ */}
          {/* DESKTOP LAYOUT — central frame + side panels */}
          {/* ═══════════════════════════════════════════ */}

          {/* Central framed sequence (desktop only) */}
          <div className="hidden lg:block relative lg:w-[60vw] rounded-3xl overflow-hidden bg-white/95 shadow-[0_0_100px_rgba(212,175,55,0.1)] ring-1 ring-white/20 mx-auto" style={{ height: '80vh' }}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.05)_0%,transparent_50%)] pointer-events-none" />
            <canvas
              ref={canvasDesktopRef}
              className="sequence-canvas w-full h-full object-cover md:scale-[1.15] mix-blend-multiply drop-shadow-2xl translate-y-4"
            />
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_60px_rgba(0,0,0,0.1)]" />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-80" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] z-10" />
          </div>

          {/* Creative side text - Right (desktop only) */}
          <motion.div
            style={{ opacity: sequenceOpacity, x: useTransform(smoothScroll, [0.2, 0.4], [locale === 'ar' ? -50 : 50, 0]) }}
            className="hidden lg:flex flex-col justify-between items-end w-64 h-[60vh] lg:h-[70vh] rtl:pr-8 ltr:pl-8 rtl:border-r ltr:border-l border-white/10 rtl:text-left ltr:text-right"
          >
            <div className="pt-4">
              <span className="inline-block w-8 h-[1px] bg-gold-500 mb-4" />
              <p className="text-white text-xl font-display uppercase tracking-widest mb-2">{t.heroSequence.purity}</p>
              <p className="text-gray-400 text-sm">{t.heroSequence.purityDesc}</p>
            </div>

            <div className="pb-4">
              <p className="text-white/60 text-xs font-mono uppercase tracking-widest mb-4">{t.heroSequence.synergyMatrix}</p>
              <ul className="text-sm font-light text-gray-300 space-y-2">
                <li>{t.heroSequence.recovery}</li>
                <li>{t.heroSequence.endurance}</li>
                <li>{t.heroSequence.hypertrophy}</li>
              </ul>
            </div>
          </motion.div>
        </motion.div>

        {/* Global Film grain texture over everything */}
        <div className="sequence-grain pointer-events-none" />

        {/* Bottom gradient mask — only visible during product sequence, not on hero */}
        <motion.div
          style={{ opacity: sequenceOpacity, height: '80px', background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.7) 70%, #ffffff 100%)' }}
          className="absolute bottom-0 left-0 right-0 z-50 pointer-events-none"
        />

        {/* Loading state overlays */}
        {isLoading && (
          <div className="sequence-loader z-50">
            <div className="sequence-loader-bar">
              <div
                className="sequence-loader-fill"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            <p className="sequence-loader-text">{loadProgress}%</p>
          </div>
        )}

      </div>
    </section>
  );
}
