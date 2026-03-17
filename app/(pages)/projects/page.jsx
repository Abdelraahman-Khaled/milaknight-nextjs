import React from 'react';
import ProjectsContent from './components/ProjectsContent';
import { projectsSEO } from '@/app/data/projectsData';

import { cookies } from 'next/headers';

export async function generateMetadata({ searchParams }) {
    const cookieStore = await cookies();
    const lang = (await searchParams)?.lang || cookieStore.get('NEXT_LOCALE')?.value || 'ar';
    const seo = projectsSEO[lang] || projectsSEO.ar;

    return {
        title: seo.title,
        description: seo.description,
        keywords: seo.keywords,
        alternates: {
            canonical: 'https://mila-knight.com/projects',
        },
        openGraph: {
            title: seo.title,
            description: seo.description,
            images: ['https://mila-knight.com/images/logo-dark-footer.webp'],
            url: `https://mila-knight.com/projects`,
            type: 'website',
            locale: "KSA",
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
