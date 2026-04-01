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

        // Defer heavy script re-injection to idle time so navigation is NOT blocked
        // requestIdleCallback runs after the browser finishes current tasks (paint, layout)
        const reInjectScript = () => {
            // Call the globally exposed legacy functions initializer
            if (window.initMilaknightFunctions && window.jQuery) {
                window.initMilaknightFunctions(window.jQuery);
            }

            initializeSlickNav();

            // Resume any paused videos
            document.querySelectorAll('video').forEach(video => {
                if (video.paused) video.play().catch(() => {});
            });
        };

        // Use requestIdleCallback if available, fallback to setTimeout
        if (typeof window.requestIdleCallback === 'function') {
            window.requestIdleCallback(reInjectScript, { timeout: 2000 });
        } else {
            setTimeout(reInjectScript, 100);
        }

        return () => {};
    }, [pathname]);

    return null;
};

export default LegacyScripts;
