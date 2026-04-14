"use client";
import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const LegacyScripts = () => {
    const pathname = usePathname();

    useEffect(() => {
        // Remove 'initialized' classes to allow re-initialization on route change
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
                        prependTo: '.navbar-toggle',
                        closeOnClick: true,
                        allowParentLinks: true
                    });
                }
            }
        };

        const reInjectScript = () => {
            if (window.initMilaknightFunctions && window.jQuery) {
                window.initMilaknightFunctions(window.jQuery);
            }
            initializeSlickNav();

            // Resume any paused videos
            document.querySelectorAll('video').forEach(video => {
                if (video.paused) video.play().catch(() => {});
            });
        };

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
