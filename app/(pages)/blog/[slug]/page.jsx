import React from 'react';
import { notFound } from 'next/navigation';
import ScrollTicker from '../../../components/ui/ScrollTicker';
import Link from 'next/link';

// Helper to fetch data
// Note: We use the absolute URL for server-side fetching. 
// In a real production env, this should use an ENV var, e.g. process.env.NEXT_PUBLIC_API_URL
async function getBlog(slug) {
    try {
        const res = await fetch(`http://localhost:3000/api/blogs/${slug}`, {
            cache: 'no-store'
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
                                    <img src={blog.image} alt={blog.title} />
                                </figure>
                            </div>
                            {/* Post Featured Image Start */}

                            {/* Post Single Content Start */}
                            <div className="post-content">
                                <div
                                    className="post-entry"
                                    dangerouslySetInnerHTML={{ __html: blog.content }}
                                />
                            </div>
                            {/* Post Single Content End */}
                        </div>
                    </div>
                </div>
            </div>
            {/* Page Single Post End */}
        </>
    );
}
