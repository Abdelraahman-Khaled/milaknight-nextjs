import React from 'react'
import HeroHome from './(pages)/home/components/HeroHome'
import ScrollTicker from '@/app/components/ui/ScrollTicker'
import AboutAgency from './(pages)/home/components/AboutAgency'
import Parteners from '@/app/components/Parteners'
import TechPartners from '@/app/components/TechPartners'
import OurServices from './(pages)/home/components/OurServices'
import WhyChooseUs from './(pages)/about/components/WhyChooseUs'
import WhatWeDo from './(pages)/home/components/WhatWeDo'
import BestWorks from './(pages)/home/components/BestWorks'
import Testimonial from './(pages)/home/components/Testimonial'
import LatestNews from './(pages)/home/components/LatestNews'
import { getBlogs } from '@/app/api/blog'

import translations from './context/translations';
import { cookies } from 'next/headers';

export async function generateMetadata() {
    const cookieStore = await cookies();
    const language = cookieStore.get('NEXT_LOCALE')?.value || 'ar';
    const t = translations[language];

    return {
        title: t.seo_title,
        description: t.seo_description,
        openGraph: {
            title: t.seo_title,
            description: t.seo_description,
        },
    };
}

const HomePage = async () => {
    const blogs = await getBlogs();

    return (
        <>
            <HeroHome />
            <ScrollTicker />
            <AboutAgency />
            <Parteners />
            <TechPartners />
            <OurServices />
            <WhyChooseUs home={true} />
            <WhatWeDo />
            <BestWorks />
            <Testimonial />
            <LatestNews initialBlogs={blogs} />
        </>
    )
}

export default HomePage