'use client';
import React, { useContext } from 'react'
import Link from 'next/link'
import { LanguageContext } from '@/app/context/LanguageContext'
import { videosPortfolioData } from './data'

const VideosPortfolio = () => {
    const { language } = useContext(LanguageContext);
    const { items } = videosPortfolioData[language];

    return (
        <div className="new-profile">
            {items.map((item, index) => (
                <div key={index} className="box-new-profile">
                    <video autoPlay muted playsInline loop preload="metadata">
                        <source src={item.video} type="video/mp4" />
                    </video>
                    <Link href={item.href} className="btn-box-new-profile">
                        {item.label}
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default VideosPortfolio