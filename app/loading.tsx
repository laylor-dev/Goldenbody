import Image from 'next/image';

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center">
            <div className="relative w-24 h-24 mb-4">
                {/* The logo spinning cleanly. 
                    animate-[spin_3s_linear_infinite] is a generic tailwind approach,
                    but we'll define a gentle custom spin if needed, or stick to the smooth spin */}
                <div className="w-full h-full animate-[spin_2s_ease-in-out_infinite]">
                    <Image 
                        src="/images/logo.png" 
                        alt="Goldenbody Loading..." 
                        fill 
                        className="object-contain drop-shadow-md"
                        sizes="96px"
                        priority 
                    />
                </div>
            </div>
            {/* Elegant loading fade text */}
            <div className="font-display uppercase tracking-[0.3em] text-neutral-400 text-sm animate-pulse">
                Loading
            </div>
        </div>
    );
}
