"use client";

import { useContext, useEffect } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { usePathname } from "next/navigation";

const DynamicSEO = () => {
    const { t, language } = useContext(LanguageContext);
    const pathname = usePathname();

    useEffect(() => {
        const isHome = pathname === "/";
        const isAboutPage = pathname === "/about";
        const isServicesPage = pathname === "/services";
        const isContactPage = pathname === "/contact";
        const isProjectsPage = pathname === "/projects";
        const isPricingPage = pathname === "/pricing";

        if (!isHome && !isAboutPage && !isServicesPage && !isProjectsPage && !isPricingPage && !isContactPage) return;

        let titleKey = "seo_title";
        let descKey = "seo_description";
        let keywordsKey = "seo_keywords";

        if (isAboutPage) {
            titleKey = "about_seo_title";
            descKey = "about_seo_description";
        } else if (isServicesPage) {
            titleKey = "services_seo_title";
            descKey = "services_seo_description";
            keywordsKey = "services_seo_keywords";
        } else if (isProjectsPage) {
            titleKey = "projects_seo_title";
            descKey = "projects_seo_description";
            keywordsKey = "projects_seo_keywords";
        } else if (isPricingPage) {
            titleKey = "pricing_seo_title";
            descKey = "pricing_seo_description";
            keywordsKey = "pricing_seo_keywords";
        } else if (isContactPage) {
            titleKey = "contact_seo_title";
            descKey = "contact_seo_description";
        }

        // Update Title
        document.title = t(titleKey);

        // Update Meta Description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute("content", t(descKey));
        }

        // Update Meta Keywords
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
            metaKeywords.setAttribute("content", t(keywordsKey));
        }

        // Update OG Tags
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute("content", t(titleKey));

        const ogDescription = document.querySelector('meta[property="og:description"]');
        if (ogDescription) ogDescription.setAttribute("content", t(descKey));

        const twitterTitle = document.querySelector('meta[name="twitter:title"]');
        if (twitterTitle) twitterTitle.setAttribute("content", t(titleKey));

        const twitterDescription = document.querySelector('meta[name="twitter:description"]');
        if (twitterDescription) twitterDescription.setAttribute("content", t(descKey));

        const ogImageAlt = document.querySelector('meta[property="og:image:alt"]');
        if (ogImageAlt) ogImageAlt.setAttribute("content", t("seo_image_alt"));

    }, [language, t, pathname]);

    return null;
};

export default DynamicSEO;
