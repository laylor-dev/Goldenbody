'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export default function InteractiveAura() {
    const [mounted, setMounted] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Very soft springs for a "liquid" or "ambient" trailing effect
    const springConfig = { damping: 40, stiffness: 80, mass: 2 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    useEffect(() => {
        // Center initially
        mouseX.set(window.innerWidth / 2);
        mouseY.set(window.innerHeight / 2);

        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Defer mount to avoid hydration mismatch with window.innerWidth
        const timer = setTimeout(() => setMounted(true), 0);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearTimeout(timer);
        };
    }, [mouseX, mouseY]);

    if (!mounted) return null;

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-80 z-10">
            <motion.div
                className="absolute w-[60vw] h-[60vw] min-w-[600px] min-h-[600px] rounded-full will-change-transform"
                style={{
                    x: smoothX,
                    y: smoothY,
                    translateX: '-50%',
                    translateY: '-50%',
                    background: 'radial-gradient(circle closest-side, rgba(243, 202, 62, 0.15) 0%, rgba(212, 175, 55, 0.05) 40%, transparent 100%)',
                }}
            />
            <motion.div
                className="absolute w-[40vw] h-[40vw] min-w-[400px] min-h-[400px] rounded-full will-change-transform"
                style={{
                    x: smoothX,
                    y: smoothY,
                    translateX: '-40%', // Offset slightly for a multi-layered parallax feel
                    translateY: '-60%',
                    background: 'radial-gradient(circle closest-side, rgba(255, 255, 255, 0.1) 0%, rgba(212, 175, 55, 0.08) 50%, transparent 100%)',
                }}
            />
        </div>
    );
}
