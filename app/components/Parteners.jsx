"use client";
import React, { useContext } from 'react'
import Image from 'next/image'
import { LanguageContext } from '../context/LanguageContext';

const Parteners = () => {
    const { language } = useContext(LanguageContext);

    const content = {
        ar: {
            partners_title: "من بعض شركاء النجاح",
            partner_alts: [
                "شركة اسامة محمد الكندي",
                "مجموعة القرعاوي",
                "شوب زي - ShopsZe",
                "قمة الماركات العربية للتجارة - TBA",
                "الوثيقة الرقمية",
                "تمام",
                "مخازن الإضاءة",
                "شركة احمد خفيان العنزي للمقاولات AKA",
                "شركة بيوند تكنولوجي لتقنية المعلومات - Beyond Technology",
                "محطة البناء - Build Station",
                "بوديوم - Podium",
                "شركة جهاد على الزهراني للمحاسبة والمراجعة - JBK",
                "Aroma Group",
                "Be Events",
                "Virginia Sourcing",
                "عمل المستقبل",
                "elevate-360",
                "Falcon", "Falcon", "Falcon", "Falcon", "Falcon", "Falcon", "Falcon"
                , "paper-mints"
                , "white-horse"
                , "top-brands"
            ]
        },
        en: {
            partners_title: "Some of Our Success Partners",
            partner_alts: [
                "Osama Mohammed Al-Kindi Company",
                "Al-Qarawi Group",
                "ShopsZe",
                "TBA - Arabic Brands Top",
                "Digital Document",
                "Tamam",
                "Lighting Stores",
                "AKA Contracting Company",
                "Beyond Technology for Information Systems",
                "Build Station",
                "Podium",
                "JBK for Auditing & Accounting",
                "Aroma Group",
                "Be Events",
                "Virginia Sourcing",
                "Future Work",
                "Elevate-360",
                "Falcon", "Falcon", "Falcon", "Falcon", "Falcon", "Falcon", "Falcon"
                , "paper-mints"
                , "white-horse"
                , "top-brands"
            ]
        }
    };

    const c = content[language];

    return (
        <div className="how-work-company-slider py-5">
            <div className="container">
                <h3 className="text-center pb-5">{c.partners_title}</h3>
                {/* Reuse/Copy slider HTML or static list for now since original had many static slides */}
                <div className="logos-container-wrapper">
                    {/* Inserted a simplified version. For full functionality, might need the jQuery scripts or a React Slider like Swiper. 
                             The original page used 'slicknav' etc. Since we are in Next.js, jQuery plugins might not work smoothly without extensive adaptation.
                             For now, I'll render the static structure which might be styled by CSS to scroll.
                         */}
                    {[...Array(32)].map((_, i) => (
                        <div className="slide overflow-hidden" key={i}>
                            <div className="company-logo">
                                {/* B2B images are named 1.webp to 25.webp. Some were missing or had gaps in original HTML but let's try 1-18 mostly used */}
                                <Image
                                    width={135}
                                    height={135}
                                    alt={c.partner_alts[i] || `Partner ${i + 1}`}
                                    src={`/images/logo/B2B/${i + 1}.webp`}
                                    className="img-fluid"
                                    onError={(e) => e.target.style.display = 'none'}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Parteners