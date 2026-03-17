"use client";
import React, { useContext, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { LanguageContext } from '@/app/context/LanguageContext';
import { servicesData } from '@/app/data/servicesData';
import HeroSection from '@/app/components/ui/HeroSection';
import ScrollTicker from '@/app/components/ui/ScrollTicker';
import ServiceContent from '../components/ServiceContent';
import ServiceSidebar from '../components/ServiceSidebar';

const ServicePageClient = ({ slug }) => {
    const { language } = useContext(LanguageContext);

    // Check if service exists
    if (!servicesData[slug]) {
        return notFound();
    }

    const data = servicesData[slug][language];

    // Client-side title update for immediate feedback when switching languages
    useEffect(() => {
        if (data) {
            document.title = data.meta_title;
        }
    }, [data]);

    return (
        <>
            <HeroSection
                title={data.hero.title}
                subtitle={data.hero.subtitle}
                span={data.hero.span}
                title_end={data.hero.title_end}
                breadcrumb={data.hero.breadcrumb}
                page={data.hero.title}
            />

            <ScrollTicker />

            <div className="page-service-single">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <ServiceContent content={data.content} hero={data.hero} />
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

export default ServicePageClient;
