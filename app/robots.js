export const dynamic = 'force-static';

export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/admin/', '/private/', '/_next/'],
            },
            {
                userAgent: 'Googlebot',
                allow: ['/', '/images/', '/css/', '/js/'],
                disallow: ['/nodisplay/', '/admin/'],
            },
            {
                userAgent: 'Bingbot',
                allow: ['/', '/images/', '/css/', '/js/'],
                disallow: ['/nodisplay/', '/admin/'],
            }
        ],
        sitemap: 'https://milaknight.com/sitemap.xml',
    };
}
