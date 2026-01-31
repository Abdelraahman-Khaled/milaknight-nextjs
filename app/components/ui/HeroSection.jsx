"use client";

import React, { useContext } from 'react'
import Link from "next/link";
import { LanguageContext } from '../../context/LanguageContext';

const HeroSection = ({ title, subtitle, breadcrumb, page }) => {
    const { t } = useContext(LanguageContext);

    return (
        <div className="page-header">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-12">
                        <div className="page-header-box">
                            <h1>
                                {t(title)} <span>{t(subtitle)}</span>
                            </h1>
                            <nav>
                                <ol className="breadcrumb">
                                    {Array.isArray(breadcrumb) ? (
                                        breadcrumb.map((item, index) => (
                                            <li key={index} className={`breadcrumb-item ${!item.href ? 'active' : ''}`} aria-current={!item.href ? 'page' : undefined}>
                                                {item.href ? (
                                                    <Link href={item.href}>{t(item.label)}</Link>
                                                ) : (
                                                    t(item.label)
                                                )}
                                            </li>
                                        ))
                                    ) : (
                                        <>
                                            <li className="breadcrumb-item"><Link href="/">{t(breadcrumb)}</Link></li>
                                            <li className="active breadcrumb-item" aria-current="page">{t(page)}</li>
                                        </>
                                    )}
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection