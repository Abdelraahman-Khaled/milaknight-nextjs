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
                        <div className="about-us-box">
                            <div className="about-us-image">
                                <div className="about-us-img">
                                    <figure className="image-anime reveal">
                                        <Image src="/images/about-us-image.webp" alt={c.about_us_image_alt} width={536} height={605} layout="responsive" loading="eager" />
                                    </figure>
                                </div>
                                <div className="about-experience-box">
                                    <div className="about-experience-counter">
                                        <h2><span className="counter">10</span>+</h2>
                                    </div>
                                    <div className="about-experience-content">
                                        <p>{c.years_experience} <span>{c.agency_type}</span></p>
                                    </div>
                                </div>
                            </div>

                            <div className="about-us-content">
                                <SectionTitle
                                    title={c.section_title}
                                    subtitle_end={c.section_subtitle_end}
                                    span={c.section_subtitle}
                                />
                                <TextBox text={c.body} className={"about-us-body"} />
                                <div className="about-us-footer">
                                    <div className="about-us-btn">
                                        <Link href={`/${language}/contact`} className="btn-default">{c.btn_text}</Link>
                                    </div>
                                    <div className="about-author-info">
                                        <div className="about-author-image">
                                            <figure className="image-anime">
                                                <Image src="/images/logo.svg" alt="MilaKnight logo" width={100} height={35} />
                                            </figure>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutIntro;
