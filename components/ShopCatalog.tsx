'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { Search, SlidersHorizontal, ShoppingCart, Star, X, Check, Share2, Facebook, MessageCircle, Send } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

const MOCK_PRODUCTS = [
    { id: 1, name: 'Iso-Pro Chocolate', flavor: 'Chocolate', weight: '1.8kg', type: 'Protein', price: 9500, inStock: true, image: '/images/products/iso-pro-chocolate-1.8kg-01-600x800.png', badge: 'Best Seller', rating: 4.9, reviews: 1024 },
    { id: 2, name: 'Savage Mass Gainer', flavor: 'Chocolate', weight: '7kg', type: 'Protein', price: 14500, inStock: true, image: '/images/products/savage-7kg-choco-1-600x800.png', rating: 4.8, reviews: 850 },
    { id: 3, name: 'Native Whey Isolate', flavor: 'Chocolate', weight: '2kg', type: 'Protein', price: 11000, inStock: true, image: '/images/products/NATIVE-2KG-CHOCOLATE-600x800.png', badge: 'Premium', rating: 5.0, reviews: 412 },
    { id: 4, name: 'Carbonox Endurance', flavor: 'Orange', weight: '1kg', type: 'Carbohydrates', price: 4500, inStock: true, image: '/images/products/CARBONOX-1KG-ORANGE-600x800.png', rating: 4.7, reviews: 630 },
    { id: 5, name: 'EAA + Glutamine', flavor: 'Tropical', weight: '450g', type: 'Amino Acids', price: 5800, inStock: true, image: '/images/products/eaaglutamine-450g-tropical-600x800.png', badge: 'Recovery', rating: 4.9, reviews: 1205 },
    { id: 6, name: 'Creatine Monohydrate', flavor: 'Unflavored', weight: '450g', type: 'Creatine', price: 3900, inStock: false, image: '/images/products/creatine-450g-1-600x800.png', rating: 4.9, reviews: 2100 },
    { id: 7, name: 'L-Arginine', flavor: 'Tropical', weight: '450g', type: 'Amino Acids', price: 3200, inStock: true, image: '/images/products/L-ARGININE-450G-TROPICAL-600x800.png', rating: 4.6, reviews: 340 },
    { id: 8, name: 'Marine Collagen', flavor: 'Raspberry', weight: '450g', type: 'Wellness', price: 5400, inStock: false, image: '/images/products/marine-collagen-450g-raspberry-600x800.png', rating: 4.8, reviews: 520 },
    { id: 9, name: 'L-Glutamine', flavor: 'Unflavored', weight: '450g', type: 'Amino Acids', price: 4200, inStock: true, image: '/images/products/L-GLUTAMINE-450g-600x800.png', rating: 4.7, reviews: 490 },
    { id: 10, name: 'Citrulline Malate', flavor: 'Tropical', weight: '450g', type: 'Amino Acids', price: 4600, inStock: true, image: '/images/products/citrulline-450g-tropical-600x800.png', badge: 'Pump', rating: 4.8, reviews: 780 },
    { id: 11, name: 'Micellar Casein', flavor: 'Chocolate', weight: '1kg', type: 'Protein', price: 8900, inStock: true, image: '/images/products/CASEIN-1KG-CHOCO-600x800.png', rating: 4.8, reviews: 610 },
    { id: 12, name: 'Pure EAA', flavor: 'Fruit Punch', weight: '450g', type: 'Amino Acids', price: 5200, inStock: true, image: '/images/products/EAA-450g-FRUIT-PUNSH-600x800.png', rating: 4.7, reviews: 890 }
];

