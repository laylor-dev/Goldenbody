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
  const canvasRef = useRef<HTMLCanvasElement>(null);
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
    stiffness: 100,
    damping: 30,
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

  // Draw a frame onto the canvas with smart scaling (no over-zoom, no tight letterboxing)
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const img = imagesRef.current[frameIndex];
    if (!canvas || !ctx || !img || !img.complete || !img.naturalWidth) return;

    // We must divide the canvas width by the device pixel ratio because we scaled the canvas context
    const dpr = window.devicePixelRatio || 1;
    const cw = canvas.width / dpr;
    const ch = canvas.height / dpr;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // Use optical dimensions rather than scaled CSS dimensions to keep it sharp
    // Calculate scale to fit HEIGHT mainly so it doesn't get massively zoomed in on wide desktop screens
    // On mobile (tall screens), it will fit width instead and height will letterbox
    const scale = Math.min(cw / iw, ch / ih);

    // Slight overscale (1.05) to ensure we hide any tiny edge artifacts
    const finalScale = scale * 1.05;
    const sw = iw * finalScale;
    const sh = ih * finalScale;
    const sx = (cw - sw) / 2;
    const sy = (ch - sh) / 2;

    // Clear canvas
    ctx.clearRect(0, 0, cw, ch);

    // Create a smooth background gradient that matches the sequence's studio lighting background
    // (White center, soft grey edges) so that if it DOES letterbox on ultra-wides, it blends seamlessly instead of showing black bars.
    const gradient = ctx.createRadialGradient(cw / 2, ch / 2, 0, cw / 2, ch / 2, Math.max(cw, ch) / 1.5);
    gradient.addColorStop(0, '#FFFFFF');
    gradient.addColorStop(1, '#E5E5E5');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, cw, ch);

    ctx.drawImage(img, 0, 0, iw, ih, sx, sy, sw, sh);
  }, []);

  // Resize canvas to fill viewport accounting for Retina/High-DPI displays
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    // We want the canvas to be the size of its container, not strictly the window anymore since it's framed.
    const w = canvas.parentElement?.clientWidth || window.innerWidth;
    const h = canvas.parentElement?.clientHeight || window.innerHeight;

    // Set internal resolution multiplied by DPR for crisp rendering
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    // Set CSS physical size
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    // Scale the context so drawing commands use CSS pixels
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }

    // Redraw current frame after resize
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
      // 0.08 interpolates 8% toward the target each frame, absorbing jitter from the mouse wheel
      currentFrameRef.current += (targetFrame - currentFrameRef.current) * 0.08;

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
              <div className="overflow-hidden mb-2">
                <motion.h1
                  custom={1}
                  initial="hidden"
                  animate="visible"
                  variants={textVariants}
                  className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-display text-white uppercase leading-[0.9] tracking-tight"
                >
                  {t.hero.power} <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">{t.hero.routine}</span>
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-6">
                <motion.h1
                  custom={2}
                  initial="hidden"
                  animate="visible"
                  variants={textVariants}
                  className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-display text-white uppercase leading-[0.9] tracking-tight"
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
          className="absolute inset-0 z-30 flex items-center justify-center p-8 md:px-16 md:pt-32 md:pb-16"
        >
          {/* Creative side text - Left */}
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

          {/* Central framed sequence */}
          <div className="relative w-full lg:w-[60vw] h-[60vh] lg:h-[80vh] rounded-3xl overflow-hidden bg-white/95 shadow-[0_0_100px_rgba(212,175,55,0.1)] ring-1 ring-white/20 mx-auto">

            {/* Ambient Background Glow for the "Studio" feel inside the frame */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.05)_0%,transparent_50%)] pointer-events-none" />

            {/* Canvas */}
            <canvas
              ref={canvasRef}
              className="sequence-canvas w-full h-full object-cover scale-[1.25] md:scale-[1.15] mix-blend-multiply drop-shadow-2xl translate-y-4"
            />

            {/* Inner shadows to frame the product and fade the hard edges */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_60px_rgba(0,0,0,0.1)]" />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-80" />

            {/* Inner Gold ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] z-10" />
          </div>

          {/* Creative side text - Right */}
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
          <div className="absolute inset-0 z-[100] bg-white flex flex-col items-center justify-center transition-opacity duration-500">
            <div className="relative w-24 h-24 mb-6">
                <div className="w-full h-full animate-[spin_2s_ease-in-out_infinite]">
                    <Image 
                        src="/images/logo.png" 
                        alt="Loading Goldenbody Experience..." 
                        fill 
                        className="object-contain drop-shadow-xl"
                        sizes="96px"
                        priority 
                    />
                </div>
            </div>
            {/* Elegant loading fade text */}
            <div className="font-display uppercase tracking-[0.3em] text-gold-600/80 text-sm animate-pulse mb-4">
                Loading
            </div>
            {/* Progress bar and text */}
            <div className="w-48 h-[2px] bg-neutral-100 overflow-hidden mb-3">
              <div
                className="h-full bg-gold-500 transition-all duration-300 ease-out"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            <p className="font-mono text-[10px] tracking-[0.2em] text-neutral-400">{loadProgress}%</p>
          </div>
        )}

      </div>
    </section>
  );
}
