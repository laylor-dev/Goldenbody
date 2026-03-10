'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart, Check } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

const products = [
  {
    id: 1,
    name: 'Iso-Pro Chocolate',
    flavor: 'Chocolate',
    price: 9500,
    rating: 4.9,
    reviews: 1245,
    image: '/images/products/iso-pro-chocolate-1.8kg-01-600x800.png',
    imageHover: '/images/products/iso-pro-chocolate-1.8kg-01-600x800.png',
    badgeKey: 'bestSeller'
  },
  {
    id: 6,
    name: 'Creatine Monohydrate',
    flavor: 'Unflavored',
    price: 3900,
    rating: 4.9,
    reviews: 2100,
    image: '/images/products/creatine-450g-1-600x800.png',
    imageHover: '/images/products/creatine-450g-1-600x800.png',
    badgeKey: 'essential'
  },
  {
    id: 4,
    name: 'Carbonox Endurance',
    flavor: 'Orange',
    price: 4500,
    rating: 4.7,
    reviews: 630,
    image: '/images/products/CARBONOX-1KG-ORANGE-600x800.png',
    imageHover: '/images/products/CARBONOX-1KG-ORANGE-600x800.png',
    badgeKey: 'energy'
  },
  {
    id: 12,
    name: 'Pure EAA',
    flavor: 'Fruit Punch',
    price: 5200,
    rating: 4.7,
    reviews: 890,
    image: '/images/products/EAA-450g-FRUIT-PUNSH-600x800.png',
    imageHover: '/images/products/EAA-450g-FRUIT-PUNSH-600x800.png',
    badgeKey: 'recovery'
  }
];

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

function ProductCard({ product }: { product: typeof products[0] }) {
  const { t } = useLanguage();
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const addToCart = () => {
    try {
      const cart = JSON.parse(localStorage.getItem('gb_cart') || '[]');
      cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, addedAt: Date.now() });
      localStorage.setItem('gb_cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cart-updated'));
      setAddedFeedback(true);
      setTimeout(() => setAddedFeedback(false), 1500);
    } catch { /* ignore */ }
  };

  const badgeLabels: Record<string, string> = {
    bestSeller: t.bestSellers.badges.bestSeller,
    essential: t.bestSellers.badges.essential,
    energy: t.bestSellers.badges.energy,
    recovery: t.bestSellers.badges.recovery,
  };

  return (
    <motion.div
      variants={itemVariants}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group bg-white p-4 sm:p-6 rounded-2xl shadow-sm hover:shadow-2xl transition-shadow duration-500 relative flex flex-col cursor-pointer border border-neutral-100 hover:border-gold-200"
    >
      {product.badgeKey && (
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 bg-black text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider py-1 px-2 sm:px-3 rounded-full" style={{ transform: "translateZ(60px)" }}>
          {badgeLabels[product.badgeKey]}
        </div>
      )}
      <div className="relative aspect-square mb-4 sm:mb-6 overflow-hidden rounded-xl bg-neutral-50 px-2" style={{ transform: "translateZ(50px)" }}>
        <div className={`absolute inset-0 bg-gold-500/10 blur-2xl rounded-full scale-150 transition-opacity duration-700 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
        <Image
          src={isHovered ? product.imageHover : product.image}
          alt={product.name}
          fill
          className="object-contain transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 drop-shadow-xl"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
          quality={75}
          priority={product.id === 1 || product.id === 6}
        />
        <div className="absolute inset-x-0 bottom-0 p-2 sm:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-20">
          <button onClick={addToCart} className={`w-full py-2 sm:py-3 min-h-[36px] sm:min-h-[44px] font-display uppercase tracking-wider text-[10px] sm:text-sm flex items-center justify-center gap-1 sm:gap-2 transition-all duration-300 ease-out active:scale-95 focus:outline-none focus:ring-2 focus:ring-gold-500 rounded-lg ${addedFeedback ? 'bg-green-500 text-white' : 'bg-black text-white hover:bg-gold-500 hover:text-black'}`}>
            {addedFeedback ? <><Check className="w-3 h-3 sm:w-4 sm:h-4" />{t.bestSellers.added}</> : <><ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />{t.bestSellers.addToCart}</>}
          </button>
        </div>
      </div>
      <div className="flex-grow flex flex-col justify-between" style={{ transform: "translateZ(30px)" }}>
        <div>
          <div className="flex flex-wrap items-center gap-1 mb-1 sm:mb-2">
            <div className="flex text-gold-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
              ))}
            </div>
            <span className="text-[10px] sm:text-xs text-neutral-500">({product.reviews})</span>
          </div>
          <h3 className="text-sm sm:text-xl font-display uppercase tracking-wide leading-tight mb-1 sm:mb-2 group-hover:text-gold-500 transition-colors duration-300 line-clamp-2 md:line-clamp-none">{product.name}</h3>
          <p className="text-gray-500 text-xs sm:text-sm mb-2 sm:mb-4">
            {product.flavor === 'Chocolate' ? t.bestSellers.flavors.chocolate :
              product.flavor === 'Unflavored' ? t.bestSellers.flavors.unflavored :
                product.flavor === 'Orange' ? t.bestSellers.flavors.orange :
                  product.flavor === 'Fruit Punch' ? t.bestSellers.flavors.fruitPunch :
                    product.flavor}
          </p>
        </div>
        <div className="flex items-center justify-between mt-auto pt-3 sm:pt-4 border-t border-neutral-100">
          <span className="text-sm sm:text-lg font-medium font-mono tracking-tighter">{product.price.toLocaleString()} <span className="text-[9px] sm:text-[10px] text-gold-600 ml-0.5 uppercase">DA</span></span>
        </div>
      </div>
    </motion.div>
  );
}

export default function BestSellers() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} className="py-32 bg-neutral-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white to-neutral-50 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-8 h-px bg-gold-500" />
              <span className="text-gold-500 font-mono text-xs uppercase tracking-[0.3em]">{t.bestSellers.label}</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-display text-black uppercase tracking-tight"
            >
              {t.bestSellers.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-4 text-gray-600 text-lg max-w-prose leading-relaxed"
            >
              {t.bestSellers.subtitle}
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Link href="/shop" className="inline-flex items-center justify-center min-h-[44px] px-4 rounded-md gap-2 text-black font-display uppercase tracking-wider hover:text-gold-600 transition-all duration-300 ease-out group active:scale-95 focus:outline-none focus:ring-2 focus:ring-gold-500">
              {t.bestSellers.viewAll}
              <span className="transform transition-transform group-hover:rtl:-translate-x-1 group-hover:ltr:translate-x-1 rtl:rotate-180">→</span>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 perspective-1000"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
