"use client";

import React, { useContext, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LanguageContext } from '@/app/context/LanguageContext';
import ScrollTicker from '../ui/ScrollTicker';
import BlogFaqs from './BlogFaqs';
import { useRouter } from "next/navigation";
import { useQuery } from '@tanstack/react-query';
import { getBlogDetails } from '@/app/api/blog';

const BlogDetailContent = ({ slug, initialBlog }) => {
    const { language, t, setAlternatePath } = useContext(LanguageContext);
    const router = useRouter();

    const { data: blog = initialBlog } = useQuery({
        queryKey: ['blog', slug],
        queryFn: () => getBlogDetails(slug),
        initialData: initialBlog,
        refetchInterval: 5000, // 5 seconds polling for live updates
    });

    useEffect(() => {
        if (!blog) return;

        // Decode the slug from props to handle non-Latin characters correctly
        let decodedSlug = slug;
        try {
            decodedSlug = decodeURIComponent(slug);
        } catch (e) {
            console.error("Failed to decode slug:", e);
        }

        // Register the alternate language path for the global toggle
        const alternateLang = language === 'ar' ? 'en' : 'ar';
        const targetSlug = alternateLang === 'ar'
            ? blog.slug_ar || blog.slug
            : blog.slug || blog.slug_ar;

        const newAlternatePath = `/${alternateLang}/blog/${targetSlug}`;
        
        if (setAlternatePath) {
            // Only update if it's different to prevent loops
            setAlternatePath(prev => prev === newAlternatePath ? prev : newAlternatePath);
        }

        // Check if the current decoded slug matches the current language
        const expectedSlug = language === "ar"
            ? blog.slug_ar || blog.slug
            : blog.slug || blog.slug_ar;

        if (decodedSlug !== expectedSlug) {
            router.replace(`/${language}/blog/${encodeURIComponent(expectedSlug)}`, { scroll: false });
        }
    }, [language, blog, slug, router, setAlternatePath]);


    // Fallback logic for content
    const renderContent = () => {
        if (blog.contents && Array.isArray(blog.contents)) {
            return blog.contents.map((section, index) => (
                <div key={index} className="blog-section">
                    {/* Render section text based on language */}
                    <div dangerouslySetInnerHTML={{ __html: language === 'ar' ? (section.content_ar || section.content_en) : (section.content_en || section.content_ar) }} />

                    {/* Render section images if they exist */}
                    {section.photos && section.photos.length > 0 && (
                        <div className="row row-images">
                            {section.photos.map((img, imgIndex) => {
                                if (!img.url || img.url === "") return null;
                                return (
                                    <div key={imgIndex} className="col-12 col-md-6">
                                        <figure>
                                            <Image
                                                src={img.url}
                                                alt={language === 'ar' ? (img.alt_ar || img.alt_en) : (img.alt_en || img.alt_ar)}
                                                width={1200}
                                                height={630}
                                                className="img-fluid"
                                            />
                                        </figure>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            ));
        } else {
            // Fallback for old format (single HTML string) or missing content
             return null;
        }
    };

    const title = language === 'ar' ? (blog.title_ar || blog.title_en) : (blog.title_en || blog.title_ar);

    return (
        <>
            {/* Page Header */}
            <div className="page-header">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12">
                            <div className="page-header-box">
                                <h1>
                                    {title}
                                </h1>
                                <nav className="mt-3">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link href={`/${language}`}>{t('home')}</Link></li>
                                        <li className="breadcrumb-item"><Link href={`/${language}/blog`}>{t('blog')}</Link></li>
                                        <li className="active breadcrumb-item" aria-current="page">
                                            {title}
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ScrollTicker />

            <div className="page-single-post ">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            {/* Post Featured Image Start */}
                            <div className="post-image">
                                <figure className="image-anime reveal">
                                    {(() => {
                                        const featuredUrl = (blog.photos?.find(p => p.is_arabic === (language === 'ar'))?.url) ||
                                            (blog.photos?.[0]?.url) ||
                                            blog.photo_url;

                                        if (!featuredUrl || featuredUrl === "") return null;

                                        return (
                                            <Image
                                                src={featuredUrl}
                                                alt={
                                                    (blog.photos?.find(p => p.is_arabic === (language === 'ar'))?.alt) ||
                                                    (language === 'ar' ? (blog.image_alt_text_ar || blog.image_alt_text_en) : (blog.image_alt_text_en || blog.image_alt_text_ar))
                                                }
                                                width={1200}
                                                height={630}
                                            />
                                        );
                                    })()}
                                </figure>
                            </div>
                            {/* Post Featured Image End */}

                            {/* Post Single Content Start */}
                            <div className="post-content">
                                <div className="post-entry service-entry-list ">
                                    {renderContent()}
                                    {/* Render Blog FAQs if they exist */}
                                    {blog && blog.faqs && Array.isArray(blog.faqs) && blog.faqs.length > 0 && (
                                        <BlogFaqs faqs={blog.faqs} />
                                    )}
                                </div>
                            </div>
                            {/* Post Single Content End */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogDetailContent;
