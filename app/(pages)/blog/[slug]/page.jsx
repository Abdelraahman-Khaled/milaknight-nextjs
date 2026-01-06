import React from 'react';
import { notFound } from 'next/navigation';
import ScrollTicker from '../../../components/ui/ScrollTicker';
import Link from 'next/link';
import Image from 'next/image';
import LegacyScripts from '@/app/components/LegacyScripts';
import { blogs } from '@/app/data/blogs';

// Generate static params for all blog posts at build time
export async function generateStaticParams() {
    // Return all blog slugs for static generation
    return blogs.map((blog) => ({
        slug: blog.slug,
    }));
}

// Allow dynamic params for new blog posts added after build
export const dynamicParams = true;

// Helper to fetch data with ISR
async function getBlog(slug) {
    try {
        const res = await fetch(`http://localhost:3000/api/blogs/${slug}`, {
            next: { revalidate: 3600 } // Revalidate every hour (3600 seconds)
        });
        if (!res.ok) return undefined;
        return res.json();

    } catch (error) {
        console.error("Failed to fetch blog:", error);
        return undefined;
    }
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const blog = await getBlog(slug);
    if (!blog) return {};

    return {
        title: blog.title,
        description: blog.description,
        icons: {
            icon: '/images/icons/favicon.ico',
            shortcut: '/images/icons/favicon.ico',
        },
        openGraph: {
            title: blog.title,
            description: blog.description,
            images: [blog.image],
        }
    };
}

export default async function BlogDetailsPage({ params }) {
    const { slug } = await params;
    const blog = await getBlog(slug);
    console.log(blog);
    if (!blog) {
        notFound();
    }



    return (
        <>
            {/* Page Header */}
            <div className="page-header">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12">
                            <div className="page-header-box">
                                <h1>
                                    {blog.title}
                                </h1>
                                <nav className="mt-3">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link href="/">الرئيسية</Link></li>
                                        <li className="breadcrumb-item"><Link href="/blog">المدونة</Link></li>
                                        <li className="active breadcrumb-item" aria-current="page">
                                            {blog.title}
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ScrollTicker />

            {/* Page Single Post Start */}
            <div className="page-single-post">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            {/* Post Featured Image Start */}
                            <div className="post-image">
                                <figure className="image-anime reveal">
                                    <Image src={blog.image} alt={blog.title} width={1200} height={630} />
                                </figure>
                            </div>
                            {/* Post Featured Image Start */}

                            {/* Post Single Content Start */}
                            <div className="post-content">
                                <div className="post-entry">
                                    {blog.content && Array.isArray(blog.content) ? (
                                        blog.content.map((section, index) => (
                                            <div key={index} className="blog-section">
                                                {/* Render section text */}
                                                <div dangerouslySetInnerHTML={{ __html: section.text }} />

                                                {/* Render section images if they exist */}
                                                {section.sectionImages && section.sectionImages.length > 0 && (
                                                    <div className="row row-images">
                                                        {section.sectionImages.map((img, imgIndex) => (
                                                            <div key={imgIndex} className="col-12 col-md-6">
                                                                <figure>
                                                                    <Image
                                                                        src={img.src}
                                                                        alt={img.alt}
                                                                        width={1200}
                                                                        height={630}
                                                                        className="img-fluid"
                                                                    />
                                                                </figure>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        // Fallback for old format (single HTML string)
                                        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                                    )}
                                </div>
                            </div>
                            {/* Post Single Content End */}
                        </div>
                    </div>
                </div>
            </div>
            {/* Page Single Post End */}
            <LegacyScripts />
        </>
    );
}