export default function ShopCatalog() {
    const { t } = useLanguage();
    const s = t.shop;
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState(20000);
    const [inStockOnly, setInStockOnly] = useState(false);
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    // Checkout Modal State
    const [selectedProduct, setSelectedProduct] = useState<typeof MOCK_PRODUCTS[0] | null>(null);
    const [checkoutStep, setCheckoutStep] = useState<'preview' | 'form' | 'success'>('preview');
    const [cartToast, setCartToast] = useState<string | null>(null);
    const [addedToCartId, setAddedToCartId] = useState<number | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        stateWilaya: '',
        districtCommune: '',
        feedback: ''
    });

    const handleCheckoutSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setCheckoutStep('success');
    };

    const addToCart = (product: typeof MOCK_PRODUCTS[0]) => {
        try {
            const cart = JSON.parse(localStorage.getItem('gb_cart') || '[]');
            cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, addedAt: Date.now() });
            localStorage.setItem('gb_cart', JSON.stringify(cart));
            window.dispatchEvent(new Event('cart-updated'));
            // Visual feedback
            setAddedToCartId(product.id);
            setCartToast(`${product.name} added to cart!`);
            setTimeout(() => setAddedToCartId(null), 1500);
            setTimeout(() => setCartToast(null), 2500);
        } catch { /* ignore */ }
    };

    const productTypes = Array.from(new Set(MOCK_PRODUCTS.map(p => p.type)));

    const toggleType = (type: string) => {
        setSelectedTypes(prev =>
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        );
    };

    const filteredProducts = useMemo(() => {
        return MOCK_PRODUCTS.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.flavor.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesType = selectedTypes.length === 0 || selectedTypes.includes(product.type);
            const matchesPrice = product.price <= priceRange;
            const matchesStock = !inStockOnly || product.inStock;

            return matchesSearch && matchesType && matchesPrice && matchesStock;
        });
    }, [searchQuery, selectedTypes, priceRange, inStockOnly]);

    const SidebarContent = (
        <div className="space-y-16 pr-6 relative">
            {/* Artistic Watermark */}
            <div className="absolute top-0 right-0 text-[120px] font-display font-black text-neutral-100/50 -z-10 select-none pointer-events-none tracking-tighter" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                FILTER
            </div>

            {/* Minimalist Search */}
            <div className="relative group/search pt-4">
                <input
                    type="text"
                    placeholder={s.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full bg-transparent border-0 border-b-2 border-neutral-200 py-3 pl-0 pr-8 text-lg font-display placeholder:text-neutral-400 placeholder:font-light outline-none transition-colors duration-500 focus:border-gold-500 peer"
                />
                <Search className="absolute right-0 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5 transition-colors duration-500 peer-focus:text-gold-500" />
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gold-500 transition-all duration-500 ease-out peer-focus:w-full"></div>
            </div>

            {/* Artistic Categories (Pills) */}
            <div>
                <h3 className="text-sm font-mono uppercase tracking-[0.3em] text-neutral-900 mb-6 flex items-center gap-4">
                    <span className="w-4 h-[1px] bg-gold-500"></span>
                    {s.categories}
                </h3>
                <div className="flex flex-wrap gap-3 mt-4">
                    {productTypes.map(type => (
                        <button
                            key={type}
                            onClick={() => toggleType(type)}
                            className={`relative px-5 py-2.5 rounded-full text-xs font-display tracking-widest uppercase transition-all duration-500 overflow-hidden group ${selectedTypes.includes(type)
                                ? 'bg-black text-white shadow-lg shadow-black/10 scale-105'
                                : 'bg-white text-neutral-500 border border-neutral-200 hover:border-black hover:text-black'
                                }`}
                        >
                            {/* Hover sweep effect */}
                            <span className={`absolute inset-0 bg-gold-500 translate-y-full transition-transform duration-500 ease-out ${selectedTypes.includes(type) ? 'group-hover:translate-y-0' : ''} -z-10`}></span>
                            <span className="relative z-10">{type}</span>

                            {/* Active indicator dot */}
                            {selectedTypes.includes(type) && (
                                <motion.span
                                    layoutId="activeCategoryDot"
                                    className="absolute top-1 right-1 w-1.5 h-1.5 bg-gold-500 rounded-full"
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Price Range (Elegant Readout) */}
            <div>
                <h3 className="text-sm font-mono uppercase tracking-[0.3em] text-neutral-900 mb-8 flex items-center gap-4">
                    <span className="w-4 h-[1px] bg-gold-500"></span>
                    {s.maxPrice}
                </h3>

                <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-4xl font-display font-light text-black tracking-tighter">
                        {priceRange.toLocaleString()}
                    </span>
                    <span className="text-sm font-mono text-gold-500 font-semibold">DA</span>
                </div>

                <div className="relative pt-2 pb-8">
                    {/* Artistic Track */}
                    <div className="absolute top-1/2 left-0 w-full h-[2px] bg-neutral-200 -translate-y-1/2">
                        <div
                            className="absolute top-0 left-0 h-full bg-black transition-all duration-300 ease-out"
                            style={{ width: `${((priceRange - 1000) / 19000) * 100}%` }}
                        ></div>
                    </div>

                    <input
                        type="range"
                        min="1000"
                        max="20000"
                        step="500"
                        value={priceRange}
                        onChange={(e) => setPriceRange(Number(e.target.value))}
                        className="w-full h-2 appearance-none bg-transparent cursor-pointer absolute top-1/2 left-0 -translate-y-1/2 z-10 
                                   [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 
                                   [&::-webkit-slider-thumb]:bg-gold-500 [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white 
                                   [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:transition-transform
                                   [&::-webkit-slider-thumb]:hover:scale-125 [&::-webkit-slider-thumb]:active:scale-95"
                    />
                </div>
            </div>

            {/* Availability (Switch style) */}
            <div>
                <h3 className="text-sm font-mono uppercase tracking-[0.3em] text-neutral-900 mb-6 flex items-center gap-4">
                    <span className="w-4 h-[1px] bg-gold-500"></span>
                    {s.availability}
                </h3>
                <button
                    onClick={() => setInStockOnly(!inStockOnly)}
                    className="flex items-center gap-4 group cursor-pointer w-full"
                >
                    <div className={`relative w-12 h-6 rounded-full transition-colors duration-500 ease-in-out ${inStockOnly ? 'bg-gold-500' : 'bg-neutral-200'}`}>
                        <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) ${inStockOnly ? 'translate-x-6' : 'translate-x-0'}`}></div>
                    </div>
                    <span className={`text-sm font-display uppercase tracking-widest transition-colors duration-300 ${inStockOnly ? 'text-black font-semibold' : 'text-neutral-500 group-hover:text-black'}`}>
                        {s.inStockOnly}
                    </span>
                </button>
            </div>

            {/* Reset Filters (Artistic reveal) */}
            <AnimatePresence>
                {(selectedTypes.length > 0 || searchQuery !== '' || priceRange < 20000 || inStockOnly) && (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="pt-8"
                    >
                        <button
                            onClick={() => {
                                setSelectedTypes([]);
                                setSearchQuery('');
                                setPriceRange(20000);
                                setInStockOnly(false);
                            }}
                            className="relative text-xs font-mono uppercase tracking-[0.2em] text-black overflow-hidden group/reset flex items-center gap-3 py-2"
                        >
                            <span className="w-8 h-[1px] bg-black transition-all duration-500 group-hover/reset:w-12 group-hover/reset:bg-red-500"></span>
                            <span className="relative z-10 transition-colors duration-500 group-hover/reset:text-red-500">{s.clearSelection}</span>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-6 pb-24 flex flex-col lg:flex-row gap-12 relative min-h-[60vh]">

            {/* Checkout & Preview Modal */}
            <AnimatePresence>
                {selectedProduct && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => {
                            if (checkoutStep === 'success') {
                                setSelectedProduct(null);
                                setCheckoutStep('preview');
                            }
                        }}
                    >
                        <motion.div
                            initial={{ y: 50, scale: 0.95 }}
                            animate={{ y: 0, scale: 1 }}
                            exit={{ y: 20, scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col relative"
                        >
                            {/* Golden Boxes Ripple Background */}
                            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl z-0">
                                <motion.div
                                    animate={{
                                        scale: [1, 1.1, 1],
                                        opacity: [0.6, 1, 0.6]
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.3)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_50%,transparent_100%)]"
                                />
                            </div>

                            {/* Header */}
                            <div className="flex justify-between items-center p-6 border-b border-neutral-100 bg-white/60 backdrop-blur-sm relative z-10">
                                <h2 className="text-xl font-display uppercase tracking-wider">
                                    {checkoutStep === 'preview' ? s.productDetails : checkoutStep === 'form' ? s.checkout : s.orderConfirmed}
                                </h2>
                                <button
                                    onClick={() => {
                                        setSelectedProduct(null);
                                        setTimeout(() => setCheckoutStep('preview'), 300);
                                    }}
                                    className="p-2 hover:bg-neutral-200 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Body */}
                            <div className="overflow-y-auto flex-1 p-6 md:p-8 relative z-10">
                                {checkoutStep === 'preview' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
                                        <div className="bg-neutral-50 rounded-2xl p-8 flex items-center justify-center relative aspect-[4/5]">
                                            <Image
                                                src={selectedProduct.image}
                                                alt={selectedProduct.name}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                                className="object-contain hover:scale-110 transition-transform duration-500 max-w-[80%]"
                                            />
                                            {selectedProduct.badge && (
                                                <div className="absolute top-4 left-4 z-10 bg-gold-500 text-black text-[10px] font-bold uppercase tracking-widest py-1 px-3 rounded-full shadow-lg">
                                                    {selectedProduct.badge}
                                                </div>
                                            )}
                                        </div>
                                        <div className="space-y-6">
                                            <div>
                                                <p className="text-xs font-mono uppercase tracking-widest text-gold-600 mb-2">{selectedProduct.type}</p>
                                                <h3 className="text-3xl md:text-4xl font-display uppercase tracking-wide mb-2">{selectedProduct.name}</h3>
                                                <div className="flex items-center gap-2 text-gold-500 mb-4">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(selectedProduct.rating) ? 'fill-current' : 'text-neutral-200'}`} />
                                                    ))}
                                                    <span className="text-sm text-neutral-500 font-mono ml-2">({selectedProduct.reviews} reviews)</span>
                                                </div>
                                                <p className="text-3xl font-mono font-medium">{selectedProduct.price.toLocaleString()} DA</p>
                                            </div>

                                            <div className="pt-6 border-t border-neutral-100">
                                                <h4 className="font-bold text-sm uppercase tracking-wider mb-2">{s.flavorProfile}</h4>
                                                <p className="text-neutral-600">{selectedProduct.flavor}</p>
                                            </div>

                                            <div className="pt-2">
                                                <p className="text-neutral-600 leading-relaxed text-sm">
                                                    {s.productDescription}
                                                </p>
                                            </div>

                                            <div className="pt-4 border-t border-neutral-100">
                                                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 mb-3">{s.shareProduct}</p>
                                                <div className="flex gap-3">
                                                    <button className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-500 hover:bg-[#25D366] hover:text-white transition-all duration-300" title="WhatsApp">
                                                        <MessageCircle className="w-5 h-5" />
                                                    </button>
                                                    <button className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-500 hover:bg-[#1877F2] hover:text-white transition-all duration-300" title="Facebook">
                                                        <Facebook className="w-5 h-5" />
                                                    </button>
                                                    <button className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-500 hover:bg-[#0088cc] hover:text-white transition-all duration-300" title="Telegram">
                                                        <Send className="w-5 h-5" />
                                                    </button>
                                                    <button className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-500 hover:bg-black hover:text-white transition-all duration-300" title="Copy Link">
                                                        <Share2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="pt-6 flex gap-4">
                                                <button
                                                    onClick={() => {
                                                        addToCart(selectedProduct);
                                                    }}
                                                    className={`px-6 py-4 border-2 rounded-lg font-display uppercase tracking-widest transition-all text-sm flex items-center gap-2 ${addedToCartId === selectedProduct.id ? 'bg-green-500 border-green-500 text-white' : 'border-black hover:bg-neutral-100'}`}
                                                >
                                                    {addedToCartId === selectedProduct.id ? (
                                                        <><Check className="w-4 h-4" /> {s.added}</>
                                                    ) : (
                                                        <><ShoppingCart className="w-4 h-4" /> {s.addToCart}</>
                                                    )}
                                                </button>
                                                <button
                                                    onClick={() => setCheckoutStep('form')}
                                                    className="flex-1 bg-black text-white py-4 px-8 rounded-lg font-display uppercase tracking-widest hover:bg-gold-500 hover:text-black transition-colors"
                                                >
                                                    {s.buyNow}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {checkoutStep === 'form' && (
                                    <div className="max-w-2xl mx-auto w-full">
                                        <div className="flex items-center gap-4 p-4 mb-8 bg-neutral-50 rounded-xl border border-neutral-100">
                                            <div className="relative w-16 h-16 shrink-0 bg-white rounded-lg p-2 border border-neutral-100">
                                                <Image src={selectedProduct.image} alt={selectedProduct.name} fill sizes="64px" className="object-contain" />
                                            </div>
                                            <div>
                                                <h4 className="font-display uppercase tracking-wide">{selectedProduct.name}</h4>
                                                <p className="text-sm font-mono text-neutral-500">{selectedProduct.price.toLocaleString()} DA</p>
                                            </div>
                                        </div>

                                        <form onSubmit={handleCheckoutSubmit} className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold uppercase tracking-wider text-neutral-700">{s.fullName}</label>
                                                    <input required type="text" className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-4 focus:ring-2 focus:ring-gold-500 focus:outline-none" placeholder="Fateh Belkacem" value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold uppercase tracking-wider text-neutral-700">{s.phoneNumber}</label>
                                                    <input required type="tel" className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-4 focus:ring-2 focus:ring-gold-500 focus:outline-none" placeholder="0555 XXXXXX" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold uppercase tracking-wider text-neutral-700">{s.wilaya}</label>
                                                    <input required type="text" className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-4 focus:ring-2 focus:ring-gold-500 focus:outline-none" placeholder="e.g., Algiers, Oran" value={formData.stateWilaya} onChange={e => setFormData({ ...formData, stateWilaya: e.target.value })} />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold uppercase tracking-wider text-neutral-700">{s.commune}</label>
                                                    <input required type="text" className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-4 focus:ring-2 focus:ring-gold-500 focus:outline-none" placeholder="e.g., Hydra, Bab Ezzouar" value={formData.districtCommune} onChange={e => setFormData({ ...formData, districtCommune: e.target.value })} />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-bold uppercase tracking-wider text-neutral-700 text-neutral-500 flex justify-between">
                                                    <span>{s.feedback}</span>
                                                    <span className="text-neutral-400 font-normal lowercase tracking-normal">{s.optional}</span>
                                                </label>
                                                <textarea className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-4 focus:ring-2 focus:ring-gold-500 focus:outline-none min-h-[100px]" placeholder="Anything else you want us to know about your order?" value={formData.feedback} onChange={e => setFormData({ ...formData, feedback: e.target.value })} />
                                            </div>

                                            <div className="pt-6 flex gap-4 border-t border-neutral-100">
                                                <button type="button" onClick={() => setCheckoutStep('preview')} className="px-6 py-4 font-display uppercase tracking-widest text-neutral-500 hover:bg-neutral-100 rounded-lg transition-colors">
                                                    {s.back}
                                                </button>
                                                <button type="submit" className="flex-1 bg-gold-500 text-black py-4 px-8 rounded-lg font-display uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
                                                    {s.confirmDelivery}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                )}

                                {checkoutStep === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="py-16 flex flex-col items-center justify-center text-center max-w-lg mx-auto"
                                    >
                                        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6 border-8 border-green-100">
                                            <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <h3 className="text-4xl font-display uppercase tracking-wider mb-4">{s.requestReceived}</h3>
                                        <p className="text-neutral-600 text-lg mb-8">
                                            {s.requestReceived}! <span className="font-bold text-black">{formData.fullName || 'Athlete'}</span>. {s.nextSteps}: <span className="font-bold text-black">{selectedProduct.name}</span>.
                                        </p>
                                        <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-100 w-full mb-8">
                                            <p className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-2">{s.nextSteps}</p>
                                            <p className="text-black font-medium">We'll be in contact with you shortly at <span className="font-bold text-gold-600 border-b border-gold-200">{formData.phone}</span> to arrange delivery to {formData.districtCommune}, {formData.stateWilaya}.</p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                setSelectedProduct(null);
                                                setTimeout(() => setCheckoutStep('preview'), 300);
                                            }}
                                            className="bg-black text-white px-8 py-4 rounded-lg font-display uppercase tracking-widest hover:bg-neutral-800 transition-colors w-full"
                                        >
                                            {s.returnCatalog}
                                        </button>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Filter Toggle */}
            <div className="lg:hidden flex justify-between items-center bg-neutral-50 p-4 border border-neutral-200 rounded-lg select-none cursor-pointer hover:bg-neutral-100 transition-colors" onClick={() => setIsMobileFiltersOpen(true)}>
                <span className="font-display uppercase tracking-wider text-sm flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4" /> {s.filtersSort}
                </span>
                <span className="text-sm font-mono text-neutral-500">{filteredProducts.length} {s.results}</span>
            </div>

            {/* Mobile Sidebar Modal */}
            <AnimatePresence>
                {isMobileFiltersOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: -300 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -300 }}
                        className="fixed inset-0 z-[600] bg-white lg:hidden overflow-y-auto"
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-8 border-b border-neutral-100 pb-4">
                                <h2 className="text-2xl font-display uppercase tracking-wider">{s.filtersSort}</h2>
                                <button onClick={() => setIsMobileFiltersOpen(false)} className="p-2 hover:bg-neutral-100 rounded-md">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            {SidebarContent}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-72 shrink-0">
                <div className="sticky top-32">
                    {SidebarContent}
                </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
                <div className="hidden lg:flex justify-between items-center mb-8 pb-4 border-b border-neutral-100">
                    <h2 className="text-xl font-display uppercase tracking-wider">{s.catalog}</h2>
                    <p className="text-sm text-neutral-500 font-mono">{s.showing} {filteredProducts.length} {s.results}</p>
                </div>

                {filteredProducts.length === 0 ? (
                    <div className="py-24 text-center">
                        <h3 className="text-2xl font-display uppercase text-neutral-300 tracking-wider mb-4">{s.noProducts}</h3>
                        <p className="text-neutral-500">{s.noProductsDesc}</p>
                    </div>
                ) : (
                    <motion.div layout className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
                        <AnimatePresence mode="popLayout">
                            {filteredProducts.map(product => (
                                <motion.div
                                    key={product.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    className="group bg-white p-3 sm:p-6 rounded-xl sm:rounded-2xl border border-neutral-100 hover:border-gold-200 shadow-sm hover:shadow-xl transition-all duration-500 relative flex flex-col"
                                >
                                    {product.badge && (
                                        <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10 bg-black text-white text-[8px] sm:text-[10px] font-bold uppercase tracking-widest py-0.5 px-2 sm:py-1 sm:px-3 rounded-full">
                                            {product.badge}
                                        </div>
                                    )}
                                    {!product.inStock && (
                                        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 bg-red-500 text-white text-[8px] sm:text-[10px] font-bold uppercase tracking-widest py-0.5 px-2 sm:py-1 sm:px-3 rounded-full">
                                            {s.outOfStock}
                                        </div>
                                    )}
                                    <div className="relative aspect-[3/4] mb-3 sm:mb-6 overflow-hidden rounded-lg sm:rounded-xl bg-neutral-50/50 flex items-center justify-center p-2 sm:p-4">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className={`object-contain transition-transform duration-700 ${product.inStock ? 'group-hover:scale-110' : 'grayscale opacity-60'}`}
                                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                            quality={75}
                                            priority={product.id <= 6}
                                        />
                                        {product.inStock && (
                                            <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-20">
                                                <button onClick={() => setSelectedProduct(product)} className="w-full py-3 bg-black text-white font-display uppercase tracking-wider text-xs flex items-center justify-center gap-2 hover:bg-gold-500 hover:text-black transition-all duration-300">
                                                    <ShoppingCart size={14} /> {s.viewDetails}
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-grow flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-2">
                                                <p className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-gold-600">{product.type}</p>
                                                <div className="flex items-center gap-1 text-gold-500">
                                                    <Star className="w-3 h-3 fill-current" />
                                                    <span className="text-xs text-neutral-500 font-mono">{product.rating}</span>
                                                </div>
                                            </div>
                                            <h3 className="text-xs sm:text-lg font-display uppercase tracking-wide leading-tight mb-1 group-hover:text-gold-500 transition-colors line-clamp-2">{product.name}</h3>
                                            <div className="flex items-center gap-1 sm:gap-2 overflow-hidden">
                                                <p className="text-neutral-500 text-[10px] sm:text-xs font-medium bg-neutral-100 px-1.5 py-0.5 rounded uppercase tracking-wider whitespace-nowrap">{product.flavor}</p>
                                                {(product as any).weight && (
                                                    <p className="text-neutral-500 text-[10px] sm:text-xs font-medium bg-neutral-100 px-1.5 py-0.5 rounded uppercase tracking-wider whitespace-nowrap">{(product as any).weight}</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="mt-3 sm:mt-6 pt-2 sm:pt-4 border-t border-neutral-100 flex justify-between items-center">
                                            <span className="text-xs sm:text-lg font-medium font-mono tracking-tighter">{product.price.toLocaleString()} <span className="text-[8px] sm:text-[10px] text-gold-600 ml-0.5 uppercase">DA</span></span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>

            {/* Cart Toast Notification */}
            <AnimatePresence>
                {cartToast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, x: 20 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="fixed bottom-6 right-6 z-[300] bg-black text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 border border-gold-500/30"
                    >
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shrink-0">
                            <Check className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <p className="font-display uppercase tracking-wider text-sm">{cartToast}</p>
                            <p className="text-neutral-400 text-xs font-mono mt-0.5">View your cart in the navbar</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
