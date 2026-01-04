"use client";
import React, { useContext } from 'react';
import Image from "next/image";
import Link from "next/link";
import { LanguageContext } from '@/app/context/LanguageContext';
import { aboutData } from '@/app/data/aboutData';
import SectionTitle from '@/app/components/ui/SectionTitle';
import ConsultancyTabs from '@/app/components/ConsultancyTabs';

const ConsultancySection = () => {
    const { language } = useContext(LanguageContext);
    const c = aboutData[language];

    return (
        <div className="our-consultancy">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="our-consultancy-images">
                            <div className="consultancy-image-box-1">
                                <div className="consultancy-img-1">
                                    <figure><Image src="/images/Asset 1.webp" alt={c.consultancy_alts[0]} width={300} height={300} /></figure>
                                </div>
                                <div className="consultancy-img-1">
                                    <figure><Image src="/images/Asset 2.webp" alt={c.consultancy_alts[1]} width={300} height={300} /></figure>
                                </div>
                            </div>
                            <div className="consultancy-image-box-2">
                                <div className="consultancy-img-2">
                                    <figure><Image src="/images/Asset 3.webp" alt={c.consultancy_alts[2]} width={300} height={300} /></figure>
                                </div>
                                <div className="consultancy-img-2">
                                    <figure><Image src="/images/Asset 4.webp" alt={c.consultancy_alts[3]} width={300} height={300} /></figure>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="our-consultancy-content">
                            <SectionTitle
                                title={c.approach_title}
                                subtitle={c.approach_subtitle}
                                description={c.approach_desc}
                                span={c.approach_highlight}
                            />

                            {/* Tabs */}
                            <ConsultancyTabs c={c} />

                            <div className="our-consultancy-btn">
                                <Link href="/contact" className="btn-default">{c.consultation_btn}</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConsultancySection;
