"use client";
import React, { useContext } from 'react';
import { LanguageContext } from '@/app/context/LanguageContext';

const BlogFaqs = ({ faqs }) => {
    const { language, t } = useContext(LanguageContext);

    if (!faqs || !Array.isArray(faqs) || faqs.length === 0) {
        return null;
    }

    return (
        <div className="our-faqs blog-faqs margin-top-60">
            <div className="row flex-column-reverse flex-md-row align-items-center">
                <div className="col-lg-12">
                    <div className="our-faq-section">
                        <div className="faq-accordion" id="blogfaqaccordion">
                            {faqs.map((faq, index) => {
                                const question = language === 'ar' ? (faq.question_ar || faq.question_en) : (faq.question_en || faq.question_ar);
                                const answer = language === 'ar' ? (faq.answer_ar || faq.answer_en) : (faq.answer_en || faq.answer_ar);


                                return (
                                    <div className="accordion-item" key={faq.id}>
                                        <h3 className="accordion-header" id={`blogheading${faq.id}`}>
                                            <button
                                                className="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target={`#blogcollapse${faq.id}`}
                                                aria-expanded="false"
                                                aria-controls={`blogcollapse${faq.id}`}
                                            >
                                                {question}
                                            </button>
                                        </h3>
                                        <div
                                            id={`blogcollapse${faq.id}`}
                                            className="accordion-collapse collapse"
                                            aria-labelledby={`blogheading${faq.id}`}
                                            data-bs-parent="#blogfaqaccordion"
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
    );
}

export default BlogFaqs;
