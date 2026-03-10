'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Package, Truck, CheckCircle, Clock, Phone } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/components/LanguageContext';

export default function TrackOrder() {
    const { t } = useLanguage();
    const [phone, setPhone] = useState('');
    const [searched, setSearched] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setSearched(true);
    };

    const steps = [
        { icon: CheckCircle, label: t.track.steps.received.label, desc: t.track.steps.received.desc, done: true },
        { icon: Package, label: t.track.steps.prepared.label, desc: t.track.steps.prepared.desc, done: true },
        { icon: Truck, label: t.track.steps.shipped.label, desc: t.track.steps.shipped.desc, done: false },
        { icon: Clock, label: t.track.steps.delivered.label, desc: t.track.steps.delivered.desc, done: false },
    ];

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero */}
            <section className="pt-40 pb-20 bg-black text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-px bg-gold-500" />
                        <span className="text-gold-500 font-mono text-xs uppercase tracking-[0.3em]">{t.track.label}</span>
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-5xl md:text-7xl font-display uppercase tracking-tight">
                        {t.track.title} <span className="text-gold-500">{t.track.titleHighlight}</span>
                    </motion.h1>
                </div>
            </section>

            {/* Track Form */}
            <section className="py-20">
                <div className="max-w-2xl mx-auto px-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-center mb-12">
                        <p className="text-neutral-600 text-lg leading-relaxed">{t.track.desc}</p>
                    </motion.div>

                    <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} onSubmit={handleSearch} className="bg-neutral-50 rounded-3xl p-8 border border-neutral-100 mb-12">
                        <div className="space-y-2 mb-6">
                            <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">{t.track.phoneLabel}</label>
                            <div className="relative">
                                <input type="tel" required className="w-full bg-white border border-neutral-200 rounded-lg py-4 pl-12 pr-4 focus:ring-2 focus:ring-gold-500 focus:outline-none transition-all font-mono" placeholder="0770 XX XX XX" value={phone} onChange={e => setPhone(e.target.value)} />
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                            </div>
                        </div>
                        <button type="submit" className="w-full bg-black text-white py-4 rounded-lg font-display uppercase tracking-widest hover:bg-gold-500 hover:text-black transition-colors flex items-center justify-center gap-3">
                            <Search className="w-4 h-4" /> {t.track.trackBtn}
                        </button>
                    </motion.form>

                    {/* Results */}
                    {searched && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                            <div className="bg-neutral-50 rounded-2xl p-8 border border-neutral-100">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="font-display uppercase tracking-wider text-lg">{t.track.orderStatus}</h3>
                                    <span className="bg-gold-500/10 text-gold-600 text-xs font-bold uppercase tracking-widest py-1 px-3 rounded-full">{t.track.processing}</span>
                                </div>

                                {/* Timeline */}
                                <div className="space-y-0">
                                    {steps.map((step, i) => (
                                        <div key={step.label} className="flex gap-4">
                                            <div className="flex flex-col items-center">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${step.done ? 'bg-gold-500 text-black' : 'bg-neutral-200 text-neutral-400'}`}>
                                                    <step.icon className="w-5 h-5" />
                                                </div>
                                                {i < 3 && <div className={`w-0.5 h-12 ${step.done ? 'bg-gold-500' : 'bg-neutral-200'}`} />}
                                            </div>
                                            <div className="pt-2 pb-6">
                                                <h4 className={`font-display uppercase tracking-wider text-sm ${step.done ? 'text-black' : 'text-neutral-400'}`}>{step.label}</h4>
                                                <p className="text-neutral-500 text-xs mt-1">{step.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="text-center text-neutral-500 text-sm">
                                <p>{t.track.needHelp} <a href="tel:+213770533338" className="text-gold-600 hover:text-gold-500">+213 (0) 770 53 33 38</a></p>
                            </div>
                        </motion.div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
