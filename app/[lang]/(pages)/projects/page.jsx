import React from 'react';
import ProjectsContent from './components/ProjectsContent';
import { projectsSEO } from '@/app/data/projectsData';

import { cookies } from 'next/headers';

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const language = lang || 'ar';
    const seo = projectsSEO[language] || projectsSEO.ar;

    return {
        title: seo.title,
        description: seo.description,
        keywords: seo.keywords,
        alternates: {
            canonical: `https://mila-knight.com/${language}/projects`,
        },
        openGraph: {
            title: seo.title,
            description: seo.description,
            images: ['https://mila-knight.com/images/logo-dark-footer.webp'],
            url: `https://mila-knight.com/${language}/projects`,
            type: 'website',
            locale: language === 'en' ? "en_US" : "ar_SA",
        },
        twitter: {
            card: 'summary_large_image',
            title: seo.title,
            description: seo.description,
            images: ['https://mila-knight.com/images/logo-dark-footer.webp'],
        }
    };
}

const ProjectsPage = () => {
    return <ProjectsContent />;
};

export default ProjectsPage;
