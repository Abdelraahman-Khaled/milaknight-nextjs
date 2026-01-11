'use client';
import HeaderDescription from '@/app/components/ui/HeaderDescription'
import React, { useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { LanguageContext } from '@/app/context/LanguageContext'
import { latestNewsData } from './data'

const LatestNews = () => {
    const { language } = useContext(LanguageContext);
    const content = latestNewsData[language];

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
                {content.items.map((item, index) => (
                    <div key={index} className="col-lg-4 col-md-6">
                        <div className="post-item">
                            <div className="post-featured-image">
                                <figure>
                                    <Link href={item.link} className="image-anime" data-cursor-text={content.readArticle}>
                                        <Image
                                            width={403}
                                            height={227}
                                            src={item.image}
                                            alt={item.alt}
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
                                    <Link href={item.link}>{content.readMore}</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center mt-4">
                <div className="section-btn">
                    <Link href="blog" className="btn-default">{content.moreArticles}</Link>
                </div>
            </div>
        </div>
    )
}

export default LatestNews