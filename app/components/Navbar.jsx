"use client";

import React, { useContext, useState, useEffect } from 'react'
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LanguageContext } from "../context/LanguageContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { faXTwitter, faSnapchat, faFacebookF, faInstagram, faLinkedinIn, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons';

const Navbar = () => {
    const { language, toggleLanguage, t } = useContext(LanguageContext);
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState(null);

    const isActive = (path) => pathname === `/${language}${path === '/' ? '' : path}` ? "nav-link active" : "nav-link";

    const getLangPath = (path) => `/${language}${path === '/' ? '' : path}`;

    const toggleMobileMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleSubmenu = (name) => {
        setOpenSubmenu(openSubmenu === name ? null : name);
    };

    // Close menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
        setOpenSubmenu(null);
    }, [pathname]);

    return (
        <header className="main-header" role="banner">
            <div className="header-sticky">
                <nav className="navbar navbar-expand-lg" aria-label="Main Navigation">
                    <div className="container-fluid">
                        <Link className="navbar-brand" href={getLangPath("/")} aria-label="Milaknight Home" style={{ position: 'relative', width: '169px', height: '51px', display: 'block' }}>
                            <Image src="/images/logo.svg" alt="Milaknight - Digital Marketing agency" fill priority fetchPriority="high" />
                        </Link>

                        <div className="collapse navbar-collapse main-menu d-none d-lg-block">
                            <div className="nav-menu-wrapper">
                                <ul className="navbar-nav mx-auto" id="menu">
                                    <li className="nav-item"><Link className={isActive("/")} href={getLangPath("/")}>{t('home')}</Link></li>
                                    <li className="nav-item"><Link className={isActive("/about")} href={getLangPath("/about")}>{t('about_us')}</Link></li>
                                    <li className="nav-item submenu"><Link className={isActive("/services")} href={getLangPath("/services")} aria-haspopup="true">{t('services')}</Link>
                                        <ul>
                                            <li className="nav-item"><Link className="nav-link" href={getLangPath("/service/web-development")}>{t('web_development')}</Link></li>
                                            <li className="nav-item"><Link className="nav-link" href={getLangPath("/service/digital-marketing")}>{t('digital_marketing')}</Link></li>
                                            <li className="nav-item"><Link className="nav-link" href={getLangPath("/service/graphic-design")}>{t('graphic_design')}</Link></li>
                                            <li className="nav-item"><Link className="nav-link" href={getLangPath("/service/e-commerce")}>{t('e_commerce')}</Link></li>
                                            <li className="nav-item"><Link className="nav-link" href={getLangPath("/service/video-production")}>{t('video_production')}</Link></li>
                                            <li className="nav-item"><Link className="nav-link" href={getLangPath("/service/event-planning")}>{t('event_planning')}</Link></li>
                                            <li className="nav-item"><Link className="nav-link" href="#">{t('remote_sales')}</Link></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item"><Link className={isActive("/projects")} href={getLangPath("/projects")}>{t('projects')}</Link></li>
                                    <li className="nav-item"><Link className={isActive("/pricing")} href={getLangPath("/pricing")}>{t('pricing')}</Link></li>
                                    <li className="nav-item"><Link className={pathname && pathname.startsWith(`/${language}/blog`) ? "nav-link active" : "nav-link"} href={getLangPath("/blog")}>{t('blog')}</Link></li>
                                    <li className="nav-item"><Link className={isActive("/contact")} href={getLangPath("/contact")}>{t('contact_us')}</Link></li>
                                    <li className="nav-item">
                                        <Link className="nav-link company-profile" href="https://publuu.com/flip-book/902608/1992497" target="_blank" rel="noopener" aria-label={t('download_company_profile')}>
                                            {t('company_profile')}
                                            <FontAwesomeIcon icon={faDownload} className={language === 'ar' ? 'me-1' : 'ms-1'} color='#3faef4' />
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="header-social-box d-inline-flex gap-2 align-items-center">
                            <div className="header-social-links d-none d-lg-block">
                                <ul>
                                    <li><Link href="https://x.com/milaknight731" target="_blank" rel="noopener" aria-label="Twitter"
                                        title={t('follow_us_twitter')}><FontAwesomeIcon icon={faXTwitter} /></Link></li>
                                    <li><Link href="https://www.snapchat.com/add/milaknight.mk" target="_blank" rel="noopener"
                                        aria-label="Snapchat" title={t('follow_us_snapchat')}><FontAwesomeIcon icon={faSnapchat} /></Link></li>
                                    <li><Link href="https://www.facebook.com/milaknight.co" target="_blank" rel="noopener"
                                        aria-label="Facebook" title={t('follow_us_facebook')}><FontAwesomeIcon icon={faFacebookF} /></Link>
                                    </li>
                                    <li><Link href="https://www.instagram.com/milaknight.co/" target="_blank" rel="noopener"
                                        aria-label="Instagram" title={t('follow_us_instagram')}><FontAwesomeIcon icon={faInstagram} /></Link>
                                    </li>
                                    <li><Link href="https://www.linkedin.com/company/milaknight" target="_blank" rel="noopener"
                                        aria-label="LinkedIn" title={t('follow_us_linkedin')}><FontAwesomeIcon icon={faLinkedinIn} /></Link>
                                    </li>
                                    <li><Link href="https://www.tiktok.com/@milaknight.uk" target="_blank" rel="noopener" aria-label="TikTok"
                                        title={t('follow_us_tiktok')}><FontAwesomeIcon icon={faTiktok} /></Link></li>
                                    <li><Link href="https://www.youtube.com/channel/UCAYtPE9bp6ygjmJPmhA3GiA" target="_blank" rel="noopener"
                                        aria-label="YouTube" title={t('subscribe_youtube')}><FontAwesomeIcon icon={faYoutube} /></Link></li>
                                </ul>
                            </div>

                            <button className="btn p-0 border-0 bg-transparent flex-shrink-0" onClick={toggleLanguage} aria-label={language === 'en' ? "تغيير اللغة للعربية" : "Change language to English"} style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center' }}>
                                {language === 'en' ? (
                                    <Image src="/images/saudi-arabia.png" alt="العربية" width={32} height={32} />
                                ) : (
                                    <Image src="/images/united-states.png" alt="English" width={32} height={32} />
                                )}
                            </button>

                            <div className="header-btn d-flex gap-2">
                                <button className="btn btn-popup" type="button" data-bs-toggle="offcanvas"
                                    data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" aria-label="Open sidebar menu" style={{ position: 'relative', width: '40px', height: '40px' }}>
                                    <Image src="/images/icons/header-btn-dot.svg" alt="menu-dot" width={14} height={14} />
                                </button>
                                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="sidebarLabel">
                                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                    <div className="offcanvas-body">
                                        <Link href="tel:+966 11 497 7257" aria-label="Call Us">
                                            <div className="header-contact-box">
                                                <div className="icon-box"><Image src="/images/icons/icon-phone.svg" alt="icon" width={40} height={40} /></div>
                                                <div className="header-contact-box-content">
                                                    <p className="title-box-content">{t('phone')}</p>
                                                    <p className="title-2-box-content" dir="ltr">+966 11 497 7257</p>
                                                </div>
                                            </div>
                                        </Link>
                                        <Link href="mailto:Info@milaknight.com" aria-label="Email Us">
                                            <div className="header-contact-box">
                                                <div className="icon-box"><Image src="/images/icons/icon-mail.svg" alt="icon" width={40} height={40} /></div>
                                                <div className="header-contact-box-content">
                                                    <p className="title-box-content">{t('email')}</p>
                                                    <p className="title-2-box-content">Info@milaknight.com</p>
                                                </div>
                                            </div>
                                        </Link>
                                        <Link href="https://maps.app.goo.gl/VjeHxVu3jtSXpXXSA?g_st=im" target="_blank" rel="noopener" aria-label="Find Us on Maps">
                                            <div className="header-contact-box">
                                                <div className="icon-box"><Image src="/images/icons/icon-location.svg" alt="icon" width={40} height={40} /></div>
                                                <div className="header-contact-box-content">
                                                    <p className="title-box-content">{t('address')}</p>
                                                    <p className="title-2-box-content">{t('full_address')}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="navbar-toggle d-lg-none">
                                <Link
                                    href="#"
                                    className={`slicknav_btn ${isMenuOpen ? 'slicknav_open' : ''} border-0 p-0 bg-transparent`}
                                    onClick={(e) => { e.preventDefault(); toggleMobileMenu(); }}
                                    aria-expanded={isMenuOpen}
                                    aria-label="Toggle Menu"
                                    role="button"
                                >
                                    <span className="slicknav_icon">
                                        <span className="slicknav_icon-bar"></span>
                                        <span className="slicknav_icon-bar"></span>
                                        <span className="slicknav_icon-bar"></span>
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* React Mobile Menu */}
                <div className={`responsive-menu d-lg-none ${isMenuOpen ? 'd-block' : 'd-none'}`}>
                    <div className="slicknav_menu">
                        <ul className="slicknav_nav p-0 m-0" style={{ listStyle: 'none' }}>
                            <li className="nav-item header-btn-inner">
                                <Link className="nav-link" href={getLangPath("/contact")}>{t('contact_us')}</Link>
                            </li>
                            <li><Link href={getLangPath("/")} className={isActive("/")}>{t('home')}</Link></li>
                            <li><Link href={getLangPath("/about")} className={isActive("/about")}>{t('about_us')}</Link></li>
                            <li className={`slicknav_parent ${openSubmenu === 'services' ? 'slicknav_open' : 'slicknav_collapsed'}`}>
                                <div className="slicknav_item slicknav_row" onClick={() => toggleSubmenu('services')} style={{ cursor: 'pointer' }}>
                                    <span className="slicknav_row_text">{t('services')}</span>
                                    <span className="slicknav_arrow">{openSubmenu === 'services' ? '▼' : '►'}</span>
                                </div>
                                <ul className={`slicknav_hidden ${openSubmenu === 'services' ? 'd-block' : 'd-none'}`} style={{ listStyle: 'none' }}>
                                    <li><Link href={getLangPath("/service/web-development")}>{t('web_development')}</Link></li>
                                    <li><Link href={getLangPath("/service/digital-marketing")}>{t('digital_marketing')}</Link></li>
                                    <li><Link href={getLangPath("/service/graphic-design")}>{t('graphic_design')}</Link></li>
                                    <li><Link href={getLangPath("/service/e-commerce")}>{t('e_commerce')}</Link></li>
                                    <li><Link href={getLangPath("/service/video-production")}>{t('video_production')}</Link></li>
                                    <li><Link href={getLangPath("/service/event-planning")}>{t('event_planning')}</Link></li>
                                </ul>
                            </li>
                            <li><Link href={getLangPath("/projects")} className={isActive("/projects")}>{t('projects')}</Link></li>
                            <li><Link href={getLangPath("/pricing")} className={isActive("/pricing")}>{t('pricing')}</Link></li>
                            <li><Link href={getLangPath("/blog")} className={pathname && pathname.startsWith(`/${language}/blog`) ? "active" : ""}>{t('blog')}</Link></li>
                            <li><Link href={getLangPath("/contact")} className={isActive("/contact")}>{t('contact_us')}</Link></li>
                            <li>
                                <Link className="company-profile" href="https://publuu.com/flip-book/902608/1992497" target="_blank" rel="noopener">
                                    {t('company_profile')}
                                    <FontAwesomeIcon icon={faDownload} className={language === 'ar' ? 'me-1' : 'ms-1'} color='#3faef4' />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar
