import React from 'react';
import { notFound } from 'next/navigation';
import LegacyScripts from '@/app/components/LegacyScripts';
import { getBlogDetails, getBlogs } from '@/app/api/blog';
import BlogDetailContent from '@/app/components/blogs/BlogDetailContent';

import { cookies } from 'next/headers';

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
export const dynamicParams = false;

// Helper to fetch data with ISR
async function getBlog(slug) {
    try {
        const data = await getBlogDetails(slug);

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
    console.log(slug);

    if (!blog) return {};

    // const cookieStore = await cookies();
    const language = 'ar'; // Default to 'ar' for static export

    const title = language === 'ar'
        ? (blog.meta_title_ar || blog.meta_title_en)
        : (blog.meta_title_en || blog.meta_title_ar);

    const description = language === 'ar'
        ? (blog.meta_description_ar || blog.meta_description_en)
        : (blog.meta_description_en || blog.meta_description_ar);

    return {
        title: title,
        description: description,
        icons: {
            icon: '/images/icons/favicon.ico',
            shortcut: '/images/icons/favicon.ico',
        },
        openGraph: {
            title: title,
            description: description,
            images: [blog.image],
        }
    };
}

export default async function BlogDetailsPage({ params }) {
    const { slug } = await params;
    const blog = await getBlog(slug);
    console.log(slug);

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
