"use client";
import { useEffect } from 'react';
import Script from 'next/script';

const LegacyScripts = () => {
    useEffect(() => {
        // Initialize legacy scripts logic after component mount and scripts load
        const initLegacyScripts = () => {
            if (typeof window === 'undefined' || !window.jQuery) return;
            const $ = window.jQuery;

            // 1. Counters
            if ($('.counter').length && $.fn.counterUp) {
                $('.counter').counterUp({ delay: 6, time: 3000 });
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
            // 4. Magnific Popup (Lightbox)
            if ($('.gallery-items').length && $.fn.magnificPopup) {
                if (!$('.gallery-items').data('magnific-init')) {
                    $('.gallery-items').data('magnific-init', true).magnificPopup({
                        delegate: 'a',
                        type: 'image',
                        closeOnContentClick: false,
                        closeBtnInside: false,
                        mainClass: 'mfp-with-zoom',
                        image: { verticalFit: true },
                        gallery: { enabled: true },
                        zoom: {
                            enabled: true,
                            duration: 300,
                            opener: function (element) {
                                return element.find('img');
                            }
                        }
                    });
                }
            }

            // 5. Popup Video
            if ($('.popup-video').length && $.fn.magnificPopup) {
                if (!$('.popup-video').data('magnific-init')) {
                    $('.popup-video').data('magnific-init', true).magnificPopup({
                        type: 'iframe',
                        mainClass: 'mfp-fade',
                        removalDelay: 160,
                        preloader: false,
                        fixedContentPos: true
                    });
                }
            }

            // 6. Swiper Sliders
            if (window.Swiper) {
                if ($('.testimonial-slider').length && !$('.testimonial-slider .swiper-initialized').length) {
                    new window.Swiper('.testimonial-slider .swiper', {
                        slidesPerView: 1,
                        speed: 1000,
                        spaceBetween: 60,
                        loop: true,
                        autoplay: { delay: 5000 },
                        pagination: { el: '.testimonial-pagination', clickable: true },
                        breakpoints: { 768: { slidesPerView: 2 }, 991: { slidesPerView: 2 } }
                    });
                }
                if ($('.agency-supports-slider').length && !$('.agency-supports-slider .swiper-initialized').length) {
                    new window.Swiper('.agency-supports-slider .swiper', {
                        slidesPerView: 2,
                        speed: 2000,
                        spaceBetween: 30,
                        loop: true,
                        autoplay: { delay: 5000 },
                        breakpoints: { 768: { slidesPerView: 4 }, 991: { slidesPerView: 6 } }
                    });
                }
            }
        };

        // Retry logic to wait for scripts to load
        const intervalId = setInterval(() => {
            if (window.jQuery && window.gsap && window.ScrollTrigger && window.jQuery.fn.counterUp && window.jQuery.fn.magnificPopup && window.Swiper) {
                initLegacyScripts();
                clearInterval(intervalId);
            }
        }, 100);

        // Cleanup
        return () => clearInterval(intervalId);
    }, []); // Run once on mount

    return (
        <>
            <Script src="/js/jquery-3.7.1.min.js" strategy="beforeInteractive" />
            <Script src="/js/jquery.waypoints.min.js" strategy="lazyOnload" />
            <Script src="/js/jquery.counterup.min.js" strategy="lazyOnload" />
            <Script src="/js/jquery.magnific-popup.min.js" strategy="lazyOnload" />
            <Script src="/js/swiper-bundle.min.js" strategy="lazyOnload" />
            <Script src="/js/gsap.min.js" strategy="lazyOnload" />
            <Script src="/js/ScrollTrigger.min.js" strategy="lazyOnload" />
            <Script src="/js/SplitText.min.js" strategy="lazyOnload" />
            <Script src="/js/jquery.slicknav.min.js" strategy="lazyOnload" />
            <Script src="/js/type.min.js" strategy="lazyOnload" />
            <Script src="/js/magiccursor.min.js" strategy="lazyOnload" />
        </>
    );
};

export default LegacyScripts;
