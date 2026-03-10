'use client';

import { motion } from 'motion/react';
import { Calendar, MapPin, Trophy, ShieldAlert, FileText, CheckCircle, Clock, Package } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/components/LanguageContext';

export default function GoldenBodyShow() {
    const { t } = useLanguage();
    const s = t.show;

    return (
        <main className="min-h-screen bg-neutral-50">
            <Navbar />

            {/* Hero */}
            <section className="pt-24 sm:pt-40 pb-12 sm:pb-20 bg-black text-white relative overflow-hidden text-center">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.15)_0%,transparent_50%)] pointer-events-none" />

                <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-4 sm:space-y-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mx-auto flex items-center justify-center gap-3">
                        <Trophy className="w-5 h-5 text-gold-500" />
                        <span className="text-gold-500 font-mono text-sm uppercase tracking-[0.3em]">{s.badge}</span>
                    </motion.div>

                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-3xl sm:text-5xl md:text-8xl font-display uppercase tracking-tight leading-none">
                        Golden Body <span className="text-gold-500">Show</span>
                        <span className="block text-lg sm:text-2xl md:text-4xl text-neutral-400 mt-2 sm:mt-4 tracking-widest">2024</span>
                    </motion.h1>

                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }} className="text-sm sm:text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed">
                        {s.heroDesc}
                    </motion.p>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-wrap justify-center gap-3 sm:gap-6 mt-6 sm:mt-10">
                        <div className="flex items-center gap-2 bg-white/5 px-4 py-2 sm:px-6 sm:py-3 rounded-full border border-white/10">
                            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gold-500" />
                            <span className="font-mono text-xs sm:text-sm">13-14 {s.sept} 2024</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/5 px-4 py-2 sm:px-6 sm:py-3 rounded-full border border-white/10">
                            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gold-500" />
                            <span className="font-mono text-xs sm:text-sm">Oran, Complexe Miloud Hadefi</span>
                        </div>
                    </motion.div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-neutral-50 pointer-events-none" />
            </section>

            {/* Conditions & Details */}
            <section className="py-12 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16">

                    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-8">
                            <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-gold-600" />
                            <h2 className="text-2xl sm:text-4xl font-display uppercase tracking-wider">{s.condTitle}</h2>
                        </div>

                        <div className="space-y-4 sm:space-y-6 text-neutral-600 leading-relaxed text-sm sm:text-lg">
                            <p>{s.condIntro}</p>
                            <ul className="space-y-3 sm:space-y-4">
                                {s.condItems.map((item: string, i: number) => (
                                    <li key={i} className="flex items-start gap-2 sm:gap-3 bg-white p-3 sm:p-5 rounded-xl border border-neutral-100 shadow-sm">
                                        <div className="w-6 h-6 rounded-full bg-gold-500/20 flex items-center justify-center shrink-0 mt-0.5"><div className="w-2 h-2 bg-gold-600 rounded-full" /></div>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-4 sm:mt-8 bg-black text-white p-4 sm:p-6 rounded-2xl flex items-start gap-3 sm:gap-4">
                                <ShieldAlert className="w-6 h-6 text-gold-500 shrink-0" />
                                <p className="text-sm"><strong>{s.noteLabel}</strong> {s.noteText}</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-8">
                            <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-gold-600" />
                            <h2 className="text-2xl sm:text-4xl font-display uppercase tracking-wider">{s.rewardsTitle}</h2>
                        </div>

                        <div className="space-y-4 sm:space-y-6">
                            <div className="bg-white p-5 sm:p-8 rounded-2xl border border-neutral-200 shadow-sm relative overflow-hidden group hover:border-gold-300 transition-colors">
                                <div className="absolute -right-10 -top-10 w-40 h-40 bg-gold-500/5 rounded-full blur-3xl group-hover:bg-gold-500/10 transition-colors" />
                                <h3 className="text-base sm:text-xl font-display uppercase tracking-wider mb-1 sm:mb-2">{s.champTitle}</h3>
                                <p className="text-neutral-500 text-xs sm:text-sm mb-2 sm:mb-4">{s.champDesc}</p>
                                <p className="text-2xl sm:text-4xl font-mono text-gold-600">500,000 DA</p>
                                <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mt-2">+ {s.plusPrime}</p>
                            </div>

                            <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
                                <div className="bg-neutral-50 p-5 border-b border-neutral-100">
                                    <h3 className="text-lg font-display uppercase tracking-wider">{s.seniorsTitle}</h3>
                                </div>
                                <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="text-center p-3 sm:p-4 bg-yellow-50/50 rounded-xl border border-yellow-100/50">
                                        <div className="w-7 h-7 sm:w-8 sm:h-8 mx-auto bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold mb-1 sm:mb-2 text-sm">1</div>
                                        <p className="text-base sm:text-xl font-mono text-black font-medium">90 000 DA</p>
                                    </div>
                                    <div className="text-center p-3 sm:p-4 bg-neutral-100/50 rounded-xl border border-neutral-200/50">
                                        <div className="w-7 h-7 sm:w-8 sm:h-8 mx-auto bg-neutral-400 text-white rounded-full flex items-center justify-center font-bold mb-1 sm:mb-2 text-sm">2</div>
                                        <p className="text-base sm:text-xl font-mono text-black font-medium">60 000 DA</p>
                                    </div>
                                    <div className="text-center p-3 sm:p-4 bg-orange-50/50 rounded-xl border border-orange-100/50">
                                        <div className="w-7 h-7 sm:w-8 sm:h-8 mx-auto bg-orange-400 text-white rounded-full flex items-center justify-center font-bold mb-1 sm:mb-2 text-sm">3</div>
                                        <p className="text-base sm:text-xl font-mono text-black font-medium">30 000 DA</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm flex items-center gap-4">
                                <div className="w-12 h-12 bg-gold-50 rounded-full flex items-center justify-center shrink-0">
                                    <Package className="w-6 h-6 text-gold-600" />
                                </div>
                                <div>
                                    <h3 className="font-display uppercase tracking-wider text-sm mb-1">{s.juniorsTitle}</h3>
                                    <p className="text-neutral-500 text-sm">{s.juniorsDesc}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Schedule */}
            <section className="py-12 sm:py-24 bg-white border-t border-neutral-100">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-8 sm:mb-16">
                        <Clock className="w-8 h-8 sm:w-10 sm:h-10 text-gold-500 mx-auto mb-3 sm:mb-4" />
                        <h2 className="text-2xl sm:text-4xl font-display uppercase tracking-wider mb-2 sm:mb-4">{s.scheduleTitle}</h2>
                        <p className="text-neutral-500 text-sm sm:text-lg">{s.scheduleVenue}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                        {/* Day 1 */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-neutral-50 rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 border border-neutral-200 relative">
                            <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-black text-white px-4 py-1.5 sm:px-6 sm:py-2 rounded-full font-mono text-xs sm:text-sm shadow-xl">{s.day1Label}</div>
                            <h3 className="text-xl sm:text-2xl font-display uppercase tracking-wider mb-1 sm:mb-2">{s.day1Date}</h3>
                            <p className="text-gold-600 font-bold uppercase tracking-widest text-[10px] sm:text-xs mb-4 sm:mb-8">{s.day1Sub}</p>
                            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-neutral-200 before:to-transparent">
                                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                                    <div className="flex items-center justify-center w-5 h-5 rounded-full border-4 border-white bg-gold-500 shadow shrink-0 z-10" />
                                    <div className="w-full pl-6 text-sm">
                                        <span className="font-mono text-black font-semibold block mb-1">14h00 - 19h00</span>
                                        <p className="text-neutral-600">{s.day1event1}</p>
                                    </div>
                                </div>
                                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                                    <div className="flex items-center justify-center w-5 h-5 rounded-full border-4 border-white bg-black shadow shrink-0 z-10" />
                                    <div className="w-full pl-6 text-sm">
                                        <span className="font-mono text-black font-semibold block mb-1">19h15</span>
                                        <p className="text-neutral-600">{s.day1event2}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Day 2 */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-black text-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 border border-neutral-800 relative">
                            <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-gold-500 text-black px-4 py-1.5 sm:px-6 sm:py-2 rounded-full font-mono text-xs sm:text-sm shadow-xl font-bold">{s.day2Label}</div>
                            <h3 className="text-xl sm:text-2xl font-display uppercase tracking-wider mb-1 sm:mb-2">{s.day2Date}</h3>
                            <p className="text-neutral-400 font-bold uppercase tracking-widest text-[10px] sm:text-xs mb-4 sm:mb-8">{s.day2Sub}</p>
                            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-neutral-800 before:to-transparent">
                                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                                    <div className="flex items-center justify-center w-5 h-5 rounded-full border-4 border-black bg-gold-500 shadow shrink-0 z-10" />
                                    <div className="w-full pl-6 text-sm">
                                        <span className="font-mono text-white font-semibold block mb-1">08h00</span>
                                        <p className="text-neutral-400">{s.day2event1}</p>
                                        <p className="text-gold-500 text-xs mt-1">{s.day2event1sub}</p>
                                    </div>
                                </div>
                                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                                    <div className="flex items-center justify-center w-5 h-5 rounded-full border-4 border-black bg-neutral-600 shadow shrink-0 z-10" />
                                    <div className="w-full pl-6 text-sm">
                                        <span className="font-mono text-white font-semibold block mb-1">14h30</span>
                                        <p className="text-neutral-400">{s.day2event2}</p>
                                        <p className="text-gold-500 text-xs mt-1">{s.day2event2sub}</p>
                                    </div>
                                </div>
                                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                                    <div className="flex items-center justify-center w-5 h-5 rounded-full border-4 border-black bg-neutral-800 shadow shrink-0 z-10" />
                                    <div className="w-full pl-6 text-sm">
                                        <span className="font-mono text-white font-semibold block mb-1">16h00</span>
                                        <p className="text-neutral-400">{s.day2event3}</p>
                                        <p className="text-gold-500 text-xs mt-1">{s.day2event3sub}</p>
                                    </div>
                                </div>
                                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                                    <div className="flex items-center justify-center w-5 h-5 rounded-full border-4 border-black bg-white shadow shrink-0 z-10" />
                                    <div className="w-full pl-6 text-sm">
                                        <span className="font-mono text-white font-semibold block mb-1">{s.evening}</span>
                                        <p className="text-neutral-400">{s.day2event4}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Downloads & Contact */}
            <section className="py-12 sm:py-24 bg-neutral-50 border-t border-neutral-200">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-2xl sm:text-3xl font-display uppercase tracking-wider mb-4 sm:mb-6">{s.docsTitle}</h2>
                    <p className="text-neutral-600 text-sm sm:text-base mb-8 sm:mb-12 max-w-2xl mx-auto">{s.docsDesc}</p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-8 sm:mb-16">
                        <a href="mailto:federationaffiliation@gmail.com" className="bg-black text-white px-5 py-3 sm:px-8 sm:py-4 rounded-xl font-display uppercase tracking-widest text-xs sm:text-sm hover:bg-gold-500 hover:text-black transition-colors flex items-center gap-2 sm:gap-3">
                            federationaffiliation@gmail.com
                        </a>
                        <a href="tel:0541458412" className="bg-white text-black border border-neutral-200 px-5 py-3 sm:px-8 sm:py-4 rounded-xl font-display uppercase tracking-widest text-xs sm:text-sm hover:border-gold-500 transition-colors flex items-center gap-2 sm:gap-3">
                            05 41 45 84 12
                        </a>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100 max-w-lg mx-auto">
                        <FileText className="w-8 h-8 text-neutral-300 mx-auto mb-4" />
                        <h3 className="font-display uppercase tracking-wider text-sm mb-2 text-neutral-400">{s.filesTitle}</h3>
                        <p className="text-neutral-800 font-mono text-sm">{s.filesClosed}</p>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
