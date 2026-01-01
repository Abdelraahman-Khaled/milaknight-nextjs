"use client";
import React, { useEffect } from 'react';

const HomeScripts = () => {
    useEffect(() => {
        // List of scripts that need to be re-executed
        // We target the main function script and maybe others if needed.
        // Since they are in public/js, we can reload them.

        // Function to load a script
        const loadScript = (src) => {
            // Check if script already exists? 
            // Existing scripts from the HTML injection might be present in the DOM but not executed by React.
            // Or they were executed on initial load.
            // If we navigate away and back, the HTML is replaced. 
            // The dangerouslySetInnerHTML creates script tags, but HTML5 spec says they are not executed.

            // CLEANUP: Remove any existing dynamically generated SlickNav menus to prevent duplication
            // This handles React Strict Mode (run-cleanup-run) scenarios.
            const existingSlicknav = document.querySelectorAll('.slicknav_menu, .slicknav_btn');
            existingSlicknav.forEach(el => el.remove());

            // Also clear the container if SlickNav prepends there
            const responsiveMenu = document.querySelector('.responsive-menu');
            if (responsiveMenu) responsiveMenu.innerHTML = '';

            // Also clear navbar-toggle if it contains duplicate buttons as reported by user
            const navbarToggle = document.querySelector('.navbar-toggle');
            if (navbarToggle) {
                navbarToggle.innerHTML = '';
            }

            // So we need to manually create and append script tags.

            // We should probably remove existing broken script tags from the injected HTML?
            // Or just append new ones.

            const script = document.createElement('script');
            script.src = src;
            script.async = false; // Execute in order
            document.body.appendChild(script);

            // Optional: remove script after loading to avoid clutter, 
            // but keeping it might be safer for some libraries.
            return script;
        };

        // We need to load them in order.
        // Check list from index.html (step 31/35)
        // jquery is likely needed first.
        // bootstrap, swiper, slicknav, waypoints, counterup, isotope, magnific-popup, smoothscroll
        // gsap, magiccursor, splittext, scrolltrigger, ytplayer, typed
        // function.min.js (likely the main initializer)

        // Note: If they are globally loaded (e.g. jQuery added to window), we might not need to reload the library itself,
        // just the initializer. 
        // However, since we don't know for sure if they stick around or if the page relies on re-running them:

        const scriptsToLoad = [
            // Libraries might already be in window if this is a SPA nav.
            // But re-injecting them usually is fine if they check for existence, or we can check window.

            // "js/jquery-3.7.1.min.js", // Probably safe to skip if window.jQuery exists?
            // "js/bootstrap.min.js",
            // ...

            // The most critical one is likely function.min.js which initializes things.
            "js/function.min.js"
        ];

        // Better strategy: Reload the main initializer.
        // If libraries like GSAP are missing, reload them too.

        // Let's reload the key animation libraries + main function.
        const scripts = [
            "js/jquery-3.7.1.min.js",
            "js/bootstrap.min.js",
            "js/swiper-bundle.min.js",
            "js/jquery.slicknav.min.js",
            "js/jquery.waypoints.min.js",
            "js/jquery.counterup.min.js",
            "js/isotope.min.js",
            "js/jquery.magnific-popup.min.js",
            "js/SmoothScroll.min.js",
            "js/gsap.min.js",
            "js/magiccursor.min.js",
            "js/SplitText.min.js",
            "js/ScrollTrigger.min.js",
            "js/jquery.mb.YTPlayer.min.js",
            "js/typed.min.js",
            "js/function.min.js"
        ];

        // Remove existing scripts with these src to ensure fresh reload?
        // Or just append.

        const loadedScripts = [];

        const loadNext = (index) => {
            if (index >= scripts.length) return;
            const src = scripts[index];

            // Scripts that declare global 'const' or 'let' variables cannot be re-executed.
            // We must skip reloading them if they have already run.
            // 'magiccursor.min.js' declares 'Cursor'
            // 'jquery.mb.YTPlayer.min.js' declares 'YTPRndSuffix'
            const singleRunScripts = [
                "js/magiccursor.min.js",
                "js/jquery.mb.YTPlayer.min.js"
            ];

            if (singleRunScripts.includes(src)) {
                // Check if already loaded by checking if script tag exists (or global var, but script tag is easier proxy)
                // Since we normally remove them, if we found one we might have removed it? 
                // Wait, strict mode unmounts then remounts. 
                // If we want to persist them, we should NOT remove them in the cleanup phase?
                // But the cleanup phase removed *all* by matching src? 
                // Ah, I need to adjust the cleanup logic too? NO, I need to check if it WAS loaded.

                // Better approach: Check if the global variable exists?
                // For MagicCursor: maybe window.MagicCursor or just trust the script tag check.
                // But wait, if I reload the page, clean slate.
                // If React Strict Mode unmounts, global scope persists.

                // So, if global scope has these vars, SKIP loading.
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

            // Remove old instance if any (to force re-execution) for OTHER scripts
            // For single-run scripts, we shouldn't have reached here if we skipped.
            // But if we didn't skip (first run), we proceed. 
            // If we re-run, we must remove old script tags generally to avoid duplicates, 
            // BUT for 'const' scripts, removing the tag doesn't clear the scope.
            // So checking `document.querySelectorAll` above is tricky if we remove them.

            // However, typically we only remove if we INTEND to reload.
            // So:
            const oldScripts = document.querySelectorAll(`script[src="${src}"]`);
            if (oldScripts.length > 0) {
                if (singleRunScripts.includes(src)) {
                    // It exists, so it ran. Skip.
                    console.log(`Skipping ${src} because it's already in the DOM.`);
                    loadNext(index + 1);
                    return;
                }
                // For others, remove to re-run
                oldScripts.forEach(s => s.remove());
            }

            const script = document.createElement('script');
            script.src = src;
            script.async = false;
            script.onload = () => loadNext(index + 1);
            document.body.appendChild(script);
            loadedScripts.push(script);
        };

        // Start loading
        loadNext(0);

        // Force play videos that might have paused or not started due to DOM injection
        const playVideos = () => {
            const videos = document.querySelectorAll('video');
            videos.forEach(video => {
                if (video.paused) {
                    video.play().catch(e => console.log("Video play failed:", e));
                }
            });
        };

        // Check periodically or after scripts
        setTimeout(playVideos, 100);
        setTimeout(playVideos, 1000);

        return () => {
            // Cleanup if needed?
            // Removing scripts doesn't undo their effects (event listeners, globals).
            // But we can try to clean up if we want.
            // For now, let's just leave them or remove the elements.
            loadedScripts.forEach(s => {
                if (s.parentNode) s.parentNode.removeChild(s);
            });
        };
    }, []);

    return null; // This component handles side effects only
};

export default HomeScripts;
