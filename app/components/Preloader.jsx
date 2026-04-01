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

    useEffect(() => {
        // Only on initial mount
        const timer1 = setTimeout(() => {
            setLoading(false);
        }, 200);

        return () => clearTimeout(timer1);
    }, []);

    useEffect(() => {
        if (!loading) {
            const timer2 = setTimeout(() => {
                setRender(false);
            }, 600);
            return () => clearTimeout(timer2);
        }
    }, [loading]);

    if (!render) return null;

    return (
        <div className={`react-preloader ${!loading ? 'loaded' : ''}`} style={{ display: 'flex', pointerEvents: !loading ? 'none' : 'auto' }}>
            <div className="loading-container">
                <div className="loading"></div>
                <div id="loading-icon">
                    <img alt="Milaknight loader" src="/images/icons/loader.svg" />
                </div>
            </div>
        </div>
    );
}
