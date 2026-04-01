"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/styles.css";

const ProjectCategory = ({ category, language }) => {
    const { title, items, mediaType, objectFit } = category;
    const isArabic = language === 'ar';

    // State to control Lightbox visibility and active index
    const [index, setIndex] = useState(-1);

    // Format items for the Lightbox according to its required structure
    const slides = items.map(item => {
        if (mediaType === 'video') {
            return {
                type: "video",
                width: 1280,
                height: 720,
                autoPlay: true,
                sources: [
                    {
                        src: item.path,
                        type: "video/mp4",
                    }
                ]
            };
        }
        return { src: item.path, alt: item.alt || category.title['en'] };
    });

    const openLightbox = (e, realIndex) => {
        e.preventDefault();
        setIndex(realIndex);
    };

    return (
        <>
            <h3 className="my-5 text-center project-h3">{title[language]}</h3>
            <div className="gallery-items-wrapper" id={category.id}>
                <div className="gallery-items page-gallery-box new-scrolling">
                    {/* Items are repeated for smooth scrolling if needed, but original uses a wrapper */}
                    {[...items, ...items].map((item, idx) => {
                        // Determine the original, unique index to tell the Lightbox which slide to open
                        const realIndex = idx % items.length;

                        return (
                            <div key={`${item.id}-${idx}`} className="box-new-scrolling">
                                {mediaType === 'video' ? (
                                    <div 
                                        className="photo-gallery mb-0 cursor-pointer" 
                                        onClick={(e) => openLightbox(e, realIndex)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <a href={item.path} onClick={(e) => e.preventDefault()} data-cursor-text={isArabic ? 'عرض' : 'View'}>
                                            <figure className="image-anime">
                                                <video autoPlay muted playsInline loop preload="metadata" style={{ pointerEvents: 'none', width: '100%', borderRadius: '20px' }}>
                                                    <source src={item.path} type="video/mp4" />
                                                </video>
                                            </figure>
                                        </a>
                                    </div>
                                ) : (
                                    <div className="photo-gallery mb-0 cursor-pointer" onClick={(e) => openLightbox(e, realIndex)}>
                                        <a href={item.path} onClick={(e) => e.preventDefault()} data-cursor-text={isArabic ? 'عرض' : 'View'}>
                                            <figure className="image-anime">
                                                <Image
                                                    src={item.path}
                                                    alt={item.alt || ""}
                                                    width={400}
                                                    height={300}
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    style={{
                                                        width: '100%',
                                                        height: 'auto',
                                                        borderRadius: '20px',
                                                        objectFit: objectFit || 'cover'
                                                    }}
                                                />
                                            </figure>
                                        </a>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <Lightbox
                open={index >= 0}
                index={index >= 0 ? index : 0}
                close={() => setIndex(-1)}
                slides={slides}
                plugins={[Video]}
                controller={{ closeOnBackdropClick: true }}
            />
        </>
    );
};

export default ProjectCategory;
