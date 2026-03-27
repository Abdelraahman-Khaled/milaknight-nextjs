import { servicesData } from '@/app/data/servicesData';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import ServicePageClient from './ServicePageClient';

export async function generateMetadata({ params }) {
    const { lang, slug } = await params;
    const language = lang || 'ar';
    const data = servicesData[slug]?.[language];

    if (!data) {
        return {
            title: 'Service Not Found | Milaknight',
        };
    }

    return {
        title: data.meta_title,
        description: data.meta_description,
        openGraph: {
            title: data.meta_title,
            description: data.meta_description,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: data.meta_title,
            description: data.meta_description,
        },
    };
}

export default async function Page({ params }) {
    const { lang, slug } = await params;

    if (!servicesData[slug]) {
        return notFound();
    }

    return <ServicePageClient slug={slug} />;
}
