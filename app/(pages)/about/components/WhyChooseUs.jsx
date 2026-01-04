"use client";
import React, { useContext } from 'react';
import Image from "next/image";
import { LanguageContext } from '@/app/context/LanguageContext';
import { aboutData } from '@/app/data/aboutData';
import SectionTitle from '@/app/components/ui/SectionTitle';
import TextBox from '@/app/components/ui/TextBox';

const WhyChooseUs = () => {
    const { language } = useContext(LanguageContext);
    const c = aboutData[language];

    return (
        <div className="why-choose-us">
            <div className="container">
                <div className="row align-items-center section-row">
                    <div className="col-lg-7">
                        <SectionTitle
                            title={c.why_us_title}
                            subtitle={c.why_us_subtitle}
                            span={c.why_us_highlight}
                            subtitle_end={c.why_us_end}
                        />
                    </div>
                    <div className="col-lg-5">
                        <div className="section-content-btn">
                            <div className="section-title-content">
                                <p>{c.why_us_desc}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="why-choose-content">
                            {c.why_items.map((item, idx) => (
                                <div className={`mb-4 ${idx === 0 ? 'active' : ''}`} key={idx}>
                                    <TextBox
                                        title={item.title}
                                        text={item.desc}
                                        className="why-choose-item"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="why-choose-image">
                            <figure className="image-anime reveal"><Image alt={c.why_us_image_alt} src="/images/why-us.webp" width={500} height={400} /></figure>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;
