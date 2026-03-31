"use client";
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

export default function Preloader() {
    const pathname = usePathname();
    const { language } = useContext(LanguageContext);
    const [loading, setLoading] = useState(true);
    const [render, setRender] = useState(true);
    const [prevPathname, setPrevPathname] = useState(pathname);
    const [prevLanguage, setPrevLanguage] = useState(language);

    // Render-phase state update to avoid FOUC
    if (pathname !== prevPathname || language !== prevLanguage) {
        setPrevPathname(pathname);
        setPrevLanguage(language);
        setLoading(true);
        setRender(true);
    }

    useEffect(() => {
        if (!loading) {
            const timer = setTimeout(() => {
                setRender(false);
            }, 600); // Wait for animation to finish
            return () => clearTimeout(timer);
        } else {
            setRender(true);
        }
    }, [loading]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 200); // Reduced from 500ms to 200ms for faster page access

        return () => clearTimeout(timer);
    }, [pathname, language, loading]);


    if (!render) return null;

    return (
        <div className={`react-preloader ${!loading ? 'loaded' : ''}`} style={{ display: 'flex' }}>
            <div className="loading-container">
                <div className="loading"></div>
                <div id="loading-icon">
                    <img alt="Milaknight loader" src="/images/icons/loader.svg" />
                </div>
            </div>
        </div>
    );
}
