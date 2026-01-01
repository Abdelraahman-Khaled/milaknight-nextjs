import { NextResponse } from 'next/server';

export async function GET() {
    const data = {
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

    return NextResponse.json(data);
}
