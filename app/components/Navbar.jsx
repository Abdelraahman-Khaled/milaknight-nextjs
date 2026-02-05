"use client";

import React, { useContext } from 'react'
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LanguageContext } from "../context/LanguageContext";

const Navbar = () => {
    const { language, toggleLanguage, t } = useContext(LanguageContext);
    const pathname = usePathname();

    const isActive = (path) => pathname === path ? "nav-link active" : "nav-link";

    // Update SlickNav menu text after language change
    const handleLanguageToggle = () => {
        toggleLanguage();

        // Wait for React to update DOM with translations
        setTimeout(() => {
            const originalMenu = document.querySelector('#menu');
            const slicknavMenu = document.querySelector('.slicknav_nav');

            if (originalMenu && slicknavMenu) {
                const originalLinks = originalMenu.querySelectorAll('a');
                const clonedLinks = slicknavMenu.querySelectorAll('a');

                clonedLinks.forEach((clonedLink) => {
                    const href = clonedLink.getAttribute('href');
                    const matchingOriginal = Array.from(originalLinks).find(
                        link => link.getAttribute('href') === href
                    );

                    if (matchingOriginal) {
                        const getDirectText = (element) => {
                            return Array.from(element.childNodes)
                                .filter(node => node.nodeType === Node.TEXT_NODE)
                                .map(node => node.textContent.trim())
                                .join(' ');
                        };

                        const newText = getDirectText(matchingOriginal);

                        if (newText) {
                            Array.from(clonedLink.childNodes)
                                .filter(node => node.nodeType === Node.TEXT_NODE)
                                .forEach(node => node.remove());

                            clonedLink.insertBefore(
                                document.createTextNode(newText),
                                clonedLink.firstChild
                            );
                        }
                    }
                });
            }
        }, 200);
    };

    return (

        <header className="main-header">
            <div className="header-sticky">
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid"><Link className="navbar-brand" href="/" style={{ position: 'relative', width: '169px', height: '51px', display: 'block' }}><Image src="/images/logo.svg"
                        alt="Milaknight" fill /></Link>
                        <div className="collapse navbar-collapse main-menu">
                            <div className="nav-menu-wrapper">
                                <ul className="navbar-nav mx-auto" id="menu">
                                    <li className="nav-item"><Link className={isActive("/")} href="/">{t('home')}</Link></li>
                                    <li className="nav-item"><Link className={isActive("/about")} href="/about">{t('about_us')}</Link></li>
                                    <li className="nav-item submenu"><Link className={isActive("/services")} href="/services">{t('services')}</Link>
                                        <ul>
                                            <li className="nav-item"><Link className="nav-link" href="/service/web-development">{t('web_development')}</Link></li>
                                            <li className="nav-item"><Link className="nav-link" href="/service/digital-marketing">{t('digital_marketing')}</Link></li>
                                            <li className="nav-item"><Link className="nav-link" href="/service/graphic-design">{t('graphic_design')}</Link></li>
                                            <li className="nav-item"><Link className="nav-link" href="/service/e-commerce">{t('e_commerce')}</Link></li>
                                            <li className="nav-item"><Link className="nav-link" href="/service/video-production">{t('video_production')}</Link></li>
                                            <li className="nav-item"><Link className="nav-link" href="/service/event-planning">{t('event_planning')}</Link></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item"><Link className={isActive("/projects")} href="/projects">{t('projects')}</Link></li>
                                    <li className="nav-item"><Link className={isActive("/pricing")} href="/pricing">{t('pricing')}</Link></li>
                                    <li className="nav-item"><Link className={pathname && pathname.startsWith("/blog") ? "nav-link active" : "nav-link"} href="/blog">{t('blog')}</Link></li>
                                    <li className="nav-item"><Link className={isActive("/contact")} href="/contact">{t('contact_us')}</Link></li>
                                    <li className="nav-item">
                                        <Link className="nav-link company-profile" href="https://publuu.com/flip-book/902608/1992497" target="_blank" rel="noopener">
                                            {t('company_profile')}
                                            <i className={`fa-solid fa-download ${language === 'ar' ? 'me-1' : 'ms-1'}`}></i>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="header-social-box d-inline-flex gap-2 align-items-center">
                            <div className="header-social-links">
                                <ul>
                                    <li><Link href="https://x.com/milaknight731" target="_blank" rel="noopener" aria-label="Twitter"
                                        title={t('follow_us_twitter')}><i className="fa-brands fa-x-twitter"></i></Link></li>
                                    <li><Link href="https://www.snapchat.com/add/milaknight.mk" target="_blank" rel="noopener"
                                        aria-label="Snapchat" title={t('follow_us_snapchat')}><i className="fa-brands fa-snapchat"></i></Link></li>
                                    <li><Link href="https://www.facebook.com/people/milaknight/61557223981208" target="_blank" rel="noopener"
                                        aria-label="Facebook" title={t('follow_us_facebook')}><i className="fa-brands fa-facebook-f"></i></Link>
                                    </li>
                                    <li><Link href="https://www.instagram.com/milaknight.1/" target="_blank" rel="noopener"
                                        aria-label="Instagram" title={t('follow_us_instagram')}><i className="fa-brands fa-instagram"></i></Link>
                                    </li>
                                    <li><Link href="https://www.linkedin.com/company/milaknight" target="_blank" rel="noopener"
                                        aria-label="LinkedIn" title={t('follow_us_linkedin')}><i className="fa-brands fa-linkedin-in"></i></Link>
                                    </li>
                                    <li><Link href="https://www.tiktok.com/@milaknight.mk" target="_blank" rel="noopener" aria-label="TikTok"
                                        title={t('follow_us_tiktok')}><i className="fa-brands fa-tiktok"></i></Link></li>
                                    <li><Link href="https://www.youtube.com/channel/UCAYtPE9bp6ygjmJPmhA3GiA" target="_blank" rel="noopener"
                                        aria-label="YouTube" title={t('subscribe_youtube')}><i
                                            className="fa-brands fa-youtube"></i></Link></li>
                                </ul>
                            </div>
                            <button className="btn p-0 border-0 bg-transparent flex-shrink-0" onClick={handleLanguageToggle} style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center' }}>
                                {language === 'en' ? (
                                    <Image src="/images/saudi-arabia.png" alt="Switch to Arabic" width={32} height={32} />
                                ) : (
                                    <Image src="/images/united-states.png" alt="Switch to English" width={32} height={32} />
                                )}
                            </button>
                            <div className="header-btn d-flex gap-2"><button className="btn btn-popup" type="button" data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" style={{ position: 'relative', width: '40px', height: '40px' }}><Image
                                    src="/images/icons/header-btn-dot.svg" alt="btn-dot" width={14} height={14} /></button>
                                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight"><button type="button"
                                    className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                    <div className="offcanvas-body"><Link href="tel:+971585856774">
                                        <div className="header-contact-box">
                                            <div className="icon-box"><Image src="/images/icons/icon-phone.svg" alt="icon-phone" width={40} height={40} /></div>
                                            <div className="header-contact-box-content">
                                                <p className="title-box-content">{t('phone')}</p>
                                                <p className="title-2-box-content" dir="ltr">+971 58 585 6774</p>
                                            </div>
                                        </div>
                                    </Link><Link
                                        href="mailto:&#073;&#110;&#102;&#111;&#064;&#109;&#105;&#108;&#097;&#107;&#110;&#105;&#103;&#104;&#116;&#115;&#046;&#099;&#111;&#109;">
                                            <div className="header-contact-box">
                                                <div className="icon-box">
                                                    <Image src="/images/icons/icon-mail.svg" alt="icon-mail" width={40} height={40} />
                                                </div>
                                                <div className="header-contact-box-content">
                                                    <p className="title-box-content">{t('email')}</p>
                                                    <p className="title-2-box-content">Info[at]milaknights[dot]com</p>
                                                </div>
                                            </div>
                                        </Link><Link href="https://maps.app.goo.gl/VjeHxVu3jtSXpXXSA?g_st=im" target="_blank" rel="noopener">
                                            <div className="header-contact-box">
                                                <div className="icon-box"><Image src="/images/icons/icon-location.svg" alt="icon-location" width={40} height={40} /></div>
                                                <div className="header-contact-box-content">
                                                    <p className="title-box-content">{t('address')}</p>
                                                    <p className="title-2-box-content">{t('full_address')}</p>
                                                </div>
                                            </div>
                                        </Link></div>
                                </div>
                            </div>
                            <div className="navbar-toggle"></div>

                        </div>

                    </div>
                </nav>
                <div className="responsive-menu"></div>
            </div>
        </header>
    )
}

export default Navbar