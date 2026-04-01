"use client";
import { useEffect, useContext } from 'react';
import { LanguageContext } from '@/app/context/LanguageContext';

const AboutScripts = () => {
    const { language } = useContext(LanguageContext);

    useEffect(() => {
        // Counters
        const initCounters = () => {
            if (typeof window === 'undefined' || !window.jQuery) return;
            const $ = window.jQuery;
            if ($('.counter').length && $.fn.counterUp) {
                $('.counter').each(function () {
                    if (!$(this).hasClass('counter-initialized')) {
                        $(this).addClass('counter-initialized').counterUp({ delay: 10, time: 1000 });
                    }
                });
            }
        };

        const intervalId = setInterval(() => {
            if (window.jQuery && window.jQuery.fn.counterUp) {
                initCounters();
                clearInterval(intervalId);
            }
        }, 100);

        // Why Choose Us Hover
        const whyChooseItems = document.querySelectorAll('.why-choose-item');
        whyChooseItems.forEach((item) => {
            item.addEventListener('mouseenter', () => {
                whyChooseItems.forEach((i) => i.classList.remove('active'));
                item.classList.add('active');
            });
        });

        return () => clearInterval(intervalId);
    }, [language]);

    return null;
};

export default AboutScripts;

