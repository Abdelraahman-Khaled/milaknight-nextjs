"use client";
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function RevealObserver() {
    const pathname = usePathname();

    useEffect(() => {
        // الخطوة 1: تنظيف الكلاسات من العناصر القديمة
        document.querySelectorAll('.reveal-visible').forEach(el => {
            el.classList.remove('reveal-visible');
        });

        // الخطوة 2: إنشاء المراقب
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('reveal-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.3 } // أنصح بـ 0.1 بدلاً من 0 لضمان دخول جزء بسيط من العنصر في الشاشة قبل بدء الأنيميشن
        );

        // الخطوة 3: الحل السحري لـ Next.js
        // ننتظر 500 ملي ثانية حتى ينتهي Next.js من رسم الـ DOM الجديد تماماً
        const timeoutId = setTimeout(() => {
            const elements = document.querySelectorAll('.reveal');
            elements.forEach(el => observer.observe(el));
        }, 500);

        // الخطوة 4: التنظيف عند مغادرة الصفحة لتجنب تسريب الذاكرة (Memory Leak)
        return () => {
            clearTimeout(timeoutId);
            if (observer) observer.disconnect();
        };
    }, [pathname]); // سيعاد تشغيل هذا الكود كلما تغير الرابط

    return null;
}