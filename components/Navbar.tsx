'use client';

import { useState, useEffect, useRef } from 'react';
import { ShoppingBag, User, Search, Menu, X, Trash2 } from 'lucide-react';
import { motion, AnimatePresence, useScroll } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/components/LanguageContext';
import { Locale } from '@/locales/translations';
import Portal from './Portal';

const SEARCH_PRODUCTS = [
  { id: 1, name: 'Iso-Pro Chocolate', type: 'Protein', price: 9500, image: '/images/products/iso-pro-chocolate-1.8kg-01-600x800.png' },
  { id: 2, name: 'Savage Mass Gainer', type: 'Protein', price: 14500, image: '/images/products/savage-7kg-choco-1-600x800.png' },
  { id: 3, name: 'Native Whey Isolate', type: 'Protein', price: 11000, image: '/images/products/NATIVE-2KG-CHOCOLATE-600x800.png' },
  { id: 4, name: 'Carbonox Endurance', type: 'Carbohydrates', price: 4500, image: '/images/products/CARBONOX-1KG-ORANGE-600x800.png' },
  { id: 5, name: 'EAA + Glutamine', type: 'Amino Acids', price: 5800, image: '/images/products/eaaglutamine-450g-tropical-600x800.png' },
  { id: 6, name: 'Creatine Monohydrate', type: 'Creatine', price: 3900, image: '/images/products/creatine-450g-1-600x800.png' },
  { id: 7, name: 'L-Arginine', type: 'Amino Acids', price: 3200, image: '/images/products/L-ARGININE-450G-TROPICAL-600x800.png' },
  { id: 8, name: 'Marine Collagen', type: 'Wellness', price: 5400, image: '/images/products/marine-collagen-450g-raspberry-600x800.png' },
  { id: 9, name: 'L-Glutamine', type: 'Amino Acids', price: 4200, image: '/images/products/L-GLUTAMINE-450g-600x800.png' },
  { id: 10, name: 'Citrulline Malate', type: 'Amino Acids', price: 4600, image: '/images/products/citrulline-450g-tropical-600x800.png' },
  { id: 11, name: 'Micellar Casein', type: 'Protein', price: 8900, image: '/images/products/CASEIN-1KG-CHOCO-600x800.png' },
  { id: 12, name: 'Pure EAA', type: 'Amino Acids', price: 5200, image: '/images/products/EAA-450g-FRUIT-PUNSH-600x800.png' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<{ id: number; name: string; price: number; image: string; addedAt: number }[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Language dropdown: open/close state for click-based toggle
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isDarkHeaderPage = ['/', '/about', '/login', '/science', '/dashboard', '/contact', '/faq', '/shipping', '/track', '/show'].includes(pathname);

  const { scrollYProgress } = useScroll();
  const { t, locale, setLocale } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close lang dropdown on outside click (mobile)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Check login state
  useEffect(() => {
    const checkLogin = () => {
      try {
        const user = localStorage.getItem('gb_user');
        setIsLoggedIn(!!user);
      } catch { setIsLoggedIn(false); }
    };
    checkLogin();
    window.addEventListener('storage', checkLogin);
    return () => window.removeEventListener('storage', checkLogin);
  }, []);

  // Read cart from localStorage
  useEffect(() => {
    const updateCart = () => {
      try {
        const cart = JSON.parse(localStorage.getItem('gb_cart') || '[]');
        setCartItems(cart);
        setCartCount(cart.length);
      } catch {
        setCartItems([]);
        setCartCount(0);
      }
    };
    updateCart();
    window.addEventListener('cart-updated', updateCart);
    return () => window.removeEventListener('cart-updated', updateCart);
  }, []);

  const removeFromCart = (addedAt: number) => {
    try {
      const cart = JSON.parse(localStorage.getItem('gb_cart') || '[]');
      const updated = cart.filter((item: { addedAt: number }) => item.addedAt !== addedAt);
      localStorage.setItem('gb_cart', JSON.stringify(updated));
      window.dispatchEvent(new Event('cart-updated'));
    } catch { /* ignore */ }
  };

  const clearCart = () => {
    localStorage.setItem('gb_cart', '[]');
    window.dispatchEvent(new Event('cart-updated'));
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price, 0);

  const textColor = isDarkHeaderPage && !isScrolled ? 'text-white' : 'text-black';
  const bgClass = isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6';

  const navLinks = [
    { name: t.nav.shop, path: '/shop' },
    { name: t.nav.show, path: '/show' },
    { name: t.nav.science, path: '/science' },
    { name: t.nav.about, path: '/about' },
  ];

  const searchResults = searchQuery.length > 0
    ? SEARCH_PRODUCTS.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.type.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const handleLangSelect = (l: Locale) => {
    setLocale(l);
    setLangOpen(false);
  };

  return (
    <>
      <header dir="ltr" className={`fixed top-0 left-0 right-0 z-[500] transition-colors duration-500 ${bgClass}`}>
        {/* UI/UX Pro Max Scroll Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold-500 origin-left z-50"
          style={{ scaleX: scrollYProgress }}
        />

        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between min-h-[80px]">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 -ml-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md hover:bg-black/5 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gold-500 transition-all"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className={`w-6 h-6 ${textColor} transition-colors duration-300`} />
          </button>

          <Link href="/" prefetch={true} className={`font-display text-3xl font-bold tracking-wider ${textColor} transition-colors duration-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gold-500 rounded-md px-2 -mx-2`}>
            GOLDEN<span className="text-gold-500">BODY</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                prefetch={true}
                className={`text-sm font-semibold uppercase tracking-widest transition-all duration-300 hover:text-gold-500 relative group px-2 py-1 rounded-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-gold-500 ${textColor}`}
              >
                <span dir="auto">{item.name}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gold-500 transition-all duration-300 ease-out group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className={`flex items-center gap-2 lg:gap-6 ${textColor} transition-colors duration-300`}>
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md hover:text-gold-500 hover:bg-black/5 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gold-500 transition-all"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 lg:gap-6">
              <Link href={isLoggedIn ? '/dashboard' : '/login'} prefetch={true} className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md hover:text-gold-500 hover:bg-black/5 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gold-500 transition-all" aria-label={isLoggedIn ? 'Dashboard' : 'Account Login'}>
                <User className="w-5 h-5" />
              </Link>
              <button
                onClick={() => setCartOpen(true)}
                className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md hover:text-gold-500 hover:bg-black/5 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gold-500 transition-all relative"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-gold-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Language Switcher — hover on desktop, click on mobile */}
              <div
                ref={langRef}
                className="relative"
                onMouseEnter={() => window.innerWidth >= 1024 && setLangOpen(true)}
                onMouseLeave={() => window.innerWidth >= 1024 && setLangOpen(false)}
              >
                <button
                  className="p-2 min-w-[44px] min-h-[44px] tracking-widest font-bold uppercase rounded-md hover:text-gold-500 hover:bg-black/5 flex items-center justify-center transition-all"
                  aria-label="Language"
                  onClick={() => setLangOpen(prev => !prev)}
                >
                  {locale === 'en' ? '🇺🇸' : locale === 'fr' ? '🇫🇷' : '🇩🇿'}
                </button>

                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 top-full pt-2 z-[400]"
                    >
                      <div className="w-36 bg-white text-black shadow-xl rounded-xl overflow-hidden border border-neutral-100 flex flex-col">
                        <button onClick={() => handleLangSelect('en')} className={`px-4 py-3 text-sm font-medium hover:bg-neutral-50 hover:text-gold-500 text-left w-full transition-colors flex items-center justify-between ${locale === 'en' ? 'text-gold-500 bg-gold-500/5' : ''}`}>
                          English <span>🇺🇸</span>
                        </button>
                        <div className="h-px w-full bg-neutral-100" />
                        <button onClick={() => handleLangSelect('fr')} className={`px-4 py-3 text-sm font-medium hover:bg-neutral-50 hover:text-gold-500 text-left w-full transition-colors flex items-center justify-between ${locale === 'fr' ? 'text-gold-500 bg-gold-500/5' : ''}`}>
                          Français <span>🇫🇷</span>
                        </button>
                        <div className="h-px w-full bg-neutral-100" />
                        <button onClick={() => handleLangSelect('ar')} className={`px-4 py-3 text-sm font-medium hover:bg-neutral-50 hover:text-gold-500 text-left w-full transition-colors flex items-center justify-between ${locale === 'ar' ? 'text-gold-500 bg-gold-500/5' : ''}`}>
                          العربية <span>🇩🇿</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      <Portal>
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 backdrop-blur-lg z-[1000] flex flex-col w-screen h-screen overflow-y-auto"
            >
              <div className="max-w-3xl mx-auto w-full px-6 pt-24">
                <div className="flex items-center justify-between mb-12">
                  <h2 className="text-2xl font-display uppercase tracking-wider text-white">{t.nav.search}</h2>
                  <button onClick={() => { setSearchOpen(false); setSearchQuery(''); }} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>

                <div className="relative mb-8">
                  <input
                    type="text"
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, category..."
                    className="w-full bg-transparent border-b-2 border-neutral-700 focus:border-gold-500 text-white text-3xl font-display uppercase tracking-wider py-4 pr-12 placeholder-neutral-600 focus:outline-none transition-colors"
                  />
                  <Search className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 text-neutral-500" />
                </div>

                {searchQuery.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2 max-h-[50vh] overflow-y-auto"
                  >
                    {searchResults.length === 0 ? (
                      <p className="text-neutral-500 text-lg py-8 text-center font-mono">No products found for &quot;{searchQuery}&quot;</p>
                    ) : (
                      searchResults.map((product) => (
                        <Link
                          key={product.id}
                          href="/shop"
                          onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                          className="flex items-center gap-6 p-4 rounded-xl hover:bg-white/5 transition-colors group"
                        >
                          <div className="relative w-16 h-16 bg-white/10 rounded-lg overflow-hidden shrink-0">
                            <Image src={product.image} alt={product.name} fill sizes="64px" className="object-contain p-1" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-white font-display uppercase tracking-wider group-hover:text-gold-500 transition-colors">{product.name}</h3>
                            <p className="text-neutral-500 text-sm font-mono">{product.type}</p>
                          </div>
                          <span className="text-gold-500 font-mono font-medium">{product.price.toLocaleString()} DA</span>
                        </Link>
                      ))
                    )}
                  </motion.div>
                )}

                {searchQuery.length === 0 && (
                  <div className="text-center py-16">
                    <p className="text-neutral-600 font-mono text-sm">Start typing to search across all products...</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>

      {/* Cart Sidebar */}
      <Portal>
        <AnimatePresence>
          {cartOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000] w-screen h-screen"
              onClick={() => setCartOpen(false)}
            >
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="fixed top-0 right-0 h-screen w-full max-w-md bg-white shadow-2xl flex flex-col overflow-hidden z-[1001]"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-neutral-100 shrink-0">
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="w-5 h-5" />
                    <h2 className="text-xl font-display uppercase tracking-wider">{t.nav.cart}</h2>
                    <span className="bg-gold-500 text-black text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                      {cartCount}
                    </span>
                  </div>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto p-6 cart-scrollbar">
                  {cartItems.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center py-16">
                      <ShoppingBag className="w-16 h-16 text-neutral-200 mb-6" />
                      <h3 className="text-xl font-display uppercase tracking-wider text-neutral-400 mb-2">
                        {t.nav.emptyCart}
                      </h3>
                      <p className="text-neutral-400 text-sm mb-8">Add some products to get started.</p>
                      <Link
                        href="/shop"
                        onClick={() => setCartOpen(false)}
                        className="bg-black text-white px-8 py-3 rounded-lg font-display uppercase tracking-widest text-sm hover:bg-gold-500 hover:text-black transition-colors"
                      >
                        {t.nav.browse}
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <motion.div
                          key={item.addedAt}
                          layout
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="flex items-center gap-4 p-4 bg-neutral-50 rounded-xl border border-neutral-100 group"
                        >
                          <div className="relative w-16 h-16 bg-white rounded-lg shrink-0 border border-neutral-100 overflow-hidden">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="64px"
                              className="object-contain p-1"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-display uppercase tracking-wider text-sm truncate">
                              {item.name}
                            </h4>
                            <p className="text-gold-600 font-mono text-sm font-medium">
                              {item.price.toLocaleString()} DA
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.addedAt)}
                            className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer with total */}
                {cartItems.length > 0 && (
                  <div className="p-6 border-t border-neutral-100 space-y-4 shrink-0">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-display uppercase tracking-wider text-neutral-500">{t.nav.total}</span>
                      <span className="text-2xl font-mono font-medium">{cartTotal.toLocaleString()} DA</span>
                    </div>
                    <button
                      onClick={() => setCartOpen(false)}
                      className="block w-full text-center bg-gold-500 text-black py-4 rounded-lg font-display uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
                    >
                      {t.nav.continueShopping}
                    </button>
                    <Link
                      href="/shop"
                      onClick={() => setCartOpen(false)}
                      className="block w-full text-center border-2 border-black text-black py-4 rounded-lg font-display uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
                    >
                      {t.nav.checkout || 'Checkout'}
                    </Link>
                    <button
                      onClick={clearCart}
                      className="w-full text-center py-2 text-sm text-neutral-400 hover:text-red-500 font-mono uppercase tracking-wider transition-colors"
                    >
                      {t.nav.clearCart}
                    </button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>

      {/* Mobile Menu Overlay */}
      <Portal>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, clipPath: 'circle(0% at top left)' }}
              animate={{ opacity: 1, clipPath: 'circle(150% at top left)' }}
              exit={{ opacity: 0, clipPath: 'circle(0% at top left)' }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="fixed inset-0 min-h-screen bg-white z-[999] flex flex-col p-6 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-16">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="font-display text-3xl font-bold tracking-wider text-black active:scale-95 focus:outline-none focus:ring-2 focus:ring-gold-500 rounded-md px-2 -mx-2">
                  GOLDEN<span className="text-gold-500">BODY</span>
                </Link>
                <button onClick={() => setMobileMenuOpen(false)} aria-label="Close menu" className="p-2 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md hover:bg-black/5 transition-all focus:outline-none focus:ring-2 focus:ring-gold-500 active:scale-95">
                  <X className="w-8 h-8 text-black transition-transform duration-300 hover:rotate-90" />
                </button>
              </div>

              <div className="flex gap-4 mb-8">
                <button onClick={() => handleLangSelect('en')} className={`flex-1 py-3 text-xl font-bold rounded-xl border-2 transition-colors ${locale === 'en' ? 'border-gold-500 text-gold-500 bg-gold-500/10' : 'border-neutral-200 text-neutral-400'}`}>🇺🇸 EN</button>
                <button onClick={() => handleLangSelect('fr')} className={`flex-1 py-3 text-xl font-bold rounded-xl border-2 transition-colors ${locale === 'fr' ? 'border-gold-500 text-gold-500 bg-gold-500/10' : 'border-neutral-200 text-neutral-400'}`}>🇫🇷 FR</button>
                <button onClick={() => handleLangSelect('ar')} className={`flex-1 py-3 text-xl font-bold rounded-xl border-2 transition-colors ${locale === 'ar' ? 'border-gold-500 text-gold-500 bg-gold-500/10' : 'border-neutral-200 text-neutral-400'}`}>🇩🇿 AR</button>
              </div>

              <nav className="flex flex-col gap-8">
                {navLinks.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  >
                    <Link
                      href={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-display text-5xl uppercase tracking-wider text-black hover:text-gold-500 transition-colors inline-block relative group"
                    >
                      <span dir="auto">{item.name}</span>
                      <span className="absolute -bottom-2 left-0 w-0 h-[3px] bg-gold-500 transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
}
