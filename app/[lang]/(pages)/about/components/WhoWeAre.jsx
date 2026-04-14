"use client";
import React, { useContext } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { LanguageContext } from '@/app/context/LanguageContext';
import { aboutData } from '@/app/data/aboutData';
import SectionTitle from '@/app/components/ui/SectionTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import Counter from '@/app/components/ui/Counter';

const WhoWeAre = () => {
    const { language } = useContext(LanguageContext);
    const c = aboutData[language];

    return (
        <div className="who-we-are">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="who-we-are-content">
                            <SectionTitle
                                title={c.who_we_are_title}
                                subtitle={c.who_we_are_subtitle_1}
                                description={c.who_we_are_desc}
                                span={c.who_we_are_subtitle_highlight}
                            />
                            <div className="experts-rating-video">
                                <div className="experts-rating-video-image">
                                    <iframe height="250"
                                        src="https://www.youtube.com/embed/XTLBSplqlzM?autoplay=1&loop=1&playlist=XTLBSplqlzM&mute=1&controls=0&rel=0"
                                        width="100%"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen frameBorder="0" title="YouTube video player"></iframe>
                                </div>
                                <div className="who-we-are-client">
                                    <div className=" comapny-client-rating">
                                        <ul>
                                            <li><FontAwesomeIcon icon={faStar} /> <FontAwesomeIcon icon={faStar} /> <FontAwesomeIcon icon={faStar} /> <FontAwesomeIcon icon={faStar} /> <FontAwesomeIcon icon={faStar} /></li>
                                        </ul>
                                        <p>( <Counter end={40} />+ {c.ratings})</p>
                                    </div>
                                    <div className="company-client-images">
                                        {[0, 1, 2, 3, 4].map(index => (
                                            <div className="client-image" key={index}>
                                                <figure className="image-anime reveal"><Image alt={c.client_images_alts[index]} src={`/images/satisfy-client-img-${index + 1}.webp`} width={50} height={50} /></figure>
                                            </div>
                                        ))}
                                    </div>
                                    <div className=" contact-now-btn"><Link href="tel:971585856774" className="contact-btn">{c.call_now}</Link></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="experts-counters-list">
                            <div className="experts-counter-box expert-box-1">
                                <div className="experts-counter-item">
                                    <div className="icon-box"><Image alt={c.experts_counter_alts[0]} src="/images/icons/icon-who-we-are-counter-1.svg" width={30} height={30} /></div>
                                    <div className="experts-counter-content">
                                        <span><Counter end={35} suffix="k+" /></span>
                                        <p>{c.happy_clients}</p>
                                    </div>
                                </div>
                                <div className="experts-counter-item">
                                    <div className="icon-box"><Image alt={c.experts_counter_alts[2]} src="/images/icons/icon-who-we-are-counter-3.svg" width={30} height={30} /></div>
                                    <div className="experts-counter-content">
                                        <span><Counter end={250} suffix="+" /></span>
                                        <p>{c.partners_sponsors}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="experts-counter-box expert-box-2">
                                <div className="experts-counter-item">
                                    <div className="icon-box"><Image alt={c.experts_counter_alts[1]} src="/images/icons/icon-who-we-are-counter-2.svg" width={30} height={30} /></div>
                                    <div className="experts-counter-content">
                                        <span><Counter end={120} suffix="+" /></span>
                                        <p>{c.awards}</p>
                                    </div>
                                </div>
                                <div className="experts-counter-item">
                                    <div className="icon-box"><Image alt={c.experts_counter_alts[3]} src="/images/icons/icon-who-we-are-counter-4.svg" width={30} height={30} /></div>
                                    <div className="experts-counter-content">
                                        <span><Counter end={5} suffix="k+" /></span>
                                        <p>{c.active_users}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhoWeAre;
