"use client";
import React, { useState, useEffect, useRef } from 'react';

const LazyVideo = ({ src, ...props }) => {
    const videoRef = useRef(null);
    const [isIntersecting, setIsIntersecting] = useState(false);

    useEffect(() => {
        let observer;

        if (window.IntersectionObserver) {
            observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setIsIntersecting(true);
                        observer.disconnect();
                    }
                },
                { rootMargin: '200px' }
            );

            if (videoRef.current) {
                observer.observe(videoRef.current);
            }
        } else {
            // Fallback
            setIsIntersecting(true);
        }

        return () => {
            if (observer) observer.disconnect();
        };
    }, []);

    useEffect(() => {
        if (isIntersecting && videoRef.current && props.autoPlay) {
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.warn("Autoplay was prevented:", error);
                });
            }
        }
    }, [isIntersecting, props.autoPlay]);

    return (
        <video 
            ref={videoRef} 
            {...props} 
            preload={isIntersecting ? "metadata" : "none"}
        >
            {isIntersecting && <source src={src} type="video/mp4" />}
        </video>
    );
};

export default LazyVideo;
