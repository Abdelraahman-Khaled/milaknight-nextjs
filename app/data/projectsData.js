export const projectsTranslations = {
    ar: {
        pageTitle: 'أعمالنا',
        home: 'الرئيسية',
        projects: 'أعمالنا',
        viewGallery: 'معرض أعمال الشركة',
        view: 'عرض',
        visitWebsite: 'زيارة الموقع'
    },
    en: {
        pageTitle: 'Projects',
        home: 'Home',
        projects: 'Projects',
        viewGallery: 'Company Profile',
        view: 'View',
        visitWebsite: 'Visit Website'
    }
};

export const projectsSEO = {
    ar: {
        title: 'أعمالنا - Milaknight',
        description: 'أعمالنا في التسويق الرقمي تصميم مواقع إعلانات مدفوعة استراتيجيات سيو تصميم جرافيكي تسويق عبر منصات التواصل تطوير الهوية البصرية حلول مبتكرة لنجاح عملائنا في الأسواق',
        keywords: 'تسويق رقمي, تصميم مواقع, تصميم جرافيكي, سيو, هوية بصرية'
    },
    en: {
        title: 'Projects - Milaknight',
        description: 'Our work in digital marketing Web design Paid ads SEO strategies Graphic design Social media marketing Visual identity development Innovative solutions for client success',
        keywords: 'digital marketing, web design, graphic design, SEO, visual identity'
    }
};


export const projectCategories = [
    {
        id: 'graphic-design',
        title: { ar: 'التصميم الجرافيكي', en: 'Graphic design' },
        mediaType: 'image',
        items: Array.from({ length: 27 }, (_, i) => ({
            id: i + 1,
            path: `/images/projects/Graphic design/${i + 1}.webp`,
            alt: 'Milaknight - ميلانايت'
        }))
    },
    {
        id: 'brand-identity',
        title: { ar: 'هوية العلامة التجارية', en: 'Brand identity' },
        mediaType: 'image',
        items: [
            ...[2, 3, 4, 5, 6].map(id => ({
                id: `logo-${id}`,
                path: `/images/projects/Brand-identity/Logos/${id.toString().padStart(2, '0')}.webp`,
                alt: 'Milaknight - ميلانايت'
            })),
            ...Array.from({ length: 4 }, (_, i) => ({
                id: `card-${i + 1}`,
                path: `/images/projects/Brand-identity/Business-Cards/${i + 1}.webp`,
                alt: 'Milaknight - ميلانايت'
            })),
            ...Array.from({ length: 4 }, (_, i) => ({
                id: `profile-${i + 1}`,
                path: `/images/projects/Brand-identity/Company-Profiles/${i + 1}.webp`,
                alt: 'Milaknight - ميلانايت'
            }))
        ]
    },
    {
        id: 'websites',
        title: { ar: 'مواقع الويب', en: 'Websites' },
        mediaType: 'video',
        items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 12].map(id => ({
            id,
            path: `/images/projects/Websites/${id}.mp4`,
            alt: 'Milaknight - ميلانايت'
        }))
    },
    {
        id: 'motion-graphics',
        title: { ar: 'الرسوم المتحركة', en: 'Motion Graphics' },
        mediaType: 'video',
        items: Array.from({ length: 8 }, (_, i) => ({
            id: i + 1,
            path: `/images/projects/videos/Motion-Graphics/Motion-Graphics-${(i + 1).toString().padStart(2, '0')}.mp4`,
            alt: 'Milaknight - ميلانايت'
        }))
    },
    {
        id: 'stickers',
        title: { ar: 'ملصقات', en: 'Stickers' },
        mediaType: 'image',
        items: Array.from({ length: 8 }, (_, i) => ({
            id: i + 1,
            path: `/images/projects/Stickers/${i + 1}.webp`,
            alt: 'Milaknight - ميلانايت'
        }))
    },
    {
        id: 'email-marketing',
        title: { ar: 'التسويق عبر البريد الإلكتروني', en: 'Email Marketing' },
        mediaType: 'image',
        objectFit: 'contain',
        items: Array.from({ length: 7 }, (_, i) => ({
            id: i + 1,
            path: `/images/projects/Email Marketing/${i + 1}.webp`,
            alt: 'Milaknight - ميلانايت'
        }))
    },
    {
        id: 'video-production',
        title: { ar: 'إنتاج الفيديوهات', en: 'Video Production' },
        mediaType: 'video',
        items: Array.from({ length: 8 }, (_, i) => ({
            id: i + 1,
            path: `/images/projects/Video Production/${i + 1}.mp4`,
            alt: 'Milaknight - ميلانايت'
        }))
    },
    {
        id: 'event-management',
        title: { ar: 'إدارة الفعاليات', en: 'Event Management' },
        mediaType: 'image',
        items: [
            ...Array.from({ length: 10 }, (_, i) => ({
                id: `brochure-${i + 1}`,
                path: `/images/projects/Event Management/Brochures/${i + 1}.webp`,
                alt: 'Milaknight - ميلانايت'
            })),
            ...Array.from({ length: 3 }, (_, i) => ({
                id: `invitation-${i + 1}`,
                path: `/images/projects/Event Management/Invitations/${i + 1}.webp`,
                alt: 'Milaknight - ميلانايت'
            }))
        ]
    },
    {
        id: 'photoshoots',
        title: { ar: 'جلسات التصوير', en: 'Photoshoots' },
        mediaType: 'image',
        objectFit: 'contain',
        items: Array.from({ length: 8 }, (_, i) => ({
            id: i + 1,
            path: `/images/projects/Photoshoots/${i + 1}.webp`,
            alt: 'Milaknight - ميلانايت'
        }))
    }
];
