import React from 'react'
import HeroHome from './(pages)/home/components/HeroHome'
import ScrollTicker from '@/app/components/ui/ScrollTicker'
import AboutAgency from './(pages)/home/components/AboutAgency'
import Parteners from '@/app/components/Parteners'
import OurServices from './(pages)/home/components/OurServices'
import WhyChooseUs from './(pages)/about/components/WhyChooseUs'
import WhatWeDo from './(pages)/home/components/WhatWeDo'
import BestWorks from './(pages)/home/components/BestWorks'
import Testimonial from './(pages)/home/components/Testimonial'
import LatestNews from './(pages)/home/components/LatestNews'

const HomePage = () => {
    return (
        <>
            <HeroHome />
            <ScrollTicker />
            <AboutAgency />
            <Parteners />
            <OurServices />
            <WhyChooseUs home={true} />
            <WhatWeDo />
            <BestWorks />
            <Testimonial />
            <LatestNews />
        </>
    )
}

export default HomePage