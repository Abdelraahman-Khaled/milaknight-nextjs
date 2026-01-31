"use client";
import React, { useContext } from 'react'
import Image from 'next/image'
import { LanguageContext } from '../../context/LanguageContext';

const itemsAr = [
    { text: "التسويق الرقمي", alt: "شركة تسويق رقمي" },
    { text: "التسويق بالمحتوى", alt: "وكالة تسويق رقمي" },
    { text: "تصميم وتطوير المواقع الإلكترونية", alt: "ديجيتال ماركتنج" },
    { text: "تحسين محركات البحث", alt: "تصميم موقع الكتروني" },
    { text: "هوية العلامة التجارية", alt: "إنشاء الموقع الإلكتروني" },
    { text: "إدارة وسائل التواصل الاجتماعي", alt: "تصميم موقع إلكتروني" },
    { text: "تطوير استراتيجيات التسويق", alt: "تصميم مواقع الكترونية" },
    { text: "التسويق غير الرقمي", alt: "شركات تصميم مواقع الكترونية" },
    { text: "الإعلانات بالدفع مقابل النقر PPC", alt: "تصميم متجر الكتروني" },
    { text: "تحسين معدل التحويل CRO", alt: "تصميم متاجر الكترونية" },
    { text: "التسويق عبر البريد الإلكتروني", alt: "تصميم متجر الكتروني جاهز" },
    { text: "إدارة السمعة الإلكترونية", alt: "تصميم هوية بصرية" },
    { text: "تصوير جوي", alt: "تجارة الكترونية" },
    { text: "تنسيق مؤتمرات", alt: "منصة تجارة الكترونية" },
    { text: "علاقات عامة", alt: "شركة تصميم شعارات" },
    { text: "التسويق الرقمي", alt: "تصميم موشن جرافيك" },
    { text: "التسويق بالمحتوى", alt: "استراتيجية التسويق" },
    { text: "تصميم وتطوير المواقع الإلكترونية", alt: "كاتب محتوى تسويقي" },
    { text: "تحسين محركات البحث", alt: "تحسين ظهور موقعك لمحركات البحث" },
    { text: "هوية العلامة التجارية", alt: "seo تحسين محركات البحث" },
    { text: "إدارة وسائل التواصل الاجتماعي", alt: "تحسين ظهور موقعك لمحركات البحث" },
    { text: "تطوير استراتيجيات التسويق", alt: "seo تحسين محركات البحث" },
    { text: "التسويق غير الرقمي", alt: "طريقة تحسين محركات البحث" },
    { text: "الإعلانات بالدفع مقابل النقر PPC", alt: "خدمات ادارة حسابات التواصل الاجتماعي" },
    { text: "تحسين معدل التحويل CRO", alt: "التسويق بالذكاء الاصطناعي" },
    { text: "التسويق عبر البريد الإلكتروني", alt: "استخدام الذكاء الاصطناعي في التسويق" },
    { text: "إدارة السمعة الإلكترونية", alt: "انشاء هوية تجارية" },
    { text: "تصوير جوي", alt: "تصميم هوية تجارية كاملة" },
    { text: "تنسيق مؤتمرات", alt: "تحسين ترتيب موقعك في جوجل" },
    { text: "علاقات عامة", alt: "افضل ادوات السيو" }
];

const itemsEn = [
    { text: "Digital Marketing", alt: "Digital Marketing Company" },
    { text: "Content Marketing", alt: "Digital Marketing Agency" },
    { text: "Web Design and Development", alt: "Digital Marketing" },
    { text: "SEO (Search Engine Optimization)", alt: "Website Design" },
    { text: "Brand Identity", alt: "Create Website" },
    { text: "Social Media Management", alt: "Web Design" },
    { text: "Marketing Strategy Development", alt: "Web Design Companies" },
    { text: "Offline Marketing", alt: "Web Design Companies" },
    { text: "PPC (Pay Per Click)", alt: "E-commerce Design" },
    { text: "CRO (Conversion Rate Optimization)", alt: "Online Store Design" },
    { text: "Email Marketing", alt: "Ready Online Store Design" },
    { text: "Online Reputation Management", alt: "Visual Identity Design" },
    { text: "Aerial Photography", alt: "E-commerce" },
    { text: "Conference Coordination", alt: "E-commerce Platform" },
    { text: "Public Relations", alt: "Logo Design Company" },
    { text: "Digital Marketing", alt: "Motion Graphics Design" },
    { text: "Content Marketing", alt: "Marketing Strategy" },
    { text: "Web Design and Development", alt: "Marketing Content Writer" },
    { text: "SEO", alt: "Improve Website Visibility" },
    { text: "Brand Identity", alt: "SEO Services" },
    { text: "Social Media Management", alt: "Improve Google Ranking" },
    { text: "Marketing Strategy Development", alt: "SEO Tools" },
    { text: "Offline Marketing", alt: "SEO Techniques" },
    { text: "PPC", alt: "Social Media Management Services" },
    { text: "CRO", alt: "AI Marketing" },
    { text: "Email Marketing", alt: "AI in Marketing" },
    { text: "Online Reputation Management", alt: "Create Brand Identity" },
    { text: "Aerial Photography", alt: "Full Brand Identity Design" },
    { text: "Conference Coordination", alt: "Improve Google Ranking" },
    { text: "Public Relations", alt: "Best SEO Tools" }
];

const ScrollTicker = () => {
    const { language } = useContext(LanguageContext);
    const items = language === 'en' ? itemsEn : itemsAr;

    return (
        <div className="our-scrolling-ticker">
            <div className="scrolling-ticker-box">
                {[1, 2, 3, 4].map((_, index) => (
                    <div key={index} className="scrolling-content">
                        {items.map((item, i) => (
                            <span key={i}>
                                <Image
                                    src="/images/icons/asterisk-icon.svg"
                                    alt={item.alt}
                                    width={20}
                                    height={20}
                                    style={{ objectFit: 'contain', marginInlineEnd: '5px' }}
                                />
                                {item.text}
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ScrollTicker