import { notFound } from 'next/navigation';
import { getBlogDetails } from '@/app/api/blog';
import BlogDetailContent from '@/app/components/blogs/BlogDetailContent';
import LegacyScripts from '@/app/components/LegacyScripts';

export const dynamic = 'force-dynamic';

async function getBlog(slug) {
    const data = await getBlogDetails(slug);
    if (!data) return null;
    return data;
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const blog = await getBlog(slug);

    if (!blog) return {};

    return {
        title: blog.meta_title_ar,
        description: blog.meta_description_ar,
        openGraph: {
            title: blog.meta_title_ar,
            description: blog.meta_description_ar,
            images: [blog.image],
        },
    };
}

export default async function BlogDetailsPage({ params }) {
    const { slug } = await params;
    const blog = await getBlog(slug);

    if (!blog) notFound();

    return (
        <>
            <BlogDetailContent blog={blog} />
            <LegacyScripts />
        </>
    );
}
