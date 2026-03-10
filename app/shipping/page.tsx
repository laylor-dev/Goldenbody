'use client';

import { motion } from 'motion/react';
import { Truck, Package, RefreshCcw, MapPin, Clock, ShieldCheck } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/components/LanguageContext';

const cardIcons = [Package, MapPin, ShieldCheck];

export default function Shipping() {
    const { t } = useLanguage();

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero */}
            <section className="pt-40 pb-20 bg-black text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-px bg-gold-500" />
                        <span className="text-gold-500 font-mono text-xs uppercase tracking-[0.3em]">{t.shipping.label}</span>
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-5xl md:text-7xl font-display uppercase tracking-tight">
                        {t.shipping.title} <span className="text-gold-500">{t.shipping.titleHighlight}</span>
                    </motion.h1>
                </div>
            </section>

            {/* Content */}
            <section className="py-20">
                <div className="max-w-5xl mx-auto px-6">
                    {/* Shipping Info */}
                    <div className="mb-20">
                        <div className="flex items-center gap-3 mb-8">
                            <Truck className="w-6 h-6 text-gold-600" />
                            <h2 className="text-3xl font-display uppercase tracking-wider">{t.shipping.shippingTitle}</h2>
                        </div>
                        <p className="text-neutral-600 text-lg leading-relaxed mb-10 max-w-prose">{t.shipping.shippingDesc}</p>

                        {/* Delivery Zones Table */}
                        <div className="bg-neutral-50 rounded-2xl border border-neutral-100 overflow-hidden">
                            <div className="grid grid-cols-3 gap-4 p-5 bg-black text-white text-sm font-display uppercase tracking-wider">
                                <span>{t.shipping.zoneHeader}</span>
                                <span>{t.shipping.timeHeader}</span>
                                <span>{t.shipping.costHeader}</span>
                            </div>
                            {t.shipping.zones.map((zone, i) => (
                                <motion.div key={zone.zone} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="grid grid-cols-3 gap-4 p-5 border-b border-neutral-100 last:border-b-0 text-sm">
                                    <span className="font-medium text-black">{zone.zone}</span>
                                    <span className="text-neutral-600 flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-gold-500" /> {zone.time}</span>
                                    <span className="text-neutral-600">{zone.cost}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Info Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                            {t.shipping.cards.map((card, i) => {
                                const Icon = cardIcons[i];
                                return (
                                    <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100">
                                        <Icon className="w-8 h-8 text-gold-500 mb-4" />
                                        <h3 className="font-display uppercase tracking-wider text-sm mb-2">{card.title}</h3>
                                        <p className="text-neutral-500 text-sm leading-relaxed">{card.desc}</p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Returns Policy */}
                    <div>
                        <div className="flex items-center gap-3 mb-8">
                            <RefreshCcw className="w-6 h-6 text-gold-600" />
                            <h2 className="text-3xl font-display uppercase tracking-wider">{t.shipping.returnsTitle}</h2>
                        </div>
                        <div className="space-y-6">
                            {t.shipping.returnItems.map((item, i) => (
                                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100">
                                    <h3 className="font-display uppercase tracking-wider text-sm mb-2">{item.title}</h3>
                                    <p className="text-neutral-600 text-sm leading-relaxed">{item.text}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
