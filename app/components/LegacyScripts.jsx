"use client";
import React, { useEffect, useContext } from 'react';

import { usePathname } from 'next/navigation';
import { LanguageContext } from '../context/LanguageContext';

const LegacyScripts = () => {
    const pathname = usePathname();
    const { language } = useContext(LanguageContext);

    useEffect(() => {
        // List of scripts that need to be re-executed
        // We target the main function script and maybe others if needed.
        // Since they are in public/js, we can reload them.

        // CLEANUP: Kill any active ScrollTrigger instances
        if (window.ScrollTrigger) {
            window.ScrollTrigger.getAll().forEach(st => st.kill());
        }

        // Remove 'initialized' classes to allow re-initialization
        const initializedElements = document.querySelectorAll('[class*="-initialized"]');
        initializedElements.forEach(el => {
            const classes = el.className.split(' ').filter(c => !c.endsWith('-initialized'));
            el.className = classes.join(' ');
        });

        // Function to load a script
        const loadScript = (src) => {
            // CLEANUP: Remove any existing dynamically generated SlickNav menus to prevent duplication
            const existingSlicknav = document.querySelectorAll('.slicknav_menu, .slicknav_btn');
            existingSlicknav.forEach(el => el.remove());

            const responsiveMenu = document.querySelector('.responsive-menu');
            if (responsiveMenu) responsiveMenu.innerHTML = '';

            const navbarToggle = document.querySelector('.navbar-toggle');
            if (navbarToggle) {
                navbarToggle.innerHTML = '';
            }

            const script = document.createElement('script');
            script.src = src;
            script.async = false;
            document.body.appendChild(script);

            return script;
        };

        const scripts = [
            "/js/jquery-3.7.1.min.js",
            "/js/swiper-bundle.min.js",
            "/js/jquery.slicknav.min.js",
            "/js/jquery.waypoints.min.js",
            "/js/jquery.counterup.min.js",
            "/js/isotope.min.js",
            "/js/jquery.magnific-popup.min.js",
            "/js/SmoothScroll.min.js",
            "/js/gsap.min.js",
            // "/js/magiccursor.min.js", // Disabled in favor of React Cursor component
            "/js/SplitText.min.js",
            "/js/ScrollTrigger.min.js",
            "/js/jquery.mb.YTPlayer.min.js",
            "/js/typed.min.js",
            "/js/function.min.js"
        ];

        const loadedScripts = [];

        const loadNext = (index) => {
            if (index >= scripts.length) return;
            const src = scripts[index];

            const singleRunScripts = [
                "/js/magiccursor.min.js",
                "/js/jquery.mb.YTPlayer.min.js"
            ];

            if (singleRunScripts.includes(src)) {
                let skip = false;
                if (src.includes("magiccursor.min.js") && (window.Cursor || document.querySelector(`script[src="${src}"]`))) {
                    skip = true;
                }
                if (src.includes("jquery.mb.YTPlayer.min.js") && (typeof window.YTPRndSuffix !== 'undefined' || document.querySelector(`script[src="${src}"]`))) {
                    skip = true;
                }

                if (skip) {
                    loadNext(index + 1);
                    return;
                }
            }

            const isCoreScript = (src) => {
                if (src.includes("jquery-3.7.1.min.js") && window.jQuery) return true;
                if (src.includes("swiper-bundle.min.js") && window.Swiper) return true;
                if (src.includes("jquery.slicknav.min.js") && window.jQuery && window.jQuery.fn.slicknav) return true;
                if (src.includes("gsap.min.js") && window.gsap) return true;
                return false;
            };

            if (isCoreScript(src)) {
                loadNext(index + 1);
                return;
            }

            const oldScripts = document.querySelectorAll(`script[src="${src}"]`);
            if (oldScripts.length > 0) {
                if (singleRunScripts.includes(src)) {
                    loadNext(index + 1);
                    return;
                }
                oldScripts.forEach(s => s.remove());
            }

            const script = document.createElement('script');
            script.src = src;
            script.async = false;
            script.onload = () => {
                // Early SlickNav initialization for faster mobile menu display
                if (src.includes('jquery.slicknav.min.js')) {
                    setTimeout(() => {
                        if (window.jQuery && window.jQuery.fn.slicknav) {
                            const menu = window.jQuery('#menu');
                            if (menu.length && !window.jQuery('.slicknav_menu').length) {
                                menu.slicknav({ label: '', prependTo: '.responsive-menu' });
                            }
                        }
                    }, 50);
                }
                loadNext(index + 1);
            };
            document.body.appendChild(script);
            loadedScripts.push(script);
        };

        loadNext(0);

        const playVideos = () => {
            const videos = document.querySelectorAll('video');
            videos.forEach(video => {
                if (video.paused) {
                    video.play().catch(e => console.log("Video play failed:", e));
                }
            });
        };

        setTimeout(playVideos, 100);
        setTimeout(playVideos, 1000);

        return () => {
            loadedScripts.forEach(s => {
                const src = s.getAttribute('src');
                const singleRunScripts = [
                    "/js/magiccursor.min.js",
                    "/js/jquery.mb.YTPlayer.min.js"
                ];

                // Do not remove single-run scripts to prevent re-declaration errors
                if (singleRunScripts.some(single => src.includes(single))) {
                    return;
                }

                if (s.parentNode) s.parentNode.removeChild(s);
            });
        };
    }, [pathname]); // Only reload on route change, NOT language change (Navbar handles SlickNav)

    return null;
};

export default LegacyScripts;
