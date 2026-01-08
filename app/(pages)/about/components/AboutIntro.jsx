"use client";
import React, { useContext } from 'react';
import Image from "next/image";
import Link from "next/link";
import { LanguageContext } from '@/app/context/LanguageContext';
import { aboutData } from '@/app/data/aboutData';
import TextBox from '@/app/components/ui/TextBox';
import SectionTitle from '@/app/components/ui/SectionTitle';

const AboutIntro = () => {
    const { language } = useContext(LanguageContext);
    const c = aboutData[language];

    return (
        <div className="about-us page-about-us">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        {/* About Box Start */}
                        <div className="about-us-box">
                            <div className="about-us-image">
                                {/* About Us Image Start */}
                                <div className="about-us-img">
                                    <figure className="image-anime reveal">
                                        <Image src="/images/about-us-image.webp" alt={c.about_us_image_alt} width={536} height={605} layout="responsive" />
                                    </figure>
                                </div>
                                {/* About Us Image End */}
                                <div className="about-experience-box">
                                    <div className="about-experience-counter">
                                        <h2><span className="counter">10</span>+</h2>
                                    </div>
                                    <div className="about-experience-content">
                                        <p>{c.years_experience} <span>{c.agency_type}</span></p>
                                    </div>
                                </div>
                            </div>

                            {/* About Us Content Start */}
                            <div className="about-us-content">
                                {/* Section Title Start */}
                                <SectionTitle
                                    title={c.section_title}
                                    subtitle_end={c.section_subtitle_end}
                                    span={c.section_subtitle}
                                />

                                {/* Section Title End */}

                                {/* About Us Body Start */}
                                <TextBox text={c.body} className={"about-us-body"} />
                                {/* About Us Body End */}

                                {/* About Us Footer Start */}
                                <div className="about-us-footer">
                                    {/* About Us Button Start */}
                                    <div className="about-us-btn">
                                        <Link href="/contact" className="btn-default">{c.btn_text}</Link>
                                    </div>
                                    {/* About Us Button End */}

                                    {/* About Author Info Start */}
                                    <div className="about-author-info">
                                        {/* About Author Image Start */}
                                        <div className="about-author-image">
                                            <figure className="image-anime">
                                                <Image src="/images/logo.svg" alt="MilaKnight logo" width={100} height={35} />
                                            </figure>
                                        </div>
                                        {/* About Author Image End */}
                                    </div>
                                    {/* About Author Info End */}
                                </div>
                                {/* About Us Footer End */}

                                {/* About Us List Start */}
                                <div className="about-us-list">
                                    {c.list_items.map((item, idx) => (
                                        <div className="about-list-item" key={idx}>
                                            <div className="icon-box">
                                                <Image src={item.icon} alt={item.title} width={40} height={40} />
                                            </div>
                                            <div className="about-list-content">
                                                <h3>{item.title}</h3>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {/* About Us List End */}
                            </div>
                            {/* About Us Content End */}
                        </div>
                        {/* About Box End */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutIntro;
