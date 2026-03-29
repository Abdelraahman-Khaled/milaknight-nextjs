import ContactContent from './components/ContactContent';
import { cookies } from 'next/headers';

// SEO metadata for both languages
const seoData = {
    ar: {
        title: 'تواصل معنا',
        description: 'تواصل معنا للحصول على استشارات تسويقية خدمات سيو تصميم مواقع حلول تسويق رقمي استفسارات حول أعمالنا وخدماتنا دعم فني استراتيجيات مبتكرة لتحسين أداء عملك',
        url: 'https://mila-knight.com/contact',
        locale: 'ar_SA',
        jsonLd: {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "@id": "https://mila-knight.com/contact#contactpage",
            "url": "https://mila-knight.com/contact",
            "name": "تواصل معنا",
            "description": "تواصل معنا للحصول على استشارات تسويقية خدمات سيو تصميم مواقع حلول تسويق رقمي استفسارات حول أعمالنا وخدماتنا دعم فني استراتيجيات مبتكرة لتحسين أداء عملك",
            "isPartOf": {
                "@id": "https://mila-knight.com/#corporation"
            },
            "publisher": {
                "@id": "https://mila-knight.com/#corporation"
            }
        }
    },
    en: {
        title: 'Contact us',
        description: 'We are a digital marketing agency SEO experts Brand building specialists Smart marketing solutions Data driven strategies Helping your business grow with innovative tools',
        url: 'https://mila-knight.com/contact',
        locale: 'en_US',
        jsonLd: {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "@id": "https://mila-knight.com/contact#contactpage",
            "url": "https://mila-knight.com/contact",
            "name": "Contact us",
            "description": "MilaKnight LLC-FZ is a digital marketing agency specializing in SEO, brand building, smart marketing solutions, and data-driven strategies to help your business grow with innovative tools.",
            "isPartOf": {
                "@id": "https://mila-knight.com/#corporation"
            },
            "publisher": {
                "@id": "https://mila-knight.com/#corporation"
            }
        }
    }
};

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const language = lang || 'ar';
    const seo = seoData[language] || seoData.ar;

    return {
        title: seo.title,
        description: seo.description,
        openGraph: {
            title: seo.title,
            description: seo.description,
            url: seo.url,
            type: 'website',
            locale: seo.locale,
            images: [
                {
                    url: 'https://mila-knight.com/images/logo-dark-footer.webp',
                    width: 1200,
                    height: 630,
                    alt: language === 'ar' ? 'شعار Mila Knight لتسويق رقمي' : 'Mila Knight Digital Marketing Logo'
                }
            ]
        },
        twitter: {
            card: 'summary_large_image',
            title: seo.title,
            description: seo.description,
            images: ['https://mila-knight.com/images/logo-dark-footer.webp']
        }
    };
}

export default async function ContactPage({ params }) {
    const { lang } = await params;
    const language = lang || 'ar';
    const seo = seoData[language] || seoData.ar;

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.jsonLd) }}
            />
            <ContactContent />
        </>
    );
}
