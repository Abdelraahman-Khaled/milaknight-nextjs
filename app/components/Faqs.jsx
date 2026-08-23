"use client";
import React, { useContext } from 'react';
import Image from 'next/image';
import { LanguageContext } from '../context/LanguageContext';
import BlogFaqs from './blogs/BlogFaqs';
import Link from 'next/link';

const Faqs = ({ initialFaqs = [] }) => {
    const { language } = useContext(LanguageContext);
    const faqs = initialFaqs;

    const content = {
        ar: {
            faq_title: "هل لديك أي أسئلة؟",
            faq_subtitle: "دعنا نجيب على أسئلتك اليوم!",
            faq_image_alt: "اسعار إدارة حسابات التواصل الاجتماعي",
            whatsapp_alt: "تصميم صفحات هبوط"
        },
        en: {
            faq_title: "Do you have any questions?",
            faq_subtitle: "Let's answer your questions today!",
            faq_image_alt: "اسعار إدارة حسابات التواصل الاجتماعي",
            whatsapp_alt: "تصميم صفحات هبوط"
        }
    };

    const c = content[language];

    return (
        <div className="our-faqs">
            <div className="container">
                <div className="row flex-column-reverse flex-md-row align-items-center">
                    <div className="col-lg-6">
                        <div className="faq-images">
                            <div className="faq-img-2">
                                <figure className="image-anime reveal ">
                                    <Image alt={c.faq_image_alt} src="/images/FAQs.webp" width={400} height={600} />
                                </figure>
                            </div>
                            <div className="faq-cta-box">
                                <Link href="https://api.whatsapp.com/send?phone=966535930419" rel="noopener noreferrer" dir="ltr" target="_blank">
                                    <Image alt={c.whatsapp_alt} src="/images/icons/whatsapp_white_icon.png" width={24} height={24} className="me-2" />
                                    +966 53 593 0419
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="our-faq-section">
                            <div className="section-title">
                                <h2 className=" first-section-title">{c.faq_title}</h2>
                                <p>{c.faq_subtitle}</p>
                            </div>
                            <BlogFaqs faqs={faqs} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Faqs;
