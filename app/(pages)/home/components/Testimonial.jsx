'use client';
import HeaderDescription from '@/app/components/ui/HeaderDescription'
import React, { useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { LanguageContext } from '@/app/context/LanguageContext';
import { testimonialData } from './data';

const Testimonial = () => {
    const { language } = useContext(LanguageContext);
    const content = testimonialData[language];

    const satisfiedClients = [
        "/images/satisfy-client-img-1.webp",
        "/images/satisfy-client-img-2.webp",
        "/images/satisfy-client-img-3.webp",
        "/images/satisfy-client-img-4.webp"
    ];

    return (
        <div className='container our-testimonial'>
            <HeaderDescription
                title={content.title}
                subtitle={content.subtitle}
                span={content.span}
                desc={content.desc}
            />

            <div className="row">
                <div className="col-lg-4">
                    <div className="testimonial-review-box">
                        <div className="testimonial-review-header">
                            <div className="testimonial-review-counter-title">
                                <h2><span className="counter">{content.counter}</span></h2>
                            </div>

                            <div className="testimonial-review-image">
                                <div className="satisfy-client-images">
                                    {satisfiedClients.map((src, idx) => (
                                        <div key={idx} className="satisfy-client-image">
                                            <figure className="image-anime">
                                                <Image width={50} height={35} src={src} alt="satisfy-client" />
                                            </figure>
                                        </div>
                                    ))}
                                </div>
                                <div className="satisfy-client-content">
                                    <p>{content.ratingsText}</p>
                                </div>
                            </div>
                        </div>

                        <div className="testimonial-review-content">
                            <h3>{content.reviewTitle}</h3>
                        </div>

                        <div className="testimonial-review-btn">
                            <Link href="contact.html" className="btn-default">{content.contactBtn}</Link>
                        </div>
                    </div>
                </div>

                <div className="col-lg-8">
                    <div className="testimonial-slider">
                        <div className="swiper">
                            <div className="swiper-wrapper" data-cursor-text={language === 'ar' ? "اسحب" : "Pull"}>
                                {content.items.map((item, index) => (
                                    <div key={index} className="swiper-slide">
                                        <div className="testimonial-item">
                                            <div className="testimonial-header">
                                                <div className="testimonial-company-logo">
                                                    <Image width={100} height={30} src={item.logo} alt="company logo" />
                                                </div>
                                                <div className="testimonial-quote">
                                                    <Image width={40} height={40} src="/images/icons/testimonial-quote.svg" alt="testimonial-quote" />
                                                </div>
                                            </div>
                                            <div className="testimonial-content">
                                                <p>{item.text}</p>
                                            </div>
                                            <div className="testimonial-body">
                                                <div className="author-content">
                                                    <h3>{item.name}</h3>
                                                </div>
                                                <div className="testimonial-rating">
                                                    <Image width={100} height={20} src={item.rating} alt="stars" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="testimonial-pagination"></div>
                        </div>
                    </div>

                    <div className="agency-supports-slider">
                        <Link target="_blank" rel="noopener" href="https://www.trustpilot.com/review/mila-knight.com"
                            className="agency-supports-logo">
                            <Image src="/images/icons/trustpilot.svg" alt="trustpilot" width={160} height={52.8} />
                        </Link>

                        <Link target="_blank" rel="noopener"
                            href="https://www.google.com/maps/place/Milaknight+LLC-FZ/@25.1567646,55.3003109,711m/data=!3m1!1e3!4m8!3m7!1s0x3e5f69873436577b:0xfa9205019ca3faa6!8m2!3d25.1567646!4d55.3003109!9m1!1b1!16s%2Fg%2F11x_5nlbcc?entry=ttu&g_ep=EgoyMDI1MTAwOC4wIKXMDSoASAFQAw%3D%3D"
                            className="agency-supports-logo">
                            <Image src="/images/icons/google.svg" alt="google" width={160} height={52.8} />
                        </Link>

                        <div className="trustpilot-widget d-none" data-locale="ar-SA" data-template-id="56278e9abfbbba0bdcd568bc"
                            data-businessunit-id="68e6f7d42d022417ce11e051" data-style-height="52px" data-style-width="100%"
                            data-token="170ce817-a8dd-449d-9603-6098a8c31796">
                            <Link href="https://www.trustpilot.com/review/mila-knight.com" target="_blank" rel="noopener">Trustpilot</Link>
                        </div>


                        <div className="agency-supports-logo">
                            <Image src="/images/icons/clutch.svg" alt="clutch" width={160} height={52.8} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Testimonial