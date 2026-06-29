"use client";

import React, { useContext, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import emailjs from 'emailjs-com';
import { LanguageContext } from '@/app/context/LanguageContext';
import ScrollTicker from '@/app/components/ui/ScrollTicker';
import dynamic from 'next/dynamic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter, faFacebookF, faSnapchat, faInstagram, faLinkedinIn, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons';

const DynamicMap = dynamic(() => import('@/app/components/MapComponent'), {
    ssr: false,
    loading: () => <div style={{ height: '500px', width: '100%', background: '#f5f5f5', borderRadius: '15px' }} />
});

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
                                        <li className="breadcrumb-item"><Link href={`/${language}`}>{t('home')}</Link></li>
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
                                        <Link href="tel:+966 11 497 7257" className="contact-info-item">
                                            <div className="icon-box">
                                                <Image width={50} height={50} alt="phone" src="/images/icons/icon-phone.svg" />
                                            </div>
                                            <div className="contact-item-content">
                                                <h3>{t('phone')}</h3>
                                                <p dir="ltr">+966 11 497 7257</p>
                                            </div>
                                        </Link>
                                        <Link href="mailto:Info@milaknights.com" className="contact-info-item">
                                            <div className="icon-box">
                                                <Image width={50} height={50} alt="email" src="/images/icons/icon-mail.svg" />
                                            </div>
                                            <div className="contact-item-content">
                                                <h3>{t('email')}</h3>
                                                <p>Info[at]milaknights[dot]com</p>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="info-box-2">
                                        <div className="contact-info-item align-items-start">
                                            <div className="icon-box mt-1">
                                                <Image width={50} height={50} alt="location" src="/images/icons/icon-location.svg" />
                                            </div>
                                            <div className="contact-item-content w-100">
                                                <h3>{t('address')}</h3>
                                                <div className="locations-list d-flex flex-column gap-3 mt-3">
                                                    <div>

                                                        <p className="mb-0" >  <strong style={{ color: '#bf5ec6' }}>{language === 'ar' ? 'السعودية' : 'Saudi Arabia'}</strong> - {language === 'ar' ? 'الرياض، حي العليا' : 'Riyadh, Al Olaya District'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="mb-0" >  <strong style={{ color: '#bf5ec6' }}>{language === 'ar' ? 'الإمارات العربية المتحدة' : 'United Arab Emirates'}</strong> - {language === 'ar'
                                                            ? 'الدور السادس، مركز الأعمال، القاعة الكبرى، فندق الميدان، شارع الميدان، دبي'
                                                            : '6th Floor, Business Centre, Grand Auditorium, Meydan Hotel, Meydan Street, Dubai'}
                                                        </p>
                                                    </div>
                                                </div>
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
                                    <Link href="https://x.com/milaknight731?s=21&t=5NWQLtx2htlkEn1qeJG6_A" rel="noopener" target="_blank">
                                        <FontAwesomeIcon icon={faXTwitter} />
                                    </Link>
                                </div>
                                <div className="agency-social-content">
                                    <h3>Twitter</h3>
                                    <p>@milaknight731</p>
                                </div>
                                <div className="agency-social-btn">
                                    <Link href="https://x.com/milaknight731?s=21&t=5NWQLtx2htlkEn1qeJG6_A" rel="noopener" target="_blank" className="readmore-btn">
                                        <Image width={20} height={20} alt="arrow" src="/images/icons/arrow-2.svg" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="agency-social-item">
                                <div className="icon-box">
                                    <Link href="https://www.facebook.com/milaknight.mena?rdid=6X8BVNcFdWJhIHGz#" rel="noopener" target="_blank">
                                        <FontAwesomeIcon icon={faFacebookF} />
                                    </Link>
                                </div>
                                <div className="agency-social-content">
                                    <h3>Facebook</h3>
                                    <p>milaknight</p>
                                </div>
                                <div className="agency-social-btn">
                                    <Link href="https://www.facebook.com/milaknight.mena?rdid=6X8BVNcFdWJhIHGz#" rel="noopener" target="_blank" className="readmore-btn">
                                        <Image width={20} height={20} alt="arrow" src="/images/icons/arrow-2.svg" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="agency-social-item">
                                <div className="icon-box">
                                    <Link href="https://www.snapchat.com/add/milaknight.mk" rel="noopener" target="_blank">
                                        <FontAwesomeIcon icon={faSnapchat} />
                                    </Link>
                                </div>
                                <div className="agency-social-content">
                                    <h3>Snapchat</h3>
                                    <p>milaknight</p>
                                </div>
                                <div className="agency-social-btn">
                                    <Link href="https://www.snapchat.com/add/milaknight.mk" rel="noopener" target="_blank" className="readmore-btn">
                                        <Image width={20} height={20} alt="arrow" src="/images/icons/arrow-2.svg" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="agency-social-item">
                                <div className="icon-box">
                                    <Link href="https://www.instagram.com/milaknight.mena/" rel="noopener" target="_blank">
                                        <FontAwesomeIcon icon={faInstagram} />
                                    </Link>
                                </div>
                                <div className="agency-social-content">
                                    <h3>Instagram</h3>
                                    <p>@milaknight.mk</p>
                                </div>
                                <div className="agency-social-btn">
                                    <Link href="https://www.instagram.com/milaknight.mena/" rel="noopener" target="_blank" className="readmore-btn">
                                        <Image width={20} height={20} alt="arrow" src="/images/icons/arrow-2.svg" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="agency-social-item">
                                <div className="icon-box">
                                    <Link href="https://www.linkedin.com/company/milaknight/" rel="noopener" target="_blank">
                                        <FontAwesomeIcon icon={faLinkedinIn} />
                                    </Link>
                                </div>
                                <div className="agency-social-content">
                                    <h3>LinkedIn</h3>
                                    <p>@milaknight.mk</p>
                                </div>
                                <div className="agency-social-btn">
                                    <Link href="https://www.linkedin.com/company/milaknight/" rel="noopener" target="_blank" className="readmore-btn">
                                        <Image width={20} height={20} alt="arrow" src="/images/icons/arrow-2.svg" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="agency-social-item">
                                <div className="icon-box">
                                    <Link href="https://www.tiktok.com/@milaknight.mk" rel="noopener" target="_blank">
                                        <FontAwesomeIcon icon={faTiktok} />
                                    </Link>
                                </div>
                                <div className="agency-social-content">
                                    <h3>TikTok</h3>
                                    <p>@mila.knight</p>
                                </div>
                                <div className="agency-social-btn">
                                    <Link href="https://www.tiktok.com/@milaknight.mk" rel="noopener" target="_blank" className="readmore-btn">
                                        <Image width={20} height={20} alt="arrow" src="/images/icons/arrow-2.svg" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="agency-social-item">
                                <div className="icon-box">
                                    <Link href="https://www.youtube.com/@MilaKnight-mk" rel="noopener" target="_blank">
                                        <FontAwesomeIcon icon={faYoutube} />
                                    </Link>
                                </div>
                                <div className="agency-social-content">
                                    <h3>Youtube</h3>
                                    <p>@MilaKnight-mk</p>
                                </div>
                                <div className="agency-social-btn">
                                    <Link href="https://www.youtube.com/@MilaKnight-mk" rel="noopener" target="_blank" className="readmore-btn">
                                        <Image width={20} height={20} alt="arrow" src="/images/icons/arrow-2.svg" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="google-map py-5">
                <div className="container" style={{ margin: '50px auto' }}>
                    <div className="row mb-4">
                        <div className="col-lg-12 text-center section-title">
                            <h2 className="first-section-title">
                                {language === 'ar' ? 'أماكننا حول العالم' : 'Our Locations Worldwide'}
                            </h2>
                            <p className="mt-2">
                                {language === 'ar' ? 'نحن نتواجد في عدة مواقع حول العالم لخدمتكم بشكل أفضل.' : 'We are present in several locations worldwide to serve you better.'}
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <DynamicMap language={language} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactContent;
