"use client";
import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const LegacyScripts = () => {
    const pathname = usePathname();

    useEffect(() => {
        // CLEANUP: Active ScrollTrigger instances
        if (window.ScrollTrigger) {
            window.ScrollTrigger.getAll().forEach(st => st.kill());
        }

        // Remove 'initialized' classes to allow re-initialization
        const initializedElements = document.querySelectorAll('[class*="-initialized"]');
        initializedElements.forEach(el => {
            const classes = el.className.split(' ').filter(c => !c.endsWith('-initialized'));
            el.className = classes.join(' ');
        });

        // Re-initialize SlickNav if necessary
        const initializeSlickNav = () => {
            if (window.jQuery && window.jQuery.fn.slicknav) {
                const menu = window.jQuery('#menu');
                if (menu.length && !window.jQuery('.slicknav_menu').length) {
                    menu.slicknav({
                        label: '',
                        prependTo: '.responsive-menu',
                        closeOnClick: true,
                        allowParentLinks: true
                    });
                }
            }
        };

        // ScrollTrigger Refresh
        if (window.ScrollTrigger) {
            window.ScrollTrigger.refresh();
        }

        // Re-inject only the main function.js script to trigger animations/initialization on the new page
        // This is needed because function.js is an IIFE and needs to re-run for neue content
        const scriptsToReRun = ["/js/function.min.js"];
        scriptsToReRun.forEach(src => {
            const oldScript = document.querySelector(`script[src="${src}"]`);
            if (oldScript) oldScript.remove();
            
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            document.body.appendChild(script);
        });

        initializeSlickNav();

        const playVideos = () => {
            document.querySelectorAll('video').forEach(video => {
                if (video.paused) video.play().catch(() => {});
            });
        };

        setTimeout(playVideos, 100);
        return () => {};
    }, [pathname]);

    return null;
};

export default LegacyScripts;
