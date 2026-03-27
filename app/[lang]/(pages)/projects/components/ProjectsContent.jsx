"use client";
import React, { useContext } from 'react';
import { projectsTranslations, projectCategories } from '@/app/data/projectsData';
import ProjectCategory from './ProjectCategory';
import HeroSection from '@/app/components/ui/HeroSection';
import ScrollTicker from '@/app/components/ui/ScrollTicker';
import { LanguageContext } from '@/app/context/LanguageContext';

const ProjectsContent = () => {
    const { language } = useContext(LanguageContext);

    const translations = projectsTranslations[language] || projectsTranslations.ar;
    const isArabic = language === 'ar';

    return (
        <div className={isArabic ? 'rtl' : 'ltr'} dir={isArabic ? 'rtl' : 'ltr'}>
            <HeroSection
                title=""
                subtitle={translations.pageTitle}
                breadcrumb={translations.home}
                page={translations.projects}
            />

            <ScrollTicker />

            <div className="projects-container py-5">
                {projectCategories.map((category) => (
                    <ProjectCategory
                        key={category.id}
                        category={category}
                        language={language}
                    />
                ))}
            </div>

            <div className="text-center my-5">
                <a
                    className="nav-link  d-inline-block py-3 px-5 text-white"
                    href={isArabic ? "https://publuu.com/flip-book/902608/2188910" : "https://publuu.com/flip-book/902608/1992497"}
                    target="_blank"
                    rel="noopener"
                    style={{ backgroundColor: 'var(--accent-color)', color: '#fff !important', borderRadius: '50px' }}
                >
                    {translations.viewGallery}
                    <i className={`fa-solid fa-download ${isArabic ? 'me-2' : 'ms-2'}`}></i>
                </a>
            </div>
        </div>
    );
};

export default ProjectsContent;
