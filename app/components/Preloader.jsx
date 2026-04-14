"use client";
import React, { useEffect, useState } from 'react';

export default function Preloader() {
    const [loading, setLoading] = useState(true);
    const [render, setRender] = useState(true);

    useEffect(() => {
        // Only on initial mount
        const timer1 = setTimeout(() => {
            setLoading(false);
        }, 100);

        return () => clearTimeout(timer1);
    }, []);

    useEffect(() => {
        if (!loading) {
            const timer2 = setTimeout(() => {
                setRender(false);
            }, 300);
            return () => clearTimeout(timer2);
        }
    }, [loading]);

    if (!render) return null;

    return (
        <div className={` preloader ${loading ? 'loaded' : ''}`}>
            <div className="loading-container">
                <div className="loading"></div>
                <div id="loading-icon"><img alt="Milaknight loader" src="/images/icons/loader.svg" /></div>
            </div>
        </div>
    );
}
