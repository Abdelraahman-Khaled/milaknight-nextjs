"use client";

import React, { useContext } from 'react'
import HeroSection from '../../components/ui/HeroSection'
import { LanguageContext } from '../../context/LanguageContext';
import ScrollTicker from '@/app/components/ui/ScrollTicker';
import BlogsTabs from '@/app/components/blogs/blogsTabs';

const Blogs = () => {
    const { t } = useContext(LanguageContext);
    return (
        <>
            <HeroSection
                title={t('latest')}
                page={t('blog')}
                subtitle={t('blog')}
                breadcrumb={t('home')}
            />
            <ScrollTicker />
            <BlogsTabs />
        </>
    )
}

export default Blogs