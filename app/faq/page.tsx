'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Package, Truck, RefreshCcw, CreditCard, HelpCircle, ShieldCheck } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/components/LanguageContext';

function FAQItem({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-b border-neutral-100 last:border-b-0">
            <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 px-1 text-left group">
                <span className={`text-base font-medium transition-colors ${open ? 'text-gold-600' : 'text-black group-hover:text-gold-500'}`}>{q}</span>
                <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className={`w-5 h-5 shrink-0 ml-4 transition-colors ${open ? 'text-gold-500' : 'text-neutral-400'}`} />
                </motion.div>
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                        <p className="text-neutral-600 text-sm leading-relaxed pb-5 px-1">{a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function FAQ() {
    const { t } = useLanguage();

    const faqCategories = [
        {
            name: t.faq.categories.orders.name,
            icon: CreditCard,
            questions: [
                { q: t.faq.categories.orders.q1, a: t.faq.categories.orders.a1 },
                { q: t.faq.categories.orders.q2, a: t.faq.categories.orders.a2 },
                { q: t.faq.categories.orders.q3, a: t.faq.categories.orders.a3 },
            ]
        },
        {
            name: t.faq.categories.shipping.name,
            icon: Truck,
            questions: [
                { q: t.faq.categories.shipping.q1, a: t.faq.categories.shipping.a1 },
                { q: t.faq.categories.shipping.q2, a: t.faq.categories.shipping.a2 },
                { q: t.faq.categories.shipping.q3, a: t.faq.categories.shipping.a3 },
            ]
        },
        {
            name: t.faq.categories.returns.name,
            icon: RefreshCcw,
            questions: [
                { q: t.faq.categories.returns.q1, a: t.faq.categories.returns.a1 },
                { q: t.faq.categories.returns.q2, a: t.faq.categories.returns.a2 },
            ]
        },
        {
            name: t.faq.categories.products.name,
            icon: Package,
            questions: [
                { q: t.faq.categories.products.q1, a: t.faq.categories.products.a1 },
                { q: t.faq.categories.products.q2, a: t.faq.categories.products.a2 },
                { q: t.faq.categories.products.q3, a: t.faq.categories.products.a3 },
            ]
        },
        {
            name: t.faq.categories.account.name,
            icon: ShieldCheck,
            questions: [
                { q: t.faq.categories.account.q1, a: t.faq.categories.account.a1 },
                { q: t.faq.categories.account.q2, a: t.faq.categories.account.a2 },
            ]
        }
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
                        <span className="text-gold-500 font-mono text-xs uppercase tracking-[0.3em]">{t.faq.label}</span>
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-5xl md:text-7xl font-display uppercase tracking-tight">
                        {t.faq.title} <span className="text-gold-500">{t.faq.titleHighlight}</span>
                    </motion.h1>
                </div>
            </section>

            {/* FAQ Content */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="space-y-12">
                        {faqCategories.map((category, catIdx) => (
                            <motion.div key={category.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: catIdx * 0.1 }}>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-gold-500/10 rounded-lg flex items-center justify-center">
                                        <category.icon className="w-5 h-5 text-gold-600" />
                                    </div>
                                    <h2 className="text-xl font-display uppercase tracking-wider">{category.name}</h2>
                                </div>
                                <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100">
                                    {category.questions.map((item) => (
                                        <FAQItem key={item.q} q={item.q} a={item.a} />
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Still need help CTA */}
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16 text-center bg-black text-white rounded-3xl p-12">
                        <HelpCircle className="w-10 h-10 text-gold-500 mx-auto mb-4" />
                        <h3 className="text-2xl font-display uppercase tracking-wider mb-3">{t.faq.stillHelp}</h3>
                        <p className="text-neutral-400 mb-6">{t.faq.stillHelpDesc}</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="mailto:info@goldenbody.dz" className="bg-gold-500 text-black px-8 py-3 rounded-lg font-display uppercase tracking-widest text-sm hover:bg-white transition-colors">{t.faq.emailUs}</a>
                            <a href="tel:+213770533338" className="border border-neutral-700 text-white px-8 py-3 rounded-lg font-display uppercase tracking-widest text-sm hover:border-gold-500 hover:text-gold-500 transition-colors">{t.faq.callUs}</a>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
