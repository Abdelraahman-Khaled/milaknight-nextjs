import { notFound } from 'next/navigation';
import { getBlogDetails } from '@/app/api/blog';
import BlogDetailContent from '@/app/components/blogs/BlogDetailContent';
import LegacyScripts from '@/app/components/LegacyScripts';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

// Helper to fetch data with resilient slug handling
async function getBlog(slug) {
    try {
        // 1. Try with the original slug
        let data = await getBlogDetails(slug);
        if (data && data.id) return data;

        // 2. If it has hyphens, try replacing them with spaces
        if (slug.includes('-')) {
            const spaceSlug = slug.replace(/-/g, ' ');
            data = await getBlogDetails(spaceSlug);
            if (data && data.id) return data;
        }

        // 3. If it has spaces, try replacing them with hyphens
        if (slug.includes(' ')) {
            const hyphenSlug = slug.replace(/ /g, '-');
            data = await getBlogDetails(hyphenSlug);
            if (data && data.id) return data;
        }

        return null;
    } catch (error) {
        console.error(`Error fetching blog "${slug}":`, error.message);
        return null;
    }
}

export async function generateMetadata({ params }) {
    const { slug: encodedSlug } = await params;
    const slug = decodeURIComponent(encodedSlug);
    const blog = await getBlog(slug);

    if (!blog) return {};

    const cookieStore = await cookies();
    const language = (await cookieStore.get("NEXT_LOCALE"))?.value || "ar";

    const title = language === 'ar'
        ? (blog.meta_title_ar || blog.title_ar)
        : (blog.meta_title_en || blog.title_en);

    const description = language === 'ar'
        ? (blog.meta_description_ar || blog.description_ar)
        : (blog.meta_description_en || blog.description_en);

    return {
        title: `Milaknight | ${title}`,
        description,
        icons: {
            icon: '/images/icons/favicon.ico',
            shortcut: '/images/icons/favicon.ico',
        },
        openGraph: {
            title: "Milaknight" | title,
            description,
            images: blog.photo_url ? [blog.photo_url] : ["/images/icons/favicon.ico"],
        },
    };
}

export default async function BlogDetailsPage({ params }) {
    const { slug: encodedSlug } = await params;
    const slug = decodeURIComponent(encodedSlug);
    const blog = await getBlog(slug);

    if (!blog) notFound();

    return (
        <>
            <BlogDetailContent blog={blog} />
            <LegacyScripts />
        </>
    );
}
