"use client";
import React from 'react';
import Image from 'next/image';

const ProjectCategory = ({ category, language }) => {
    const { title, items, mediaType, objectFit } = category;
    const isArabic = language === 'ar';

    return (
        <>
            <h3 className="my-5 text-center project-h3">{title[language]}</h3>
            <div className="gallery-items-wrapper" id={category.id}>
                <div className="gallery-items page-gallery-box new-scrolling">
                    {/* Items are repeated for smooth scrolling if needed, but original uses a wrapper */}
                    {[...items, ...items].map((item, idx) => (
                        <div key={`${item.id}-${idx}`} className="box-new-scrolling">
                            {mediaType === 'video' ? (
                                <video autoPlay muted playsInline loop preload="metadata">
                                    <source src={item.path} type="video/mp4" />
                                </video>
                            ) : (
                                <div className="photo-gallery mb-0">
                                    <a href={item.path} target="_blank" rel="noopener noreferrer" data-cursor-text={isArabic ? 'عرض' : 'View'}>
                                        <figure className="image-anime">
                                            <img
                                                src={item.path}
                                                alt={item.alt}
                                                style={{
                                                    width: '100%',
                                                    height: 'auto', // Let CSS or natural size control it
                                                    borderRadius: '20px',
                                                    objectFit: objectFit || 'cover' // Effective only if height is constrained by global CSS
                                                }}
                                            />
                                        </figure>
                                    </a>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ProjectCategory;
