"use client";

import React, { useContext, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import emailjs from 'emailjs-com';
import { LanguageContext } from '@/app/context/LanguageContext';
import ScrollTicker from '@/app/components/ui/ScrollTicker';

const ContactContent = () => {
    const { t, language } = useContext(LanguageContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setIsError(false);

        emailjs.sendForm(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
            form.current,
            process.env.NEXT_PUBLIC_EMAILJS_USER_ID
        )
            .then((result) => {
                console.log(result.text);
                setIsSubmitting(false);
                setIsSuccess(true);
                setTimeout(() => setIsSuccess(false), 3000);
                e.target.reset();
            }, (error) => {
                console.log(error.text);
                setIsSubmitting(false);
                setIsError(true);
                setTimeout(() => setIsError(false), 3000);
            });
    };

    return (
        <>
            <div className="page-header">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12">
                            <div className="page-header-box">
                                <h1>
                                    {language === 'ar' ? (
                                        <>تواصل <span>معنا</span></>
                                    ) : (
                                        <>Contact <span>Us</span></>
                                    )}
                                </h1>
                                <nav>
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link href="/">{t('home')}</Link></li>
                                        <li className="active breadcrumb-item" aria-current="page">{t('contact_us')}</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ScrollTicker />

            <div className="page-contact-us">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="contact-information">
                                <div className="section-title">
                                    <h2 className="first-section-title">
                                        {t('stay_in_touch')}
                                    </h2>
                                    <p>{t('contact_intro')}</p>
                                    <p>{t('form_fill')}</p>
                                    <p>{t('dont_miss')}</p>
                                </div>
                                <div className="contact-info-box">
                                    <div className="info-box-1">
                                        <a href="tel:+971585856774" className="contact-info-item">
                                            <div className="icon-box">
                                                <Image width={50} height={50} alt="phone" src="/images/icons/icon-phone.svg" />
                                            </div>
                                            <div className="contact-item-content">
                                                <h3>{t('phone')}</h3>
                                                <p dir="ltr">+971 58 585 6774</p>
                                            </div>
                                        </a>
                                        <a href="mailto:Info@milaknights.com" className="contact-info-item">
                                            <div className="icon-box">
                                                <Image width={50} height={50} alt="email" src="/images/icons/icon-mail.svg" />
                                            </div>
                                            <div className="contact-item-content">
                                                <h3>{t('email')}</h3>
                                                <p>Info[at]milaknights[dot]com</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="info-box-2">
                                        <div className="contact-info-item">
                                            <div className="icon-box">
                                                <Image width={50} height={50} alt="location" src="/images/icons/icon-location.svg" />
                                            </div>
                                            <div className="contact-item-content">
                                                <h3>{t('address')}</h3>
                                                <a href="https://www.google.com/maps/place/The+Meydan+Hotel/@25.155658,55.3003012,17z/data=!3m1!4b1!4m9!3m8!1s0x3e5f688c5516ea0f:0x44800f32689f57e2!5m2!4m1!1i2!8m2!3d25.155658!4d55.3003012!16s%2Fg%2F11c2yrjfv6?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D"
                                                    rel="noopener" target="_blank">
                                                    {t('full_address')}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="contact-us-form">
                                <form id="contactForm" ref={form} onSubmit={sendEmail}>
                                    <input type="hidden" name="time" value={new Date().toLocaleString()} />
                                    <div className="row">
                                        <div className="form-group mb-4 col-md-6">
                                            <input className="form-control" id="fname" name="name" placeholder={t('your_name')} required />
                                        </div>
                                        <div className="form-group mb-4 col-md-6">
                                            <input className="form-control" id="phone" name="phone" placeholder={t('phone_number')} required type="tel" />
                                        </div>
                                        <div className="form-group mb-4 col-md-12">
                                            <input className="form-control" id="email" name="email" placeholder={t('email')} required type="email" />
                                        </div>
                                        <div className="form-group mb-4 col-md-12">
                                            <input className="form-control" id="subject" name="subject" placeholder={t('subject')} required />
                                        </div>
                                        <div className="form-group col-md-12 mb-5">
                                            <textarea className="form-control" id="message" name="message" placeholder={t('message')} rows="4" required></textarea>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="contact-form-btn">
                                                <button className="btn-highlighted" type="submit" disabled={isSubmitting}>
                                                    {isSubmitting ? 'Sending...' : t('send_message')}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Popup */}
            {isSuccess && (
                <div className="overlay-pop" id="overlay-pop" style={{ display: 'flex' }}>
                    <div className="pop-up" id="pop-up">
                        <div className="msg" id="msg">
                            <div>
                                <h2>{t('message_sent')}</h2>
                            </div>
                            <div>
                                <Image width={150} height={150} alt="success" src="/images/icons/message.gif" unoptimized />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Error Popup - Optional to add later, for now just using console log */}
            {isError && (
                <div className="overlay-pop" id="overlay-pop-error" style={{ display: 'flex' }}>
                    <div className="pop-up" id="pop-up-error">
                        <div className="msg" id="msg-error">
                            <div>
                                <h2 style={{ color: 'red' }}>Error Sending Message</h2>
                                <p>Please try again later.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="join-agency py-0">
                <div className="container">
                    <div className="row align-items-center section-row">
                        <div className="col-lg-7">
                            <div className="section-title">
                                <h2 className="first-section-title">
                                    {language === 'ar' ? 'وسائل التواصل الاجتماعي' : 'Social Media'}
                                </h2>
                                <p>
                                    {language === 'ar' ? (
                                        <>تابعنا لتبقى على <span>اطلاع دائم بكل جديد</span></>
                                    ) : (
                                        <>Follow us to stay <span>updated with all the latest</span></>
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="agency-social-item">
                                <div className="icon-box">
                                    <a href="https://x.com/milaknight731?s=21&t=5NWQLtx2htlkEn1qeJG6_A" rel="noopener" target="_blank">
                                        <i className="fa-brands fa-x-twitter"></i>
                                    </a>
                                </div>
                                <div className="agency-social-content">
                                    <h3>Twitter</h3>
                                    <p>@milaknight731</p>
                                </div>
                                <div className="agency-social-btn">
                                    <a href="https://x.com/milaknight731?s=21&t=5NWQLtx2htlkEn1qeJG6_A" rel="noopener" target="_blank" className="readmore-btn">
                                        <Image width={20} height={20} alt="arrow" src="/images/icons/arrow-2.svg" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="agency-social-item">
                                <div className="icon-box">
                                    <a href="https://www.facebook.com/people/milaknight/61557223981208" rel="noopener" target="_blank">
                                        <i className="fa-brands fa-facebook-f"></i>
                                    </a>
                                </div>
                                <div className="agency-social-content">
                                    <h3>Facebook</h3>
                                    <p>milaknight</p>
                                </div>
                                <div className="agency-social-btn">
                                    <a href="https://www.facebook.com/people/milaknight/61557223981208" rel="noopener" target="_blank" className="readmore-btn">
                                        <Image width={20} height={20} alt="arrow" src="/images/icons/arrow-2.svg" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="agency-social-item">
                                <div className="icon-box">
                                    <a href="https://www.snapchat.com/add/milaknight.mk" rel="noopener" target="_blank">
                                        <i className="fa-brands fa-snapchat"></i>
                                    </a>
                                </div>
                                <div className="agency-social-content">
                                    <h3>Snapchat</h3>
                                    <p>milaknight</p>
                                </div>
                                <div className="agency-social-btn">
                                    <a href="https://www.snapchat.com/add/milaknight.mk" rel="noopener" target="_blank" className="readmore-btn">
                                        <Image width={20} height={20} alt="arrow" src="/images/icons/arrow-2.svg" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="agency-social-item">
                                <div className="icon-box">
                                    <a href="https://www.instagram.com/milaknight.1/" rel="noopener" target="_blank">
                                        <i className="fa-brands fa-instagram"></i>
                                    </a>
                                </div>
                                <div className="agency-social-content">
                                    <h3>Instagram</h3>
                                    <p>@milaknight.mk</p>
                                </div>
                                <div className="agency-social-btn">
                                    <a href="https://www.instagram.com/milaknight.1/" rel="noopener" target="_blank" className="readmore-btn">
                                        <Image width={20} height={20} alt="arrow" src="/images/icons/arrow-2.svg" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="agency-social-item">
                                <div className="icon-box">
                                    <a href="https://www.linkedin.com/company/milaknight/" rel="noopener" target="_blank">
                                        <i className="fa-brands fa-linkedin-in"></i>
                                    </a>
                                </div>
                                <div className="agency-social-content">
                                    <h3>LinkedIn</h3>
                                    <p>@milaknight.mk</p>
                                </div>
                                <div className="agency-social-btn">
                                    <a href="https://www.linkedin.com/company/milaknight/" rel="noopener" target="_blank" className="readmore-btn">
                                        <Image width={20} height={20} alt="arrow" src="/images/icons/arrow-2.svg" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="agency-social-item">
                                <div className="icon-box">
                                    <a href="https://www.tiktok.com/@milaknight.mk" rel="noopener" target="_blank">
                                        <i className="fa-brands fa-tiktok"></i>
                                    </a>
                                </div>
                                <div className="agency-social-content">
                                    <h3>TikTok</h3>
                                    <p>@mila.knight</p>
                                </div>
                                <div className="agency-social-btn">
                                    <a href="https://www.tiktok.com/@milaknight.mk" rel="noopener" target="_blank" className="readmore-btn">
                                        <Image width={20} height={20} alt="arrow" src="/images/icons/arrow-2.svg" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="agency-social-item">
                                <div className="icon-box">
                                    <a href="https://www.youtube.com/@MilaKnight-mk" rel="noopener" target="_blank">
                                        <i className="fa-brands fa-youtube"></i>
                                    </a>
                                </div>
                                <div className="agency-social-content">
                                    <h3>Youtube</h3>
                                    <p>@MilaKnight-mk</p>
                                </div>
                                <div className="agency-social-btn">
                                    <a href="https://www.youtube.com/@MilaKnight-mk" rel="noopener" target="_blank" className="readmore-btn">
                                        <Image width={20} height={20} alt="arrow" src="/images/icons/arrow-2.svg" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="google-map">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="google-map-iframe">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3094.121988073094!2d55.3003109!3d25.1567646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f69873436577b%3A0xfa9205019ca3faa6!2sMilaknight%20LLC-FZ!5e1!3m2!1sen!2seg!4v1760186957510!5m2!1sen!2seg"
                                    width="600" height="450" allowFullScreen loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactContent;
