"use client";
import React, { useContext, useState, useEffect } from 'react'
import Image from 'next/image';
import { LanguageContext } from '../../../../context/LanguageContext';

const data = {
    ar: {
        title: "وكالة التسويق الرقمي",
        src1: "/images/Milaknight Video 04.webm",
        src2: "/images/Milaknight Video 04 Reel.mp4"
    },
    en: {
        title: "Digital marketing agency",
        src1: "/images/Milaknight Hero Sesction Video Eng.webm",
        src2: "/images/Milaknight Hero Sesction Vertical Eng.webm"
    }
}

const HeroHome = () => {
    // 1. Destructure with a fallback to avoid the "undefined" error
    const context = useContext(LanguageContext);
    const language = context?.language || 'en'; // Default to 'en' if context is missing

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // 2. Prevent accessing 'data[language]' if the key doesn't exist yet
    const currentData = data[language] || data['en'];
    return (
        <div className="hero hero-slider-layout">
            <div className="hero-slide slide-2">
                {/* LCP Element: Optimized Image with Priority */}
                <Image
                    src="/images/page-header-bg.webp"
                    alt={currentData.title}
                    fill
                    priority
                    className="video"
                    style={{ objectFit: 'cover', zIndex: 1 }}
                />

                {isMounted && (
                    <>
                        <video
                            autoPlay
                            muted
                            playsInline
                            loop
                            className="video"
                            src={currentData.src1}
                            poster="/images/page-header-bg.webp"
                            preload="metadata"
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 2 }}
                            onCanPlay={(e) => {
                                e.currentTarget.style.opacity = 1;
                            }}
                        ></video>
                        <video
                            autoPlay
                            muted
                            playsInline
                            loop
                            className="video-2"
                            src={currentData.src2}
                            poster="/images/page-header-bg.webp"
                            preload="metadata"
                            style={{ zIndex: 3 }}
                        ></video>
                    </>
                )}
                <h1 style={{ zIndex: 10, position: 'relative' }}>{currentData.title}</h1>
            </div>
        </div>
    )
}
export default HeroHome