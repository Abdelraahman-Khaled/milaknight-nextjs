"use client";

import React, { createContext, useState, useEffect, useRef } from 'react';
import translations from './translations';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('ar');
    const prevLanguage = useRef(language);

    useEffect(() => {
        prevLanguage.current = language;
    }, [language]);

    useEffect(() => {
        // Load saved language on mount
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            setLanguage(savedLanguage);
        }
    }, []);

    useEffect(() => {
        // Save language and update document attributes
        localStorage.setItem('language', language);
        // Set cookie for server-side access
        document.cookie = `NEXT_LOCALE=${language}; path=/; max-age=31536000; SameSite=Lax`;
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    }, [language]);

    const toggleLanguage = () => {
        setLanguage((prevLang) => (prevLang === 'ar' ? 'en' : 'ar'));
    };

    const t = (key) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t, prevLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};
