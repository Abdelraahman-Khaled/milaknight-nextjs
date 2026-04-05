'use client';
import HeaderDescription from '@/app/components/ui/HeaderDescription';
import React, { useContext, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LanguageContext } from '@/app/context/LanguageContext';
import { bestWorksData } from './data';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const BestWorks = () => {
    const { language } = useContext(LanguageContext);
    const content = bestWorksData[language];
    const images = bestWorksData.images;

    // Control Lightbox state
    const [index, setIndex] = useState(-1);

    // Prepare slides for Lightbox
    const slides = images.map(src => ({ src, alt: "MilaKnight Project" }));

    // Combine images to match the double repetition in the original code for scrolling
    const allImages = [...images, ...images];

    const openLightbox = (e, realIndex) => {
        e.preventDefault();
        setIndex(realIndex);
    };

    return (
        <div className='container our-portfolio'>
            <HeaderDescription
                title={content.title}
                subtitle={content.subtitle}
                span={content.span}
                desc={content.desc}
            />
            <div className="gallery-items gallery-items-home new-scrolling page-gallery-box">
                {allImages.map((src, idx) => {
                    const realIndex = idx % images.length;
                    return (
                        <div key={idx} className="box-new-scrolling">
                            <div className="photo-gallery cursor-pointer" onClick={(e) => openLightbox(e, realIndex)}>
                                <a href={src} onClick={(e) => e.preventDefault()} data-cursor-text={content.viewText}>
                                    <figure className="image-anime">
                                        <Image width="250" height="333" alt={`MilaKnight Project - ${realIndex + 1}`} src={src} />
                                    </figure>
                                </a>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="text-center mt-4">
                <div className="section-btn">
                    <Link href={`/${language}/projects`} className="btn-default">{content.moreWorks}</Link>
                </div>
            </div>

            <Lightbox
                open={index >= 0}
                index={index >= 0 ? index : 0}
                close={() => setIndex(-1)}
                slides={slides}
                controller={{ closeOnBackdropClick: true }}
            />
        </div>
    )
}

export default BestWorks;