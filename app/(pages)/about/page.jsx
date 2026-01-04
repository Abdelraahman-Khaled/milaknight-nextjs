import Script from "next/script";
import AboutHero from './components/AboutHero';
import ScrollTicker from '@/app/components/ui/ScrollTicker';
import Parteners from '@/app/components/Parteners';
import Faqs from '@/app/components/Faqs';

import AboutScripts from './components/AboutScripts';
import AboutIntro from './components/AboutIntro';
import ConsultancySection from './components/ConsultancySection';
import WhoWeAre from './components/WhoWeAre';
import WhyChooseUs from './components/WhyChooseUs';



export default function AboutPage() {
    return (
        <>
            <AboutHero />

            <ScrollTicker />

            <AboutIntro />

            <Parteners />

            <ConsultancySection />

            <WhoWeAre />

            <WhyChooseUs />

            {/* Dynamic FAQ Section */}
            <Faqs />

            {/* Legacy Scripts Logic */}
            <AboutScripts />

            {/* Legacy Scripts */}
            <Script src="/js/jquery-3.7.1.min.js" strategy="beforeInteractive" />
            <Script src="/js/jquery.waypoints.min.js" strategy="lazyOnload" />
            <Script src="/js/jquery.counterup.min.js" strategy="lazyOnload" />
            <Script src="/js/gsap.min.js" strategy="lazyOnload" />
            <Script src="/js/ScrollTrigger.min.js" strategy="lazyOnload" />
            <Script src="/js/SplitText.min.js" strategy="lazyOnload" />
            <Script src="/js/jquery.slicknav.min.js" strategy="lazyOnload" />
            <Script src="/js/type.min.js" strategy="lazyOnload" />
            <Script src="/js/magiccursor.min.js" strategy="lazyOnload" />
        </>
    );
}
