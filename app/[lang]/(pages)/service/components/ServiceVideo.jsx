"use client";
import React from 'react';

const ServiceVideo = ({ videoId }) => {
    if (!videoId) return null;

    return (
        <div className="service-video-wrapper mb-4" data-cursor-hidden>
            <div className="ratio ratio-16x9">
                <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&rel=0&modestbranding=1&showinfo=0&enablejsapi=1`}
                    title="Service Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-100 h-100"
                ></iframe>
            </div>
            <style jsx>{`
                .service-video-wrapper {
                    width: 100%;
                    border-radius: 12px;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
};

export default ServiceVideo;
