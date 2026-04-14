"use client";
import React, { useState } from 'react';
import { customServices } from '@/app/data/pricingData';
import Link from 'next/link';

const CustomPackage = ({ language = 'ar', translations, onGetQuote }) => {
    const lang = language || 'ar';
    const [selectedServices, setSelectedServices] = useState({});

    const toggleService = (idx) => {
        setSelectedServices(prev => ({
            ...prev,
            [idx]: !prev[idx]
        }));
    };

    return (
        <section className="adds-on">
            <div className="container">
                <div className="row align-items-center section-row">
                    <div className="col-lg-7">
                        <div className="section-title">
                            <h2 className="first-section-title">{customServices.title[lang]}</h2>
                            <p>{customServices.subtitle[lang]}</p>
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <div className="section-content-btn">
                            <div className="section-title-content">
                                <p>{customServices.description[lang]}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-9 mt-4 mx-auto">
                        <div className="box-pricing-2">
                            <div className="pricing-header-2">
                                <h4>{translations?.availableServices}</h4>
                            </div>
                            <ul>
                                {customServices.services[lang]?.map((service, idx) => (
                                    <li
                                        key={idx}
                                        className={selectedServices[idx] ? 'selected' : ''}
                                        onClick={() => toggleService(idx)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {service}
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href="javascript:void(0)"
                                className="getQuote"
                                onClick={() => onGetQuote?.(translations?.availableServices)}
                            >
                                {translations?.getQuote}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CustomPackage;
