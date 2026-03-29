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

        const loadNext = (index) => {
            const scripts = [
                "/js/jquery.slicknav.min.js",
                "/js/jquery.waypoints.min.js",
                "/js/jquery.counterup.min.js",
                "/js/isotope.min.js",
                "/js/jquery.magnific-popup.min.js",
                "/js/SmoothScroll.min.js",
                "/js/SplitText.min.js",
                "/js/ScrollTrigger.min.js",
                "/js/jquery.mb.YTPlayer.min.js",
                "/js/typed.min.js",
                "/js/function.min.js"
            ];

            if (index >= scripts.length) return;
            const src = scripts[index];

            const oldScripts = document.querySelectorAll(`script[src="${src}"]`);
            oldScripts.forEach(s => s.remove());

            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.onload = () => {
                if (src.includes('jquery.slicknav.min.js')) {
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
                }
                loadNext(index + 1);
            };
            document.body.appendChild(script);
        };

        loadNext(0);

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
