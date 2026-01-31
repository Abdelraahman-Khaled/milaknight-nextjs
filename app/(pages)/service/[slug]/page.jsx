"use client";
import React, { useContext } from 'react';
import { notFound, useParams } from 'next/navigation';
import { LanguageContext } from '@/app/context/LanguageContext';
import { servicesData } from '@/app/data/servicesData';
import HeroSection from '@/app/components/ui/HeroSection';
import ScrollTicker from '@/app/components/ui/ScrollTicker';
import ServiceContent from '../components/ServiceContent';
import ServiceSidebar from '../components/ServiceSidebar';

const ServicePage = () => {
    const { slug } = useParams();
    const { language } = useContext(LanguageContext);

    // Check if service exists
    if (!servicesData[slug]) {
        return notFound();
    }

    const data = servicesData[slug][language];

    // Update Metadata Client-Side
    React.useEffect(() => {
        document.title = data.meta_title;

        // Meta Description
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', data.meta_description);

        // OG Tags
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute('content', data.meta_title);

        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) ogDesc.setAttribute('content', data.meta_description);

        // Twitter Tags
        const twTitle = document.querySelector('meta[name="twitter:title"]');
        if (twTitle) twTitle.setAttribute('content', data.meta_title);

        const twDesc = document.querySelector('meta[name="twitter:description"]');
        if (twDesc) twDesc.setAttribute('content', data.meta_description);

    }, [data]);

    return (
        <>
            <HeroSection
                title={data.hero.title}
                subtitle={data.hero.subtitle}
                span={data.hero.span}
                title_end={data.hero.title_end}
                breadcrumb={data.hero.breadcrumb}
                page={data.hero.title} // Used for breadcrumb active state usually
            />

            <ScrollTicker />

            <div className="page-service-single">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <ServiceContent content={data.content} />
                        </div>
                        <div className="col-lg-4">
                            <ServiceSidebar
                                categories={data.sidebar}
                                contactBox={data.sidebar.contact_box}
                                activeSlug={slug}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ServicePage;
