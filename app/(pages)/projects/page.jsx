import React from 'react';
import ProjectsContent from './components/ProjectsContent';
import { projectsSEO } from '@/app/data/projectsData';

export async function generateMetadata({ searchParams }) {
    const lang = searchParams?.lang || 'ar';
    const seo = projectsSEO[lang] || projectsSEO.ar;

    return {
        title: seo.title,
        description: seo.description,
        keywords: seo.keywords,
        alternates: {
            canonical: 'https://www.mila-knight.com/projects',
        },
        openGraph: {
            title: seo.title,
            description: seo.description,
            images: ['https://www.mila-knight.com/images/logo-dark-footer.webp'],
            url: `https://www.mila-knight.com/projects`,
            type: 'website',
            locale: "KSA",
        },
        twitter: {
            card: 'summary_large_image',
            title: seo.title,
            description: seo.description,
            images: ['https://www.mila-knight.com/images/logo-dark-footer.webp'],
        }
    };
}

const ProjectsPage = () => {
    return <ProjectsContent />;
};

export default ProjectsPage;
