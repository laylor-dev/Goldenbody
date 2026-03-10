'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Instagram, X, Maximize2 } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import Portal from './Portal';

const videos = [
    {
        id: 1,
        src: '/videos/lifestyle/lifestyle_1.mp4',
        thumbnail: '/images/products/1-1.png',
        athlete: '@goldenbody_pro',
        product: 'ISO-PRO'
    },
    {
        id: 2,
        src: '/videos/lifestyle/lifestyle_2.mp4',
        thumbnail: '/images/products/iso-pro-chocolate-1.8kg-01-600x800.png',
        athlete: '@goldenbody_pro',
        product: 'CREATINE MONOHYDRATE'
    },
    {
        id: 3,
        src: '/videos/lifestyle/lifestyle_3.mp4',
        thumbnail: '/images/products/1-15.png',
        athlete: '@goldenbody_pro',
        product: 'SAVAGE MASS'
    },
    {
        id: 4,
        src: '/videos/science0.mp4',
        thumbnail: '/images/products/CARBONOX-1KG-ORANGE-600x800.png',
        athlete: '@yacine_fit',
        product: 'CARBONOX'
    }
];

function VideoCard({ video, index, onOpen }: { video: typeof videos[0], index: number, onOpen: (v: typeof videos[0]) => void }) {
    const { t } = useLanguage();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const vid = videoRef.current;
        if (!vid) return;

        if (isHovered) {
            vid.play().catch(() => { /* autoplay policy */ });
        } else {
            vid.pause();
        }
    }, [isHovered]);

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            onClick={() => onOpen(video)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative w-[200px] sm:w-[320px] aspect-[9/16] rounded-xl sm:rounded-3xl overflow-hidden bg-black flex-shrink-0 cursor-pointer shadow-xl border border-neutral-200 transition-all duration-500 hover:shadow-gold-500/10 hover:border-gold-500/30"
            style={{ contain: 'layout style' }}
        >
            {/* Video — preload=none stops simultaneous loading, only play on hover */}
            <video
                ref={videoRef}
                src={video.src}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                loop
                muted
                playsInline
                poster={video.thumbnail}
                preload="none"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80 pointer-events-none" />

            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white p-2">
                    <Maximize2 className="w-8 h-8" />
                </div>
            </div>

            <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium text-sm drop-shadow-md">{video.athlete}</span>
                    <Volume2 className="w-4 h-4 text-white/70" />
                </div>
                <div className="inline-block bg-gold-500 text-black text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-sm">
                    {video.product === 'ISO-PRO CHOCOLATE' ? 'ISO-PRO' :
                        video.product === 'CREATINE MONOHYDRATE' ? t.categories.creatine.name :
                            video.product === 'SAVAGE MASS' ? 'SAVAGE MASS' :
                                video.product}
                </div>
            </div>
        </motion.div>
    );
}

export default function VerticalVideoSection() {
    const [selectedVideo, setSelectedVideo] = useState<typeof videos[0] | null>(null);
    const { t } = useLanguage();

    return (
        // contain:content isolates this section as its own compositing layer → no repaints bleed out
        <section
            className="py-24 sm:py-32 bg-neutral-50 overflow-hidden relative"
            style={{ contain: 'content' }}
        >
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 mb-12 sm:mb-20">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="text-center sm:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center justify-center sm:justify-start gap-3 mb-4"
                        >
                            <div className="w-8 h-px bg-gold-500" />
                            <span className="text-gold-500 font-mono text-xs uppercase tracking-[0.3em]">{t.videoSection.label}</span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-display uppercase tracking-tight text-black"
                        >
                            {t.videoSection.title}
                        </motion.h2>
                    </div>

                    <motion.a
                        href="https://www.instagram.com/goldenbody_nutrition/?hl=en"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white hover:bg-gold-500 hover:text-black transition-all font-bold uppercase tracking-widest text-sm"
                    >
                        <Instagram className="w-4 h-4" />
                        {t.videoSection.follow}
                    </motion.a>
                </div>
            </div>

            {/* Removed motion.div with y-parallax — pure CSS overflow scroll now, GPU composited */}
            <div className="w-full overflow-x-auto pb-12 hide-scrollbar ltr:pl-6 rtl:pr-6 sm:ltr:pl-[max(1.5rem,calc((100vw-80rem)/2))] sm:rtl:pr-[max(1.5rem,calc((100vw-80rem)/2))]">
                <div className="flex gap-4 sm:gap-6 w-max pr-6">
                    {videos.map((video, i) => (
                        <VideoCard key={video.id} video={video} index={i} onOpen={setSelectedVideo} />
                    ))}
                </div>
            </div>

            <Portal>
                <AnimatePresence>
                    {selectedVideo && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
                            onClick={() => setSelectedVideo(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                                animate={{ scale: 1, y: 0, opacity: 1 }}
                                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                className="relative w-full max-w-[500px] aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <video
                                    src={selectedVideo.src}
                                    autoPlay
                                    controls
                                    className="w-full h-full object-cover"
                                    playsInline
                                />

                                <button
                                    onClick={() => setSelectedVideo(null)}
                                    className="absolute top-6 right-6 p-3 bg-black/50 hover:bg-black/80 rounded-full text-white backdrop-blur-md transition-all z-50 border border-white/10 active:scale-95"
                                >
                                    <X className="w-6 h-6" />
                                </button>

                                <div className="absolute bottom-8 left-8 right-8 pointer-events-none">
                                    <h3 className="text-white font-display text-2xl uppercase tracking-wider mb-2 drop-shadow-lg">
                                        {selectedVideo.athlete}
                                    </h3>
                                    <div className="inline-block bg-gold-500 text-black text-xs font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-md">
                                        {selectedVideo.product}
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Portal>

        </section>
    );
}
