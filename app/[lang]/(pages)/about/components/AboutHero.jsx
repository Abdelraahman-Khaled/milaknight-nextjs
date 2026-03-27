"use client";
import React, { useContext } from 'react';
import { LanguageContext } from '@/app/context/LanguageContext';
import { aboutData } from '@/app/data/aboutData';
import HeroSection from '@/app/components/ui/HeroSection';

const AboutHero = () => {
    const { language } = useContext(LanguageContext);
    const c = aboutData[language];

    // Update Metadata Client-Side
    React.useEffect(() => {
        document.title = c.meta_title;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', c.meta_description);
        }
    }, [c]);

    return (
        <HeroSection
            title={c.title}
            subtitle={c.subtitle}
            breadcrumb={c.breadcrumb}
            page={c.page}
        />
    );
};

export default AboutHero;
