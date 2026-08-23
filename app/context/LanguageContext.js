"use client";

import React, { createContext, useState, useEffect, useRef, useCallback } from 'react';
import translations from './translations';
import { useRouter, usePathname } from 'next/navigation';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children, lang }) => {
    const [language, setLanguage] = useState(lang || 'ar');
    // Tagged with the pathname that registered it. A page-specific alternate —
    // a blog post whose two languages have different slugs, say — is only valid
    // for the page it came from, so it carries that page with it instead of
    // being cleared on navigation.
    const [alternate, setAlternate] = useState(null);
    const prevLanguage = useRef(language);
    const router = useRouter();
    const pathname = usePathname();

    // Rebuilt per route on purpose. Children list this in their effect
    // dependencies, so a new identity re-runs their registration after a
    // navigation — which is what keeps the tag below pointing at the right page.
    const setAlternatePath = useCallback((value) => {
        setAlternate((prev) => {
            const next = typeof value === 'function' ? value(prev?.href ?? null) : value;
            if (!next) return null;
            if (prev && prev.href === next && prev.path === pathname) return prev;
            return { path: pathname, href: next };
        });
    }, [pathname]);

    useEffect(() => {
        if (lang && lang !== language) {
            setLanguage(lang);
        }
    }, [lang]);

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

        // Only trust an alternate that belongs to the page we are still on.
        if (alternate && alternate.path === pathname) {
            router.push(alternate.href);
            return;
        }

        const pathParts = pathname.split('/');
        // If the URL starts with a locale, replace it
        if (pathParts[1] === language) {
            pathParts[1] = newLang;
            router.push(pathParts.join('/'));
        } else {
            router.push(`/${newLang}${pathname === '/' ? '' : pathname}`);
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
