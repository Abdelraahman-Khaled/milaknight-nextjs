import React from 'react'
import HeroHome from './components/HeroHome'
import ScrollTicker from '@/app/components/ui/ScrollTicker'
import AboutAgency from './components/AboutAgency'
import Parteners from '@/app/components/Parteners'
import OurServices from './components/OurServices'
import WhyChooseUs from '../about/components/WhyChooseUs'
import WhatWeDo from './components/WhatWeDo'
import BestWorks from './components/BestWorks'
import Testimonial from './components/Testimonial'
import LatestNews from './components/LatestNews'

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