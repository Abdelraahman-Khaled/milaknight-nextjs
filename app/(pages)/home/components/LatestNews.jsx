'use client';
import HeaderDescription from '@/app/components/ui/HeaderDescription'
import React, { useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { LanguageContext } from '@/app/context/LanguageContext'
import { latestNewsData } from './data'

const LatestNews = ({ initialBlogs = [] }) => {
    const { language, t } = useContext(LanguageContext);
    const content = latestNewsData[language];

    // Use top 3 blogs from API if available, otherwise fallback to static data
    const blogsToShow = initialBlogs.length > 0
        ? [...initialBlogs].reverse().slice(0, 3).map(blog => {
            const photo = blog.photos?.find(p => p.is_arabic === (language === 'ar'));
            return {
                title: language === 'ar' ? blog.title_ar : blog.title_en,
                link: language === 'ar' ? `/blog/${blog.slug_ar}` : `/blog/${blog.slug}`,
                image: photo?.url || blog.photo_url,
                alt: photo?.alt || (language === 'ar' ? blog.image_alt_text_ar : blog.image_alt_text_en)
            };
        })
        : content.items;

    return (
        <div className='container our-blog'>
            <HeaderDescription
                title={content.title}
                subtitle={content.subtitle}
                span={content.span}
                subtitle_end={content.subtitle_end}
                desc={content.desc}
            />

            {/* blogs */}
            <div className="row">
                {blogsToShow.map((item, index) => (
                    <div key={index} className="col-lg-4 col-md-6">
                        <div className="post-item">
                            <div className="post-featured-image">
                                <figure>
                                    <Link href={item.link} className="image-anime" data-cursor-text={t('read_article') || 'Read Article'}>
                                        <Image
                                            width={403}
                                            height={227}
                                            src={item.image}
                                            alt={item.alt}
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </Link>
                                </figure>
                            </div>
                            <div className="post-item-body">
                                <div className="post-item-content">
                                    <h3>
                                        <Link href={item.link}>
                                            {item.title}
                                        </Link>
                                    </h3>
                                </div>
                                <div className="post-item-btn">
                                    <Link href={item.link}>{language === 'ar' ? "اقرأ المزيد" : "Read More"}</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center mt-4">
                <div className="section-btn">
                    <Link href="/blog" className="btn-default">{content.moreArticles}</Link>
                </div>
            </div>
        </div>
    )
}

export default LatestNews