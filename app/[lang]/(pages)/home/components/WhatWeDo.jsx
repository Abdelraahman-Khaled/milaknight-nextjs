'use client';

import HeaderDescription from '@/app/components/ui/HeaderDescription'
import React, { useContext } from 'react'
import VideosPortfolio from './VideosPortfolio'
import { LanguageContext } from '@/app/context/LanguageContext';
import { headerDescriptionData } from './data';

const WhatWeDo = () => {
    const { language } = useContext(LanguageContext);
    const content = headerDescriptionData[language];
    return (
        <div className='container our-portfolio'>
            <HeaderDescription
                title={content.title}
                subtitle={content.subtitle}
                span={content.span}
                desc={content.desc}
            />
            <VideosPortfolio />
        </div>
    )
}

export default WhatWeDo