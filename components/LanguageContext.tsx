'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Locale } from '@/locales/translations';

type LanguageContextType = {
    locale: Locale;
    setLocale: (val: Locale) => void;
    t: typeof translations.en;
    dir: 'ltr' | 'rtl';
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [locale, setLocale] = useState<Locale>('en');
    const [mounted, setMounted] = useState(false);

    // Sync with localStorage on mount — SSR safe
    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem('gb_lang') as Locale;
        if (saved && ['en', 'fr', 'ar'].includes(saved)) {
            setLocale(saved);
        }
    }, []);

    const handleSetLocale = (newLocale: Locale) => {
        setLocale(newLocale);
        localStorage.setItem('gb_lang', newLocale);
    };

    const direction = locale === 'ar' ? 'rtl' : 'ltr';

    useEffect(() => {
        // Apply RTL/LTR to html element so scrollbars and fixed elements adapt correctly
        document.documentElement.dir = direction;
        document.documentElement.lang = locale;
        // Add/remove RTL class on body for targeted CSS overrides
        document.body.classList.toggle('rtl', locale === 'ar');
    }, [direction, locale]);

    return (
        <LanguageContext.Provider value={{ locale, setLocale: handleSetLocale, t: translations[locale], dir: direction }}>
            {/* 
              The dir attribute here ensures all non-fixed page content inherits correct RTL flow.
              The Navbar uses dir="ltr" explicitly to stay left-to-right regardless.
            */}
            <div dir={mounted ? direction : 'ltr'} lang={mounted ? locale : 'en'} style={{ fontFamily: locale === 'ar' ? '"Cairo", "Noto Sans Arabic", system-ui, sans-serif' : undefined }}>
                {children}
            </div>
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
