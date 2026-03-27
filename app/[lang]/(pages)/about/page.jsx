import AboutHero from './components/AboutHero';
import ScrollTicker from '@/app/components/ui/ScrollTicker';
import Parteners from '@/app/components/Parteners';
import Faqs from '@/app/components/Faqs';
import AboutIntro from './components/AboutIntro';
import ConsultancySection from './components/ConsultancySection';
import WhoWeAre from './components/WhoWeAre';
import WhyChooseUs from './components/WhyChooseUs';
import { getFaqs } from '@/app/api/FAQ';

import translations from '@/app/context/translations';
import { cookies } from 'next/headers';

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const language = lang || 'ar';
    const t = translations[language];

    return {
        title: t.about_seo_title,
        description: t.about_seo_description,
    };
}

export default async function AboutPage({ params }) {
    const { lang } = await params;
    const faqs = await getFaqs();

    return (
        <>
            <AboutHero />
            <ScrollTicker />
            <AboutIntro />
            <Parteners />
            <ConsultancySection />
            <WhoWeAre />
            <WhyChooseUs />
            <Faqs initialFaqs={faqs} />
        </>
    );
}
