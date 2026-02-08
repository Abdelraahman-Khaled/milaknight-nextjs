import PricingContent from './components/PricingContent';
import { cookies } from 'next/headers';

// SEO metadata for both languages
const seoData = {
    ar: {
        title: 'أسعارنا - Milaknight',
        description: 'أسعار تنافسية لخدمات التسويق الرقمي تصميم المواقع استراتيجيات سيو إدارة حملات الإعلانات تصميم جرافيكي حلول مبتكرة بأسعار مناسبة لكل الشركات استثمارات تسويقية ذكية',
        url: 'https://mila-knight.com/pricing',
        locale: 'KSA',
        jsonLd: {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": "https://mila-knight.com/pricing#pricingpage",
            "url": "https://mila-knight.com/pricing",
            "name": "أسعارنا - MilaKnight LLC-FZ",
            "description": "أسعار تنافسية لخدمات التسويق الرقمي، تصميم المواقع، استراتيجيات سيو، إدارة الحملات الإعلانية، التصميم الجرافيكي، وحلول مبتكرة بأسعار مناسبة لكل الشركات.",
            "isPartOf": { "@id": "https://mila-knight.com/#corporation" },
            "publisher": { "@id": "https://mila-knight.com/#corporation" }
        }
    },
    en: {
        title: 'Pricing - Milaknight',
        description: 'Competitive pricing for digital marketing services Web design SEO strategies Ad campaign management Graphic design Innovative solutions at affordable rates Smart marketing investments',
        url: 'https://mila-knight.com/pricing',
        locale: 'en_US',
        jsonLd: {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": "https://mila-knight.com/pricing#pricingpage",
            "url": "https://mila-knight.com/pricing",
            "name": "Pricing - MilaKnight LLC-FZ",
            "description": "Competitive pricing for digital marketing services, web design, SEO strategies, ad campaign management, graphic design, and innovative solutions at affordable rates. Smart marketing investments for every business.",
            "isPartOf": { "@id": "https://mila-knight.com/#corporation" },
            "publisher": { "@id": "https://mila-knight.com/#corporation" }
        }
    }
};

export async function generateMetadata() {
    const cookieStore = await cookies();
    const language = cookieStore.get('language')?.value || 'ar';
    const seo = seoData[language] || seoData.ar;

    return {
        title: seo.title,
        description: seo.description,
        keywords: language === 'ar'
            ? 'أسعار التسويق الرقمي, باقات التسويق, خطط التسويق, تصميم مواقع, SEO, إدارة حملات الإعلانات'
            : 'digital marketing pricing, marketing packages, marketing plans, web design, SEO, ad campaign management',
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

export default async function PricingPage() {
    const cookieStore = await cookies();
    const language = cookieStore.get('language')?.value || 'ar';
    const seo = seoData[language] || seoData.ar;

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.jsonLd) }}
            />
            <PricingContent />
        </>
    );
}
