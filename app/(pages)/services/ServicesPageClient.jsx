"use client";
import React, { useContext, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LanguageContext } from '@/app/context/LanguageContext';
import { mainServicesData } from '@/app/data/servicesData';
import HeroSection from '@/app/components/ui/HeroSection';
import ScrollTicker from '@/app/components/ui/ScrollTicker';
import HeaderDescription from '@/app/components/ui/HeaderDescription';

const ServicesPageClient = () => {
    const { language } = useContext(LanguageContext);
    const data = mainServicesData[language];

    useEffect(() => {
        if (data) {
            document.title = data.meta_title;
        }
    }, [data]);

    return (
        <>
            <HeroSection
                subtitle={data.hero.title}
                title=""
                breadcrumb={data.hero.breadcrumb}
                page={data.hero.page}
            />

            <ScrollTicker />

            <div className="our-services">
                <div className="container">
                    <HeaderDescription
                        title={data.intro.title}
                        subtitle={data.intro.subtitle}
                        span={data.intro.span}
                        desc={data.intro.desc}
                    />
                    <div className="services-row services-row-2">
                        {data.services.map((service, index) => (
                            <div key={index} className="service-col">
                                <Link href={service.href} className="service-item">
                                    <div className="service-item-header">
                                        <div className="icon-box">
                                            <Image
                                                alt={service.title}
                                                src={service.icon}
                                                width={50}
                                                height={50}
                                                unoptimized={service.icon.endsWith('.gif')}
                                            />
                                        </div>
                                    </div>
                                    <div className="service-item-body">
                                        <h3>{service.title}</h3>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ServicesPageClient;
