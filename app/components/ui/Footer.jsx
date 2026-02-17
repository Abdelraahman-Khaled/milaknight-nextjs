'use client';
import Image from 'next/image'
import React, { useContext } from 'react'
import Link from 'next/link'
import { LanguageContext } from '@/app/context/LanguageContext'
import { footerData } from '@/app/data/footerData'

const Footer = () => {
    const { language } = useContext(LanguageContext);
    const content = footerData[language];

    return (
        <>
            <footer className="main-footer">
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
                                        <Link href="/contact">
                                            <Image src="/images/icons/arrow-dark.svg" alt="arrow" width={24} height={24} />
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
                                <div className="footer-logo">
                                    <Image src="/images/logo-dark-footer.webp" className="Image-fluid  h-auto" alt="logo" width={512} height={200} />
                                </div>
                            </div>

                            <div className="col-lg-2 col-md-3 col-6">
                                {/* <!-- Footer Links start --> */}
                                <div className="footer-links">
                                    <h3>{content.quickLinks.title}</h3>
                                    <ul>
                                        {content.quickLinks.links.map((link, index) => (
                                            <li key={index}>
                                                <Link href={link.href}>{link.text}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                {/* <!-- Footer Links end --> */}
                            </div>

                            <div className="col-lg-2 col-md-3 col-6">
                                {/* <!-- Footer Links start --> */}
                                <div className="footer-links">
                                    <h3>{content.services.title}</h3>
                                    <ul>
                                        {content.services.links.map((link, index) => (
                                            <li key={index}>
                                                <Link href={link.href}>{link.text}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                {/* <!-- Footer Links end --> */}
                            </div>

                            <div className="col-lg-4 col-md-6">
                                {/* <!-- About Footer start --> */}
                                <div className="about-footer">
                                    {/* <!-- Footer Contact Box Start --> */}
                                    <div className="footer-contact-box">
                                        {/* <!-- Footer Contact Item Start --> */}
                                        <Link href="tel:+971585856774" className="footer-contact-item">
                                            <div className="icon-box">
                                                <Image src="/images/icons/icon-phone.svg" alt="icon-phone" width={18} height={18} />
                                            </div>
                                            <div className="footer-contact-content" dir='ltr'>
                                                <p>{content.contact.phone}</p>
                                            </div>
                                        </Link>
                                        {/* <!-- Footer Contact Item End --> */}

                                        {/* <!-- Footer Contact Item Start --> */}
                                        <Link href="mailto:&#073;&#110;&#102;&#111;&#064;&#109;&#105;&#108;&#097;&#107;&#110;&#105;&#103;&#104;&#116;&#115;&#046;&#099;&#111;&#109;"
                                            className="footer-contact-item">
                                            <div className="icon-box">
                                                <Image src="/images/icons/icon-mail.svg" alt="icon-mail" width={18} height={18} />
                                            </div>
                                            <div className="footer-contact-content">
                                                <p>{content.contact.email}</p>
                                            </div>
                                        </Link>
                                        {/* <!-- Footer Contact Item End --> */}
                                    </div>
                                    <div className="footer-social-links">
                                        <ul>
                                            <li>
                                                <Link href="https://www.linkedin.com/company/milaknight/" target="_blank"
                                                    rel="noopener">
                                                    <i className="fa-brands fa-linkedin-in"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="https://x.com/milaknight731?s=21&amp;t=5NWQLtx2htlkEn1qeJG6_A"
                                                    target="_blank" rel="noopener"><i className="fa-brands fa-x-twitter">
                                                    </i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="https://www.tiktok.com/@milaknight.mk?_t=ZS-8t8UpxZnyCe&_r=1"
                                                    target="_blank" rel="noopener">
                                                    <i className="fa-brands fa-tiktok"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="https://www.snapchat.com/add/milaknight.mk?invite_id=2I9cmTWh&amp;locale=en_SA%40calendar%3Dgregorian&amp;share_id=gTTv7vflRoyS-tFeQsuOpA&amp;sid=c4236d6f9d034a8997655018fa1b34e5"
                                                    target="_blank" rel="noopener">
                                                    <i className="fa-brands fa-snapchat"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="https://www.facebook.com/people/milaknight/61557223981208/?mibextid=hu50Ix&amp;rdid=ueZrQfnq2frKALxa&amp;share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2FSPiK45DVgjNPbx1T%2F%3Fmibextid%3Dhu50Ix"
                                                    target="_blank" rel="noopener">
                                                    <i className="fa-brands fa-facebook-f"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="https://www.instagram.com/milaknight.mena/" target="_blank"
                                                    rel="noopener">
                                                    <i className="fa-brands fa-instagram"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="https://www.youtube.com/channel/UCAYtPE9bp6ygjmJPmhA3GiA"
                                                    target="_blank" rel="noopener">
                                                    <i className="fa-brands fa-youtube"></i>
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

            <Link href="https://calendly.com/milaknights-info" target="_blank" rel="noopener" className="whatsapp meeting">
                <Image src="/images/icons/calender.webp" loading="lazy" alt="meeting" width={24} height={24} />
                <span>{content.floatingButtons.meeting}</span>
            </Link>

            <Link href="https://api.whatsapp.com/send?phone=971585856774" target="_blank" rel="noopener" className="whatsapp">
                <Image src="/images/icons/whatsapp_white_icon.png" loading="lazy" alt="whatsapp" width={24} height={24} />
                <span>{content.floatingButtons.consultation}</span>
            </Link>
        </>

    )
}

export default Footer