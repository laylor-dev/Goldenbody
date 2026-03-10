'use client';

import { motion } from 'motion/react';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

export default function Reviews() {
  const { t } = useLanguage();

  // Review data with translation support — text stays in EN for authenticity (they're real reviews)
  const reviews = [
    {
      id: 1,
      name: 'Karim B.',
      product: 'Iso-Pro Chocolate',
      title: 'Taste is incredible',
      text: 'Best chocolate whey I\'ve ever tried. Mixes perfectly with just water and the macros are exactly what I need for my prep.',
      rating: 5,
      verified: true
    },
    {
      id: 2,
      name: 'Amina L.',
      product: 'EAA + Glutamine',
      title: 'Recovery game changed',
      text: 'Since adding the EAA to my intra-workout, my DOMS have reduced significantly. The tropical flavor is refreshing.',
      rating: 5,
      verified: true
    },
    {
      id: 3,
      name: 'Younes M.',
      product: 'Creatine Monohydrate',
      title: 'Noticeable strength gains',
      text: 'Been taking this for 4 weeks and my squat is up 20kg. Pure creatine, no fillers. Exactly what Algeria needed.',
      rating: 5,
      verified: true
    }
  ];

  return (
    <section className="py-16 sm:py-32 bg-black relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
      {/* Static ambient glow — no scroll JS */}
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(212,175,55,0.1)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10 sm:mb-20">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center gap-3 mb-4 sm:mb-6"
            >
              <div className="w-8 h-px bg-gold-500" />
              <span className="text-gold-500 font-mono text-xs uppercase tracking-[0.3em]">{t.reviews.label}</span>
              <div className="w-8 h-px bg-gold-500" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-2xl sm:text-4xl md:text-6xl font-display text-white uppercase tracking-tight mb-4 sm:mb-6"
            >
              {t.reviews.title}
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center gap-2 text-gold-500 mb-4"
          >
            {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 sm:w-8 sm:h-8 fill-current" />)}
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-neutral-400 font-medium text-sm sm:text-lg"
          >
            {t.reviews.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 relative z-10">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-neutral-900/50 backdrop-blur-sm p-6 sm:p-10 rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-gold-500/10 transition-all duration-500 border border-white/5 hover:border-gold-500/30 flex flex-col relative overflow-hidden group"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-gold-500/10 group-hover:text-gold-500/20 transition-colors" />
              <div className="flex text-gold-500 mb-3 sm:mb-6">
                {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />)}
              </div>
              <h4 className="font-bold text-base sm:text-xl mb-2 sm:mb-4 text-white">{review.title}</h4>
              <p className="text-neutral-400 mb-4 sm:mb-8 text-sm sm:text-base leading-relaxed flex-grow">&quot;{review.text}&quot;</p>

              <div className="pt-6 border-t border-neutral-800">
                <p className="font-bold text-base text-white">{review.name}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-neutral-500">{review.product}</span>
                  {review.verified && (
                    <span className="flex items-center gap-1 text-xs text-gold-500 font-bold uppercase tracking-wider bg-gold-500/10 px-2 py-1 rounded-full">
                      <CheckCircle className="w-3 h-3" /> {t.reviews.verified}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom gradient fade to transition into the next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-50 to-transparent pointer-events-none" />
    </section>
  );
}
