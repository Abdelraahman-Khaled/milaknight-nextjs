"use client";
import React, { useState } from 'react';
import { pricingPackages } from '@/app/data/pricingData';
import Link from 'next/link';

const INITIAL_VISIBLE_FEATURES = 6;

const PricingPackages = ({ language, translations, onGetQuote }) => {
    const [expandedPackages, setExpandedPackages] = useState({});

    const toggleExpand = (packageId) => {
        setExpandedPackages(prev => ({
            ...prev,
            [packageId]: !prev[packageId]
        }));
    };

    return (
        <section className="page-pricing">
            <div className="container">
                <div className="row-pricing">
                    {pricingPackages.map((pkg) => {
                        const features = pkg.features[language];
                        const isExpanded = expandedPackages[pkg.id];
                        const visibleFeatures = isExpanded ? features : features.slice(0, INITIAL_VISIBLE_FEATURES);
                        const hasMoreFeatures = features.length > INITIAL_VISIBLE_FEATURES;

                        return (
                            <div key={pkg.id} className="box-pricing">
                                <div className="pricing-header">
                                    <h4>{pkg.name[language]}</h4>
                                    {pkg.featured && <span>{pkg.badge[language]}</span>}
                                </div>
                                <ul className={isExpanded ? 'expanded' : ''}>
                                    {visibleFeatures.map((feature, idx) => (
                                        <li key={idx}>
                                            {feature}
                                        </li>
                                    ))}
                                    {hasMoreFeatures && (
                                        <div
                                            className={`read-more ${isExpanded ? 'active' : ''}`}
                                            onClick={() => toggleExpand(pkg.id)}
                                        >
                                            {isExpanded ? translations.showLess : translations.showMore}
                                        </div>
                                    )}
                                </ul>
                                <Link
                                    href="javascript:void(0)"
                                    className="getQuote"
                                    onClick={() => onGetQuote(pkg.name[language])}
                                >
                                    {translations.getQuote}
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default PricingPackages;
