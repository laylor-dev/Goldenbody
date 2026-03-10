'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowRight, Mail, Lock, Dumbbell, CheckCircle, AlertCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/components/LanguageContext';

export default function Login() {
    const { t } = useLanguage();
    const [isHovering, setIsHovering] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email || !email.includes('@')) {
            setError(t.login.invalidEmail);
            return;
        }
        if (password.length < 6) {
            setError(t.login.passwordLength);
            return;
        }

        setLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock auth — store in localStorage
        const user = { email, name: email.split('@')[0], loggedInAt: new Date().toISOString() };
        localStorage.setItem('gb_user', JSON.stringify(user));
        setLoading(false);
        setSuccess(true);

        // Redirect after showing success
        setTimeout(() => {
            router.push('/dashboard');
        }, 1500);
    };

    return (
        <main className="min-h-screen bg-black text-white relative flex flex-col">
            <Navbar />

            {/* Aesthetic Background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(212,175,55,0.1)_0%,transparent_70%)]" />
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(212,175,55,0.05)_0%,transparent_70%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
            </div>

            <div className="flex-grow flex items-center justify-center relative z-10 px-6 py-32">
                <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl border border-neutral-800">

                    {/* Left Side: Editorial Banner */}
                    <div className="hidden lg:block relative p-12 bg-black overflow-hidden group">
                        <Image
                            src="/images/content/male-hero.png"
                            alt="Goldenbody Athlete"
                            fill
                            className="object-cover opacity-75 group-hover:opacity-90 transition-opacity duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <Link href="/" className="inline-block">
                                <span className="font-display text-2xl tracking-widest uppercase">
                                    Golden<span className="text-gold-500">body</span>
                                </span>
                            </Link>

                            <div>
                                <h2 className="text-4xl font-display uppercase tracking-wider mb-4 leading-tight">
                                    {t.login.bannerTitle} <br /><span className="text-gold-500">{t.login.bannerHighlight}</span>
                                </h2>
                                <p className="text-neutral-400 font-light max-w-sm mb-8">
                                    {t.login.bannerDesc}
                                </p>
                                <div className="flex items-center gap-4 text-sm font-mono text-gold-500/80">
                                    <Dumbbell className="w-4 h-4" />
                                    <span>{t.login.engineeredIn}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Login Form */}
                    <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-neutral-900">
                        <div className="max-w-md w-full mx-auto">
                            <div className="lg:hidden mb-12 text-center">
                                <span className="font-display text-2xl tracking-widest uppercase">
                                    Golden<span className="text-gold-500">body</span>
                                </span>
                            </div>

                            {!success ? (
                                <>
                                    <div className="mb-10">
                                        <h1 className="text-3xl font-display uppercase tracking-wider mb-2">{t.login.accessDashboard}</h1>
                                        <p className="text-neutral-400">{t.login.enterCredentials}</p>
                                    </div>

                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex items-center gap-3 p-4 mb-6 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
                                        >
                                            <AlertCircle className="w-5 h-5 shrink-0" />
                                            {error}
                                        </motion.div>
                                    )}

                                    <form className="space-y-6" onSubmit={handleLogin}>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">{t.login.emailLabel}</label>
                                            <div className="relative">
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="w-full bg-black border border-neutral-800 rounded-lg py-4 pl-12 pr-4 text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500 transition-all font-mono text-sm"
                                                    placeholder={t.login.emailPlaceholder}
                                                />
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">{t.login.passwordLabel}</label>
                                                <Link href="#" className="text-xs font-mono text-gold-600 hover:text-gold-400 transition-colors">{t.login.forgot}</Link>
                                            </div>
                                            <div className="relative">
                                                <input
                                                    type="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="w-full bg-black border border-neutral-800 rounded-lg py-4 pl-12 pr-4 text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500 transition-all font-mono text-sm"
                                                    placeholder={t.login.passwordPlaceholder}
                                                />
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            onMouseEnter={() => setIsHovering(true)}
                                            onMouseLeave={() => setIsHovering(false)}
                                            className="w-full bg-gold-500 text-black py-4 rounded-lg font-display uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:bg-white transition-colors group mt-8 disabled:opacity-60 disabled:cursor-not-allowed"
                                        >
                                            {loading ? (
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                    className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                                                />
                                            ) : (
                                                <>
                                                    <span>{t.login.secureLogin}</span>
                                                    <motion.div animate={{ x: isHovering ? 5 : 0 }}>
                                                        <ArrowRight className="w-4 h-4" />
                                                    </motion.div>
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-12"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", delay: 0.2 }}
                                        className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-green-500/30"
                                    >
                                        <CheckCircle className="w-10 h-10 text-green-500" />
                                    </motion.div>
                                    <h2 className="text-2xl font-display uppercase tracking-wider mb-2">{t.login.welcomeBack}</h2>
                                    <p className="text-neutral-400">{t.login.redirecting}</p>
                                </motion.div>
                            )}

                            {!success && (
                                <div className="mt-12 pt-8 border-t border-neutral-800 text-center">
                                    <p className="text-neutral-400 text-sm">
                                        {t.login.noAccount}{' '}
                                        <Link href="/login" className="text-gold-500 hover:text-gold-400 font-medium transition-colors border-b border-transparent hover:border-gold-400">
                                            {t.login.createProfile}
                                        </Link>
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </main>
    );
}
