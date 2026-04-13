'use client';
import Image from 'next/image'
import React, { useContext } from 'react'
import Link from 'next/link'
import { LanguageContext } from '@/app/context/LanguageContext'
import { footerData } from '@/app/data/footerData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter, faTiktok, faSnapchat, faFacebookF, faInstagram, faLinkedinIn, faYoutube } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    const { language } = useContext(LanguageContext);
    const content = footerData[language];

    return (
        <>
            <footer className="main-footer" role="contentinfo">
                {/* <!-- Let's Work Together start --> */}
                <div className="footer-work-together">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="work-together-box">
                                    {/* <!-- Work Together Content Start --> */}
                                    <div className="work-together-content">
                                        <h3 className="work-together-content-h2">{content.letsWork.subTitle}</h3>
                                        <h2>{content.letsWork.title}</h2>
                                    </div>
                                    {/* <!-- Work Together Content End --> */}

                                    {/* <!-- Work Together Btn Start --> */}
                                    <div className="work-together-btn">
                                        <Link href={`/${language}/contact`} aria-label={content.letsWork.buttonText}>
                                            <Image src="/images/icons/arrow-dark.svg" alt="" width={24} height={24} />
                                            <span>{content.letsWork.buttonText}</span>
                                        </Link>
                                    </div>
                                    {/* <!-- Work Together Btn End --> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Let's Work Together end --> */}

                {/* <!-- Footer Main Start --> */}
                <div className="footer-main">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="footer-logo" style={{ minHeight: '80px', display: 'flex', alignItems: 'center' }}>
                                    <Image 
                                        src="/images/logo-dark-footer.webp" 
                                        className="Image-fluid h-auto" 
                                        alt="Milaknight - Professional Marketing Branding" 
                                        width={512} 
                                        height={200} 
                                        style={{ maxWidth: '100%', height: 'auto' }}
                                    />
                                </div>
                            </div>

                            <div className="col-lg-2 col-md-3 col-6">
                                {/* <!-- Footer Links start --> */}
                                <nav className="footer-links" aria-label="Quick Links">
                                    <h3>{content.quickLinks.title}</h3>
                                    <ul>
                                        {content.quickLinks.links.map((link, index) => (
                                            <li key={index}>
                                                <Link href={`/${language}${link.href.startsWith('/') ? link.href : `/${link.href}`}`}>{link.text}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                                {/* <!-- Footer Links end --> */}
                            </div>

                            <div className="col-lg-2 col-md-3 col-6">
                                {/* <!-- Footer Links start --> */}
                                <nav className="footer-links" aria-label="Our Services">
                                    <h3>{content.services.title}</h3>
                                    <ul>
                                        {content.services.links.map((link, index) => (
                                            <li key={index}>
                                                <Link href={`/${language}${link.href.startsWith('/') ? link.href : `/${link.href}`}`}>{link.text}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                                {/* <!-- Footer Links end --> */}
                            </div>

                            <div className="col-lg-4 col-md-6">
                                {/* <!-- About Footer start --> */}
                                <div className="about-footer">
                                    {/* <!-- Footer Contact Box Start --> */}
                                    <div className="footer-contact-box">
                                        {/* <!-- Footer Contact Item Start --> */}
                                        <Link href="tel:+971585856774" className="footer-contact-item" aria-label="Call +971 58 585 6774">
                                            <div className="icon-box" style={{ width: '40px', height: '40px', flexShrink: 0 }}>
                                                <Image src="/images/icons/icon-phone.svg" alt="" width={18} height={18} />
                                            </div>
                                            <div className="footer-contact-content" dir='ltr'>
                                                <p>{content.contact.phone}</p>
                                            </div>
                                        </Link>
                                        {/* <!-- Footer Contact Item End --> */}

                                        {/* <!-- Footer Contact Item Start --> */}
                                        <Link href="mailto:Info@milaknight.com"
                                            className="footer-contact-item" aria-label="Email us at Info@milaknight.com">
                                            <div className="icon-box" style={{ width: '40px', height: '40px', flexShrink: 0 }}>
                                                <Image src="/images/icons/icon-mail.svg" alt="" width={18} height={18} />
                                            </div>
                                            <div className="footer-contact-content">
                                                <p>{content.contact.email}</p>
                                            </div>
                                        </Link>
                                        {/* <!-- Footer Contact Item End --> */}
                                    </div>
                                    <div className="footer-social-links">
                                        <ul aria-label="Social Media Links" style={{ display: 'flex', flexWrap: 'wrap' }}>
                                            <li>
                                                <Link href="https://www.linkedin.com/company/milaknight/" target="_blank"
                                                    rel="noopener" aria-label="LinkedIn">
                                                    <FontAwesomeIcon icon={faLinkedinIn} style={{ width: '1em' }} />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="https://x.com/milaknight731"
                                                    target="_blank" rel="noopener" aria-label="Twitter X">
                                                    <FontAwesomeIcon icon={faXTwitter} style={{ width: '1em' }} />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="https://www.tiktok.com/@milaknight.mk"
                                                    target="_blank" rel="noopener" aria-label="TikTok">
                                                    <FontAwesomeIcon icon={faTiktok} style={{ width: '1em' }} />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="https://www.snapchat.com/add/milaknight.mk"
                                                    target="_blank" rel="noopener" aria-label="Snapchat">
                                                    <FontAwesomeIcon icon={faSnapchat} style={{ width: '1em' }} />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="https://www.facebook.com/milaknight.mena"
                                                    target="_blank" rel="noopener" aria-label="Facebook">
                                                    <FontAwesomeIcon icon={faFacebookF} style={{ width: '1em' }} />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="https://www.instagram.com/milaknight.mena/" target="_blank"
                                                    rel="noopener" aria-label="Instagram">
                                                    <FontAwesomeIcon icon={faInstagram} style={{ width: '1em' }} />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="https://www.youtube.com/channel/UCAYtPE9bp6ygjmJPmhA3GiA"
                                                    target="_blank" rel="noopener" aria-label="YouTube">
                                                    <FontAwesomeIcon icon={faYoutube} style={{ width: '1em' }} />
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    {/* <!-- Footer Contact Box End --> */}
                                </div>
                                {/* <!-- About Footer End --> */}
                            </div>
                        </div>

                        {/* <!-- Footer Copyright Section Start --> */}
                        <div className="footer-copyright">
                            <div className="row align-items-center">
                                <div className="col-lg-12">
                                    {/* <!-- Footer Copyright Start --> */}
                                    <div className="footer-copyright-text">
                                        <p>{content.copyright}</p>
                                        <div className="d-flex flex-wrap justify-content-center gap-3 mt-1" style={{ fontSize: '14px', opacity: 0.8 }}>
                                            <span>{content.contact.crNumber}</span>
                                            <span>{content.contact.taxNumber}</span>
                                        </div>
                                    </div>
                                    {/* <!-- Footer Copyright End --> */}
                                </div>
                            </div>
                        </div>
                        {/* <!-- Footer Copyright Section End --> */}
                    </div>
                </div>
                {/* <!-- Footer Main End --> */}
            </footer>

            <Link href="https://calendly.com/milaknights-info" target="_blank" rel="noopener" className="whatsapp meeting" aria-label="Book a Meeting">
                <Image src="/images/icons/calender.webp" loading="lazy" alt="" width={24} height={24} />
                <span>{content.floatingButtons.meeting}</span>
            </Link>

            <Link href="https://api.whatsapp.com/send?phone=971585856774" target="_blank" rel="noopener" className="whatsapp" aria-label="Chat on WhatsApp">
                <Image src="/images/icons/whatsapp_white_icon.png" loading="lazy" alt="" width={24} height={24} />
                <span>{content.floatingButtons.consultation}</span>
            </Link>
        </>

    )
}

export default Footer