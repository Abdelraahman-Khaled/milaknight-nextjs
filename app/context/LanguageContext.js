"use client";

import React, { createContext, useState, useEffect, useRef } from 'react';
import translations from './translations';
import { useRouter, usePathname } from 'next/navigation';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children, lang }) => {
    const [language, setLanguage] = useState(lang || 'ar');
    const [alternatePath, setAlternatePath] = useState(null);
    const prevLanguage = useRef(language);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (lang && lang !== language) {
            setLanguage(lang);
        }
    }, [lang]);

    useEffect(() => {
        // Reset alternate path on every route change (except when switching language)
        setAlternatePath(null);
    }, [pathname]);

    useEffect(() => {
        // Delay updating prevLanguage to allow components to detect change
        const timer = setTimeout(() => {
            prevLanguage.current = language;
        }, 100);
        return () => clearTimeout(timer);
    }, [language]);

    useEffect(() => {
        // Update document attributes whenever language changes
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        // Set cookie for server-side access
        document.cookie = `NEXT_LOCALE=${language}; path=/; max-age=31536000; SameSite=Lax`;
    }, [language]);

    const toggleLanguage = () => {
        const newLang = language === 'ar' ? 'en' : 'ar';
        if (alternatePath) {
            router.push(alternatePath);
        } else {
            const pathParts = pathname.split('/');
            // If the URL starts with a locale, replace it
            if (pathParts[1] === language) {
                pathParts[1] = newLang;
                router.push(pathParts.join('/'));
            } else {
                router.push(`/${newLang}${pathname === '/' ? '' : pathname}`);
            }
        }
    };

    const t = (key) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t, prevLanguage, setAlternatePath }}>
            {children}
        </LanguageContext.Provider>
    );
};
