import React from 'react';
import { notFound } from 'next/navigation';
import LegacyScripts from '@/app/components/LegacyScripts';
import { getBlogDetails, getBlogs } from '@/app/api/blog';
import BlogDetailContent from '@/app/components/blogs/BlogDetailContent';

// Generate static params for all blog posts at build time
export async function generateStaticParams() {
    try {
        const blogs = await getBlogs();
        // Return all blog slugs for static generation
        return blogs.map((blog) => ({
            slug: blog.slug,
        }));
    } catch (error) {
        console.error("Failed to generate static params:", error);
        return [];
    }
}

// Allow dynamic params for new blog posts added after build
export const dynamicParams = true;
// Revalidate every hour
export const revalidate = 3600;

// Helper to fetch data with ISR
async function getBlog(slug) {
    try {
        const data = await getBlogDetails(slug);
        console.log(data);

        if (!data) return undefined;
        return data;
    } catch (error) {
        console.error("Failed to fetch blog:", error);
        return undefined;
    }
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const blog = await getBlog(slug);

    if (!blog) return {};

    // Note: Server-side doesn't know the client language yet, defaults to Arabic or both in meta
    return {
        title: blog.meta_title_ar || blog.meta_title_en,
        description: blog.meta_description_ar || blog.meta_description_en,
        icons: {
            icon: '/images/icons/favicon.ico',
            shortcut: '/images/icons/favicon.ico',
        },
        openGraph: {
            title: blog.meta_title_ar || blog.meta_title_en,
            description: blog.meta_description_ar || blog.meta_description_en,
            images: [blog.image],
        }
    };
}

export default async function BlogDetailsPage({ params }) {
    const { slug } = await params;
    const blog = await getBlog(slug);

    if (!blog) {
        notFound();
    }

    return (
        <>
            <BlogDetailContent blog={blog} />
            <LegacyScripts />
        </>
    );
}
