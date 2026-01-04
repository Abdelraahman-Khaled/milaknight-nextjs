"use client";

import React, { createContext, useState, useEffect } from 'react';
import translations from './translations';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('ar');

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
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};
