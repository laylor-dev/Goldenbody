'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function MagneticButton({
    children,
    className = "",
    magneticStrength = 0.3
}: {
    children: React.ReactNode,
    className?: string,
    magneticStrength?: number
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * magneticStrength, y: middleY * magneticStrength });
    };

    const reset = () => {
        setIsHovered(false);
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={reset}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={`relative inline-flex items-center justify-center p-2 z-10 ${className}`}
        >
            {/* Background container that moves with the magnet */}
            <motion.div
                animate={{ scale: isHovered ? 1.05 : 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="w-full h-full"
            >
                {children}
            </motion.div>
        </motion.div>
    );
}
