'use client';
import HeaderDescription from '@/app/components/ui/HeaderDescription'
import React, { useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { LanguageContext } from '@/app/context/LanguageContext'
import { bestWorksData } from './data'

const BestWorks = () => {
    const { language } = useContext(LanguageContext);
    const content = bestWorksData[language];
    const images = bestWorksData.images;

    // Combine images to match the double repetition in the original code
    const allImages = [...images, ...images];

    return (
        <div className='container our-portfolio'>
            <HeaderDescription
                title={content.title}
                subtitle={content.subtitle}
                span={content.span}
                desc={content.desc}
            />
            <div className="gallery-items new-scrolling page-gallery-box">
                {allImages.map((src, index) => (
                    <div key={index} className="box-new-scrolling">
                        <div className="photo-gallery">
                            <a href={src} data-cursor-text={content.viewText}>
                                <figure className="image-anime">
                                    <Image width="250" height="333" alt={`MilaKnight Project - ${index + 1}`} src={src} />
                                </figure>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center mt-4">
                <div className="section-btn">
                    <Link href="/projects" className="btn-default">{content.moreWorks}</Link>
                </div>
            </div>
        </div>
    )
}

export default BestWorks