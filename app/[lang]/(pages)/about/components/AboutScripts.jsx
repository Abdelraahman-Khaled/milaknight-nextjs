"use client";
import { useEffect, useRef, useContext } from 'react';
import { LanguageContext } from '@/app/context/LanguageContext';

const AboutScripts = () => {
    const { language } = useContext(LanguageContext);
    const initializedRef = useRef(false);

    useEffect(() => {
        // Initialize legacy scripts logic after component mount and scripts load
        const initLegacyScripts = () => {
            if (typeof window === 'undefined' || !window.jQuery) return;
            const $ = window.jQuery;

            // 1. Counters
            if ($('.counter').length && $.fn.counterUp) {
                $('.counter').each(function() {
                    if (!$(this).hasClass('counter-initialized')) {
                        $(this).addClass('counter-initialized').counterUp({ delay: 10, time: 1000 });
                    }
                });
            }

            // 2. GSAP Reveal
            if ($('.reveal').length && window.gsap && window.ScrollTrigger) {
                const gsap = window.gsap;
                const ScrollTrigger = window.ScrollTrigger;
                gsap.registerPlugin(ScrollTrigger);

                const revealContainers = document.querySelectorAll(".reveal");
                revealContainers.forEach((container) => {
                    if (container.classList.contains('reveal-initialized')) return;
                    container.classList.add('reveal-initialized');
                    let image = container.querySelector("img");
                    let tl = gsap.timeline({ scrollTrigger: { trigger: container, toggleActions: "play none none none" } });
                    tl.set(container, { autoAlpha: 1 });
                    tl.from(container, 1, { xPercent: 0, ease: "power2.out" });
                    tl.from(image, 1, { xPercent: 100, scale: 1, delay: -1, ease: "power2.out" });
                });
            }

            // 3. Why Choose Us Hover
            if ($('.why-choose-content').length) {
                const element = $('.why-choose-content');
                const items = element.find('.why-choose-item');
                if (items.length) {
                    items.off('mouseenter mouseleave').on({
                        mouseenter: function () {
                            if ($(this).hasClass('active')) return;
                            items.removeClass('active');
                            $(this).addClass('active');
                        },
                        mouseleave: function () { }
                    });
                }
            }
        };

        // Retry logic to wait for scripts to load
        const intervalId = setInterval(() => {
            if (window.jQuery && window.gsap && window.ScrollTrigger && window.jQuery.fn.counterUp) {
                initLegacyScripts();
                clearInterval(intervalId);
            }
        }, 100);

        // Cleanup
        return () => clearInterval(intervalId);
    }, [language]); // Re-run if language changes (DOM updates)

    return null; // This component handles side effects only
};

export default AboutScripts;
