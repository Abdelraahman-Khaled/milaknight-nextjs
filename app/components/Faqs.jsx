"use client";
import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { LanguageContext } from '../context/LanguageContext';

const Faqs = () => {
    const { language } = useContext(LanguageContext);
    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        fetch('/api/faqs')
            .then(res => res.json())
            .then(data => setFaqs(data))
            .catch(err => console.error("Failed to fetch FAQs:", err));
    }, []);

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
                                <figure className="image-anime reveal">
                                    <Image alt={c.faq_image_alt} src="/images/FAQs.webp" width={400} height={400} />
                                </figure>
                            </div>
                            <div className="faq-cta-box">
                                <a href="https://api.whatsapp.com/send?phone=971585856774" rel="noopener noreferrer" dir="ltr" target="_blank">
                                    <Image alt={c.whatsapp_alt} src="/images/icons/whatsapp_white_icon.png" width={24} height={24} className="me-2" />
                                    +971 58 585 6774
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="our-faq-section">
                            <div className="section-title">
                                <h2 className=" first-section-title">{c.faq_title}</h2>
                                <p>{c.faq_subtitle}</p>
                            </div>
                            <div className="faq-accordion" id="faqaccordion">
                                {/* Map FAQs from API */}
                                {faqs.map((faq, index) => {
                                    // Get translated content for the question/answer
                                    const question = faq.question[language] || faq.question['en'];
                                    const answer = faq.answer[language] || faq.answer['en'];

                                    return (
                                        <div className="accordion-item" key={faq.id}>
                                            <h3 className="accordion-header" id={`heading${faq.id}`}>
                                                <button
                                                    className="accordion-button collapsed"
                                                    type="button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target={`#collapse${faq.id}`}
                                                    aria-expanded="false"
                                                    aria-controls={`collapse${faq.id}`}
                                                >
                                                    {question}
                                                </button>
                                            </h3>
                                            <div
                                                id={`collapse${faq.id}`}
                                                className="accordion-collapse collapse"
                                                aria-labelledby={`heading${faq.id}`}
                                                data-bs-parent="#faqaccordion"
                                            >
                                                <div className="accordion-body" dangerouslySetInnerHTML={{ __html: answer }} />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Faqs;
