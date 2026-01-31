import AboutHero from './components/AboutHero';
import ScrollTicker from '@/app/components/ui/ScrollTicker';
import Parteners from '@/app/components/Parteners';
import Faqs from '@/app/components/Faqs';
import AboutIntro from './components/AboutIntro';
import ConsultancySection from './components/ConsultancySection';
import WhoWeAre from './components/WhoWeAre';
import WhyChooseUs from './components/WhyChooseUs';
import { getFaqs } from '@/app/api/FAQ';

export default async function AboutPage() {
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
