"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ServiceSidebar = ({ categories, contactBox, activeSlug }) => {
    return (
        <div className="service-sidebar">
            {/* Service Category List Start */}
            <div className="service-catagery-list">
                <h3>{categories.categories_title}</h3>
                <ul>
                    {categories.categories && categories.categories.map((cat, index) => (
                        <li key={index}>
                            <Link href={`/service/${cat.href}`} className={cat.href === activeSlug ? 'active' : ''}>
                                {cat.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            {/* Service Category List End */}

            {/* Sidebar Cta Box Start */}
            <div className="sidebar-cta-box">
                {/* Icon Box Start */}
                <div className="icon-box">
                    <Image src="/images/icons/icon-sidebar-cta.svg" alt="image" width={60} height={60} />
                </div>
                {/* Icon Box End */}

                {/* CTA Contact Content Start */}
                <div className="cta-contact-content">
                    <h3>{contactBox.title}</h3>
                    <p>{contactBox.desc}</p>
                </div>
                {/* CTA Contact Content End */}

                {/* CTA Contact Button Start */}
                <div className="cta-contact-btn">
                    <a dir="ltr" href={contactBox.whatsapp_link} target="_blank" rel="noopener">
                        <Image src="/images/icons/whatsapp_white_icon.png" alt="image" width={24} height={24} style={{ marginRight: '8px' }} />
                        {contactBox.phone}
                    </a>
                </div>
                {/* CTA Contact Button End */}
            </div>
            {/* Sidebar Cta Box End */}
        </div>
    );
};

export default ServiceSidebar;
