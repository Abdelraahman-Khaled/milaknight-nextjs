"use client";
import React, { useContext } from 'react';
import ServiceVideo from './ServiceVideo';
import ServiceContactForm from './ServiceContactForm';
import ServiceProcess from './ServiceProcess';
import Link from 'next/link';
import { LanguageContext } from '@/app/context/LanguageContext';

const ServiceContent = ({ content, hero }) => {
    const { language } = useContext(LanguageContext);
    return (
        <div className="service-single-content">
            <ServiceVideo videoId={content.video_id} />

            {/* Link to projects - optional/contextual */}
            {content.link_projects && (
                <Link href={`/${language}/projects`} className="go-to-projects">{content.link_projects}</Link>
            )}

            <div className="service-entry">
                <h2 className="fw-bold">{content.title}</h2>
                <p>
                    {content.intro}
                    <br />
                    {content.intro_highlight && (
                        <strong>{content.intro_highlight}</strong>
                    )}
                </p>

                {/* Why Us Section */}
                {content.why_us && (
                    <>
                        <h3 className="fw-bold">{content.why_us.title}</h3>
                        <div className="service-entry-list-image">
                            <div className="service-entry-list">
                                <ul>
                                    {content.why_us.items.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </>
                )}

                {/* Services List Section */}
                {content.services_list && (
                    <>
                        <h3 className="fw-bold">{content.services_list.title}</h3>
                        <div className="service-entry-list-image">
                            <div className="service-entry-list">
                                <ul>
                                    {content.services_list.items.map((item, i) => (
                                        <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </>
                )}
                {content.features_list && (
                    <>
                        <h3 className="fw-bold">{content.features_list.title}</h3>
                        <div className="service-entry-list-image">
                            <div className="service-entry-list">
                                <ul>
                                    {content.features_list.items.map((item, i) => (
                                        <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </>
                )}

                {/* Process Steps */}
                {content.process && (
                    <>
                        <h3 className="fw-bold">{content.process.title}</h3>
                        {content.process.items && (
                            <div className="service-entry-list-image mb-4">
                                <div className="service-entry-list">
                                    <ul>
                                        {content.process.items.map((item, i) => (
                                            <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                        <h3 className='fw-bold'>{content.process.subtitle}</h3>

                        <div className="service-process-steps">
                            {content.process.steps.map((step, index) => (
                                <ServiceProcess key={index} step={step} />
                            ))}
                        </div>
                    </>
                )}

                {/* Conclusion */}
                {content.conclusion && (
                    <>
                        <h3 className="fw-bold">{content.conclusion.title}</h3>
                        <p>
                            {content.conclusion.desc}
                            <br />
                            {content.conclusion.highlight && (
                                <strong>{content.conclusion.highlight}</strong>
                            )}
                        </p>
                    </>
                )}
            </div>

            {/* Contact CTA */}
            <div className="page-contact-us pt-1">
                <div className="contact-information">
                    <div className="section-title">
                        <h2><span>{content.cta.title}</span></h2>
                    </div>
                </div>

                <ServiceContactForm
                    serviceName={hero.title + " " + hero.span}
                    ctaData={content.cta}
                />
            </div>
        </div>
    );
};

export default ServiceContent;
