'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Package, ShoppingBag, Truck, HelpCircle, LogOut, User, Calendar, Mail, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/components/LanguageContext';

interface UserData {
    email: string;
    name: string;
    loggedInAt: string;
}

interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
    addedAt: number;
}

export default function Dashboard() {
    const { t } = useLanguage();
    const [user, setUser] = useState<UserData | null>(null);
    const [orders, setOrders] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        try {
            const stored = localStorage.getItem('gb_user');
            if (!stored) {
                router.push('/login');
                return;
            }
            setUser(JSON.parse(stored));
            const cartStorage = localStorage.getItem('gb_cart');
            const cart = cartStorage ? JSON.parse(cartStorage) : [];
            setOrders(cart);
        } catch {
            router.push('/login');
        }
        setLoading(false);
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('gb_user');
        router.push('/');
    };

    if (loading || !user) {
        return (
            <main className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-neutral-200 border-t-gold-500 rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-neutral-500 font-mono text-sm uppercase tracking-wider">{t.dashboard.loading}</p>
                </div>
            </main>
        );
    }

    const totalSpent = orders.reduce((sum, item) => sum + item.price, 0);

    const quickLinks = [
        { icon: ShoppingBag, title: t.dashboard.quickLinks[0].title, desc: t.dashboard.quickLinks[0].desc, href: '/shop' },
        { icon: Truck, title: t.dashboard.quickLinks[1].title, desc: t.dashboard.quickLinks[1].desc, href: '/track' },
        { icon: HelpCircle, title: t.dashboard.quickLinks[2].title, desc: t.dashboard.quickLinks[2].desc, href: '/faq' },
    ];

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero */}
            <section className="pt-40 pb-16 bg-black text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(212,175,55,0.1)_0%,transparent_70%)] pointer-events-none" />
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-px bg-gold-500" />
                        <span className="text-gold-500 font-mono text-xs uppercase tracking-[0.3em]">{t.dashboard.yourAccount}</span>
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-5xl md:text-7xl font-display uppercase tracking-tight mb-4">
                        {t.dashboard.welcome} <span className="text-gold-500">{user.name}</span>
                    </motion.h1>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-neutral-400 text-lg">{t.dashboard.manageDesc}</motion.p>
                </div>
            </section>

            {/* Dashboard Content */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
                        {[
                            { icon: ShoppingBag, label: t.dashboard.cartItems, value: orders.length.toString(), color: 'bg-gold-500/10 text-gold-600' },
                            { icon: Package, label: t.dashboard.totalSpent, value: `${totalSpent.toLocaleString()} DA`, color: 'bg-emerald-500/10 text-emerald-600' },
                            { icon: Calendar, label: t.dashboard.memberSince, value: new Date(user.loggedInAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }), color: 'bg-blue-500/10 text-blue-600' },
                        ].map((stat, i) => (
                            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${stat.color}`}>
                                    <stat.icon className="w-5 h-5" />
                                </div>
                                <p className="text-neutral-500 text-xs font-display uppercase tracking-widest mb-1">{stat.label}</p>
                                <p className="text-2xl font-mono font-medium">{stat.value}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Account Info */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-neutral-50 rounded-2xl p-8 border border-neutral-100">
                            <h2 className="text-lg font-display uppercase tracking-wider mb-6">{t.dashboard.account}</h2>
                            <div className="space-y-5">
                                <div className="flex items-center gap-3">
                                    <User className="w-4 h-4 text-gold-500" />
                                    <div>
                                        <p className="text-xs text-neutral-400 uppercase tracking-wider">{t.dashboard.nameLabel}</p>
                                        <p className="font-medium">{user.name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Mail className="w-4 h-4 text-gold-500" />
                                    <div>
                                        <p className="text-xs text-neutral-400 uppercase tracking-wider">{t.dashboard.emailLabel}</p>
                                        <p className="font-mono text-sm">{user.email}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-neutral-200 space-y-3">
                                <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-red-500 hover:bg-red-50 transition-colors text-sm font-display uppercase tracking-wider">
                                    <LogOut className="w-4 h-4" /> {t.dashboard.logout}
                                </button>
                            </div>
                        </motion.div>

                        {/* Order History */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2 bg-neutral-50 rounded-2xl p-8 border border-neutral-100">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-display uppercase tracking-wider">{t.dashboard.recentActivity}</h2>
                                <span className="text-xs font-mono text-neutral-400">{orders.length} {t.dashboard.items}</span>
                            </div>

                            {orders.length === 0 ? (
                                <div className="text-center py-16">
                                    <ShoppingBag className="w-12 h-12 text-neutral-200 mx-auto mb-4" />
                                    <p className="text-neutral-400 mb-4">{t.dashboard.noItems}</p>
                                    <Link href="/shop" className="text-gold-600 hover:text-gold-500 text-sm font-display uppercase tracking-widest">{t.dashboard.browseProducts}</Link>
                                </div>
                            ) : (
                                <div className="space-y-3 max-h-[400px] overflow-y-auto cart-scrollbar">
                                    {orders.map((item) => (
                                        <div key={item.addedAt} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-neutral-100">
                                            <div className="relative w-14 h-14 bg-neutral-50 rounded-lg shrink-0 border border-neutral-100 overflow-hidden">
                                                <Image src={item.image} alt={item.name} fill sizes="60px" className="object-contain p-1" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-display uppercase tracking-wider text-sm truncate">{item.name}</h4>
                                                <p className="text-gold-600 font-mono text-sm">{item.price.toLocaleString()} DA</p>
                                            </div>
                                            <span className="text-xs text-neutral-400 font-mono shrink-0">{new Date(item.addedAt).toLocaleDateString()}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* Quick Links */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
                        {quickLinks.map((link, i) => (
                            <motion.div key={link.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }}>
                                <Link href={link.href} className="block bg-neutral-50 rounded-2xl p-6 border border-neutral-100 hover:border-gold-200 hover:shadow-lg transition-all group">
                                    <link.icon className="w-6 h-6 text-gold-500 mb-3" />
                                    <h3 className="font-display uppercase tracking-wider text-sm mb-1 group-hover:text-gold-500 transition-colors">{link.title}</h3>
                                    <p className="text-neutral-500 text-xs flex items-center gap-1">{link.desc} <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /></p>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
