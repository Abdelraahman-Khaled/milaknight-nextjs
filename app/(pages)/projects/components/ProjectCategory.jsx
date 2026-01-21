"use client";
import React from 'react';
import Image from 'next/image';

const ProjectCategory = ({ category, language }) => {
    const { title, items, mediaType } = category;

    return (
        <>
            <h3 className="my-5 text-center project-h3">{title[language]}</h3>
            <div className="gallery-items-wrapper">
                <div className="gallery-items page-gallery-box new-scrolling">
                    {/* Items are repeated for smooth scrolling if needed, but original uses a wrapper */}
                    {[...items, ...items].map((item, idx) => (
                        <div key={`${item.id}-${idx}`} className="box-new-scrolling">
                            {mediaType === 'video' ? (
                                <video autoPlay muted playsInline loop preload="metadata">
                                    <source src={item.path} type="video/mp4" />
                                </video>
                            ) : (
                                <div className="photo-gallery mb-0" data-cursor-text="عرض">
                                    <a href={item.path} target="_blank" rel="noopener noreferrer">
                                        <figure className="image-anime">
                                            <div style={{ position: 'relative', width: '100%', height: '300px' }}>
                                                <Image
                                                    src={item.path}
                                                    alt={item.alt}
                                                    fill
                                                    style={{ objectFit: 'cover' }}
                                                    sizes="(max-width: 768px) 100vw, 33vw"
                                                />
                                            </div>
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
