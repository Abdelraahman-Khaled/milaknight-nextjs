import React from 'react'
import HeroHome from '@/app/[lang]/(pages)/home/components/HeroHome'
import ScrollTicker from '@/app/components/ui/ScrollTicker'
import AboutAgency from '@/app/[lang]/(pages)/home/components/AboutAgency'
import Parteners from '@/app/components/Parteners'
import TechPartners from '@/app/components/TechPartners'
import OurServices from '@/app/[lang]/(pages)/home/components/OurServices'
import WhyChooseUs from '@/app/[lang]/(pages)/about/components/WhyChooseUs'
import WhatWeDo from '@/app/[lang]/(pages)/home/components/WhatWeDo'
import BestWorks from '@/app/[lang]/(pages)/home/components/BestWorks'
import Testimonial from '@/app/[lang]/(pages)/home/components/Testimonial'
import LatestNews from '@/app/[lang]/(pages)/home/components/LatestNews'
import { getBlogs } from '@/app/api/blog'

import translations from '../context/translations';

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const t = translations[lang];

    return {
        title: t.seo_title,
        description: t.seo_description,
        openGraph: {
            title: t.seo_title,
            description: t.seo_description,
        },
    };
}

const HomePage = async ({ params }) => {
    const { lang } = await params;
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