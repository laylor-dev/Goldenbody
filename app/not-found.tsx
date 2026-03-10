'use client';

import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center bg-white px-6 text-center">
            <h2 className="text-4xl md:text-6xl font-display uppercase tracking-tight text-black mb-4">
                Page Not Found
            </h2>
            <p className="text-neutral-600 text-lg mb-8 font-light">
                The page you are looking for does not exist or has been moved.
            </p>
            <Link
                href="/"
                className="px-8 py-4 bg-black text-white font-display uppercase tracking-widest text-sm hover:bg-gold-500 hover:text-black transition-colors rounded-lg"
            >
                Return Home
            </Link>
        </div>
    );
}
