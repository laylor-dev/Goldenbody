'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';

export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.0,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 1.1,
            touchMultiplier: 2,
            autoRaf: true,
        });

        lenisRef.current = lenis;

        return () => {
            lenis.destroy();
        };
    }, []);

    // On route change: stop Lenis, native-reset scroll, restart Lenis
    // This eliminates the 1-second carry-over from Lenis inertia during navigation
    useEffect(() => {
        const lenis = lenisRef.current;
        if (!lenis) return;

        lenis.stop();
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        lenis.scrollTo(0, { immediate: true });
        lenis.start();
    }, [pathname]);

    return <>{children}</>;
}
