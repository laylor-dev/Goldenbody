'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/components/LanguageContext';

export default function Contact() {
    const { t } = useLanguage();
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero */}
            <section className="pt-40 pb-20 bg-black text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-px bg-gold-500" />
                        <span className="text-gold-500 font-mono text-xs uppercase tracking-[0.3em]">{t.contact.label}</span>
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-5xl md:text-7xl font-display uppercase tracking-tight">
                        {t.contact.title} <span className="text-gold-500">{t.contact.titleHighlight}</span>
                    </motion.h1>
                </div>
            </section>

            {/* Contact Content */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Contact Info */}
                        <div>
                            <h2 className="text-3xl font-display uppercase tracking-wider mb-8">{t.contact.reachOut}</h2>
                            <p className="text-neutral-600 text-lg leading-relaxed mb-12">{t.contact.reachDesc}</p>

                            <div className="space-y-8">
                                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-start gap-5 p-6 bg-neutral-50 rounded-2xl border border-neutral-100">
                                    <div className="w-12 h-12 bg-gold-500/10 rounded-xl flex items-center justify-center shrink-0">
                                        <Mail className="w-5 h-5 text-gold-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-display uppercase tracking-wider text-sm mb-1">{t.contact.emailLabel}</h3>
                                        <a href="mailto:info@goldenbody.dz" className="text-gold-600 hover:text-gold-500 transition-colors font-mono">info@goldenbody.dz</a>
                                    </div>
                                </motion.div>

                                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="flex items-start gap-5 p-6 bg-neutral-50 rounded-2xl border border-neutral-100">
                                    <div className="w-12 h-12 bg-gold-500/10 rounded-xl flex items-center justify-center shrink-0">
                                        <Phone className="w-5 h-5 text-gold-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-display uppercase tracking-wider text-sm mb-1">{t.contact.phoneLabel}</h3>
                                        <a href="tel:+213770533338" className="text-neutral-700 hover:text-gold-500 transition-colors block font-mono text-sm">+213 (0) 770 53 33 38</a>
                                        <a href="tel:+21336372315" className="text-neutral-500 hover:text-gold-500 transition-colors block font-mono text-sm mt-1">+213 (0) 36 37 23 15 (Fix)</a>
                                    </div>
                                </motion.div>

                                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex items-start gap-5 p-6 bg-neutral-50 rounded-2xl border border-neutral-100">
                                    <div className="w-12 h-12 bg-gold-500/10 rounded-xl flex items-center justify-center shrink-0">
                                        <MapPin className="w-5 h-5 text-gold-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-display uppercase tracking-wider text-sm mb-1">{t.contact.addressLabel}</h3>
                                        <p className="text-neutral-600 font-mono text-sm">Oulad Saber, Setif, Algeria</p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div>
                            {!submitted ? (
                                <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} onSubmit={handleSubmit} className="bg-neutral-50 rounded-3xl p-8 md:p-10 border border-neutral-100 space-y-6">
                                    <h2 className="text-2xl font-display uppercase tracking-wider mb-2">{t.contact.formTitle}</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">{t.contact.nameLabel}</label>
                                            <input required type="text" className="w-full bg-white border border-neutral-200 rounded-lg p-4 focus:ring-2 focus:ring-gold-500 focus:outline-none transition-all" placeholder={t.contact.namePlaceholder} value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">{t.contact.emailFieldLabel}</label>
                                            <input required type="email" className="w-full bg-white border border-neutral-200 rounded-lg p-4 focus:ring-2 focus:ring-gold-500 focus:outline-none transition-all" placeholder={t.contact.emailPlaceholder} value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">{t.contact.subjectLabel}</label>
                                        <input required type="text" className="w-full bg-white border border-neutral-200 rounded-lg p-4 focus:ring-2 focus:ring-gold-500 focus:outline-none transition-all" placeholder={t.contact.subjectPlaceholder} value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">{t.contact.messageLabel}</label>
                                        <textarea required className="w-full bg-white border border-neutral-200 rounded-lg p-4 focus:ring-2 focus:ring-gold-500 focus:outline-none transition-all min-h-[150px] resize-none" placeholder={t.contact.messagePlaceholder} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} />
                                    </div>
                                    <button type="submit" className="w-full bg-black text-white py-4 rounded-lg font-display uppercase tracking-widest hover:bg-gold-500 hover:text-black transition-colors flex items-center justify-center gap-3">
                                        <Send className="w-4 h-4" /> {t.contact.sendBtn}
                                    </button>
                                </motion.form>
                            ) : (
                                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-neutral-50 rounded-3xl p-12 border border-neutral-100 text-center">
                                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-green-100">
                                        <CheckCircle className="w-10 h-10 text-green-500" />
                                    </div>
                                    <h2 className="text-3xl font-display uppercase tracking-wider mb-4">{t.contact.successTitle}</h2>
                                    <p className="text-neutral-600 text-lg mb-2">{t.contact.successP1} {formData.name}.</p>
                                    <p className="text-neutral-500">{t.contact.successP2} <span className="text-gold-600 font-medium">{formData.email}</span> {t.contact.successP3}</p>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
