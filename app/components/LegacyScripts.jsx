"use client";
import React, { useEffect } from 'react';

const LegacyScripts = () => {
    useEffect(() => {
        // List of scripts that need to be re-executed
        // We target the main function script and maybe others if needed.
        // Since they are in public/js, we can reload them.

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
            "/js/bootstrap.min.js",
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
            script.onload = () => loadNext(index + 1);
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
                if (s.parentNode) s.parentNode.removeChild(s);
            });
        };
    }, []);

    return null;
};

export default LegacyScripts;
