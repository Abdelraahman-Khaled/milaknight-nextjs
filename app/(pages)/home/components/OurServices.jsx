'use client'
import SectionTitle from '@/app/components/ui/SectionTitle'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'
import { LanguageContext } from '@/app/context/LanguageContext'
import { servicesData } from './data'


const OurServices = () => {
    const { language } = useContext(LanguageContext);
    const content = servicesData[language];

    return (
        <div className="our-services">
            <div className="container">
                <div className="row align-items-center section-row">
                    <div className="col-lg-7">
                        <SectionTitle
                            title={content.sectionTitle}
                            subtitle={content.sectionSubtitle}
                            span={content.sectionSpan}
                            subtitle_end={content.sectionSubtitleEnd}
                        />
                    </div>
                    <div className="col-lg-5">
                        <div className="section-content-btn">
                            <div className="section-title-content">
                                <p>{content.sectionDescription}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="services-row">
                    {content.services.map((service, index) => (
                        <div key={index} className="service-col">
                            <Link href={service.href} className="service-item">
                                <div className="service-item-header">
                                    <div className="icon-box">
                                        <Image
                                            width="56"
                                            height="52"
                                            alt={service.alt}
                                            src={service.icon}
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
                <div className="col-lg-12">
                    <div className="service-footer">
                        <p>
                            {content.footerText}
                            <Link href="/pricing">{content.footerLinkText}</Link>
                        </p>
                    </div>

                    <div className="text-center mt-4">
                        <div className="section-btn">
                            <Link href="/services" className="btn-default">{content.moreServicesText}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OurServices