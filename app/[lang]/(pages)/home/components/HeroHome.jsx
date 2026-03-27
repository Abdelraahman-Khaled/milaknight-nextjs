'use client'
import React, { useContext } from 'react'
import { LanguageContext } from '@/app/context/LanguageContext'

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
    const { language } = useContext(LanguageContext);

    return (
        <div className="hero hero-slider-layout">
            <div className="hero-slide slide-2">
                <video autoPlay muted playsInline loop className="video" src={data[language].src1}></video>
                <video autoPlay muted playsInline loop className="video-2" src={data[language].src2}></video>
                <h1>{data[language].title}</h1>
            </div>
        </div>
    )
}
export default HeroHome