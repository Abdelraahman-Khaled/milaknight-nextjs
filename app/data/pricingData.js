// Pricing page translations
export const pricingTranslations = {
    ar: {
        pageTitle: 'أسعارنا',
        home: 'الرئيسية',
        showMore: 'اقرأ المزيد',
        showLess: 'عرض أقل',
        getQuote: 'احصل على عرض أسعار مجاني',
        availableServices: 'الخدمات المتاحة',
        yourName: 'اسمك',
        phoneNumber: 'رقم الهاتف',
        or: 'أو',
        email: 'البريد الإلكتروني',
        sendMessage: 'إرسال الرسالة'
    },
    en: {
        pageTitle: 'Pricing',
        home: 'Home',
        showMore: 'Read More',
        showLess: 'Show Less',
        getQuote: 'Get a Free Quote',
        availableServices: 'Available Services',
        yourName: 'Your Name',
        phoneNumber: 'Phone Number',
        or: 'Or',
        email: 'Email',
        sendMessage: 'Send Message'
    }
};

// Pricing packages data
export const pricingPackages = [
    {
        id: 'starter',
        name: { ar: 'باقة الانطلاقة', en: 'Starter Package' },
        featured: false,
        features: {
            ar: [
                'خطة محتوى شهرية مخصصة',
                'عدد الحسابات المدارة (2)',
                'تحسين SEO (أساسي: تحليل أولي + اختيار الكلمات المفتاحية)',
                'عدد التصاميم (حتى 8 تصاميم)',
                'نشر وجدولة',
                'تقرير واحد عن اداء وسائل التواصل الإجتماعي',
                'إعداد حملة إعلانية ممولة واحدة شهرياً',
                'مناسبة للشركات الناشئة والبدايات الأولى'
            ],
            en: [
                'Custom monthly content plan',
                'Number of accounts managed (2)',
                'SEO (basic: initial analysis + keyword selection)',
                'Number of designs (up to 8 designs)',
                'Publishing and scheduling',
                'One social media performance report',
                'Set up one paid advertising campaign per month',
                'Suitable for startups and early start-ups'
            ]
        }
    },
    {
        id: 'growth',
        name: { ar: 'باقة النمو', en: 'Growth Package' },
        featured: false,
        features: {
            ar: [
                'خطة تسويقية استراتيجية',
                'إدارة 4 حسابات على السوشيال ميديا',
                'تحسين SEO الأساسي',
                'عدد التصاميم (حتى 15 تصميمًا)',
                'كتابة محتوى احترافي شامل (منشورات حتى عدد 15, مقالات حتى عدد 2)',
                'تقريرين عن اداء وسائل التواصل الإجتماعي',
                'تصميم حتى 3 فيديوهات',
                'مصممة للأعمال التي تتطلع للتوسع والنمو'
            ],
            en: [
                'Strategic Marketing Plan',
                'Manage 4 social media accounts',
                'Basic SEO optimization',
                'Number of designs (up to 15 designs)',
                'Write comprehensive professional content (posts up to 15, articles up to 2)',
                '2 reports on social media performance',
                'Design up to 3 videos',
                'Designed for businesses looking to expand and grow'
            ]
        }
    },
    {
        id: 'excellence',
        name: { ar: 'باقة التميز', en: 'Excellence Package' },
        featured: true,
        badge: { ar: 'مميز', en: 'Featured' },
        features: {
            ar: [
                'خطة تسويقية شاملة ومفصلة مع تحليل السوق والمنافسين',
                'إدارة عدد غير محدود من الحسابات',
                'تحسين SEO (متقدم: تحليل شامل وتحسين المحتوى)',
                'عدد التصاميم (حتى 20 تصميمًا)',
                'كتابة محتوى احترافي شامل (منشورات حتى عدد 20 , مقالات حتى عدد 3)',
                'تقرير أسبوعي عن اداء وسائل التواصل الإجتماعي',
                'تصميم حتى 5 فيديوهات',
                'مناسبة للأعمال التى تحتاج إلى دعم متكامل ومخصص'
            ],
            en: [
                'Comprehensive and detailed marketing plan with market and competitor analysis',
                'Manage unlimited number of accounts',
                'SEO (advanced: comprehensive analysis and content optimization)',
                'Number of designs (up to 20 designs)',
                'Writing comprehensive professional content (posts up to 20, articles up to 3)',
                'Weekly report on social media performance',
                'Design up to 5 videos',
                'Suitable for businesses that need integrated and dedicated support'
            ]
        }
    }
];

// Custom services data
export const customServices = {
    title: { ar: 'باقة مخصصة', en: 'Custom Package' },
    subtitle: { ar: 'خدمات اختيارية حسب الطلب:', en: 'Optional services on demand:' },
    description: {
        ar: 'تتيح هذه الباقة للعملاء تصميم خطة تسويقية مرنة ومخصصة تناسب احتياجاتهم الفريدة، من خلال اختيار خدمات التسويق الالكتروني المطلوبة وتحديد الكميات المناسبة لهم، مما يضمن تحقيق أفضل النتائج بفعالية مذهلة.',
        en: 'This package allows clients to design a flexible, customized marketing plan that suits their unique needs by selecting the required e-marketing services and determining the appropriate quantities, ensuring the best results with amazing effectiveness.'
    },
    services: {
        ar: [
            'تصميم مواقع الكترونية',
            'بناء متاجر الكترونية',
            'إدارة متاجر الكترونية',
            'التسويق عبر البريد الالكتروني',
            'كتابة مقالات',
            'التسويق عبر الواتس اب',
            'صناعة محتوى مرئي',
            'تصوير فوتوغرافي',
            'تصميم اكشاك للمعارض',
            'تحسين SEO (اختياري: أساسي أو متقدم)'
        ],
        en: [
            'Website Design',
            'Building Online Stores',
            'Managing Online Stores',
            'Email Marketing',
            'Writing Articles',
            'WhatsApp Marketing',
            'Creating Visual Content',
            'Photography',
            'Designing Exhibition Booths',
            'SEO Optimization (Optional: Basic or Advanced)'
        ]
    }
};

// Pricing notes
export const pricingNotes = {
    title: { ar: 'ملاحظات إضافية:', en: 'Additional Notes:' },
    notes: {
        ar: [
            'الأسعار تشمل إعداد الخطط وإدارة الخدمات، بينما ميزانية الإعلانات تكون على حسب اختيار العميل.',
            'يمكن تخصيص أي باقة لتتناسب مع احتياجات العمل.'
        ],
        en: [
            'Prices include plan preparation and service management, while the advertising budget is according to the client\'s choice.',
            'Any package can be customized to suit business needs.'
        ]
    }
};
