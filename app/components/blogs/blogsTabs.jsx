"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const blogs = [
    {
        id: 1,
        category: 'branding',
        title: 'خطوات تحسين معدل التحويل في المواقع الإلكترونية',
        image: '/images/blogs/61/تحسين-معدل-التحويل-في-المواقع-الإلكترونية.webp',
        link: 'blog/تحسين-معدل-التحويل-في-المواقع-الإلكترونية.html',
        alt: 'تحسين معدل التحويل في المواقع الإلكترونية'
    },
    {
        id: 2,
        category: 'branding',
        title: 'تحسين ظهور العلامة التجارية على منصات التواصل الاجتماعي',
        image: '/images/blogs/60/العلامة-التجارية-الشخصية-في-التسويق-الرقمي.webp',
        link: 'blog/بناء-الهوية-الرقمية.html',
        alt: 'العلامة التجارية الشخصية في التسويق الرقمي'
    },
    {
        id: 3,
        category: 'digital',
        title: 'المحتوى التفاعلي في التسويق الرقمي: كيف تُحوّل جمهورك من مشاهدين إلى مشاركين؟',
        image: '/images/blogs/59/المحتوى-التفاعلي-في-التسويق-الرقمي.webp',
        link: 'blog/المحتوى-التفاعلي-في-التسويق-الرقمي.html',
        alt: 'المحتوى التفاعلي في التسويق الرقمي'
    },
    {
        id: 4,
        category: 'digital',
        title: 'استراتيجية المحتوى الرقمي: كيف تبني حضورًا رقميًا ؟',
        image: '/images/blogs/58/استراتيجية-المحتوى-الرقمي.webp',
        link: 'blog/استراتيجية-المحتوى-الرقمي.html',
        alt: 'استراتيجية المحتوى الرقمي'
    },
    {
        id: 5,
        category: 'digital',
        title: 'التسويق عبر الذكاء الاصطناعي: كيف تُحدث ثورة في استراتيجيتك الرقمية؟',
        image: '/images/blogs/57/التسويق-عبر-الذكاء-الاصطناعي.webp',
        link: 'blog/التسويق-عبر-الذكاء-الاصطناعي.html',
        alt: 'التسويق عبر الذكاء الاصطناعي'
    }
];

const filters = [
    { label: 'جميع المقالات', value: '*' },
    { label: 'العلامة التجارية والهوية', value: 'branding' },
    { label: 'تصميم المواقع', value: 'web' },
    { label: 'التصميم الجرافيكي', value: 'graphic' },
    { label: 'التسويق الرقمي', value: 'digital' },
    { label: 'التجارة الكترونية', value: 'seo' }
];

const BlogsTabs = () => {
    const [activeFilter, setActiveFilter] = useState('*');

    const filteredBlogs = activeFilter === '*'
        ? blogs
        : blogs.filter(blog => blog.category === activeFilter);

    const handleFilterClick = (e, filterValue) => {
        e.preventDefault();
        setActiveFilter(filterValue);
    };

    return (
        <div className="page-blog">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12 margin-top-100">
                        <div className="our-Project-nav">
                            <ul>
                                {filters.map((filter) => (
                                    <li key={filter.value}>
                                        <Link
                                            href="#"
                                            className={activeFilter === filter.value ? 'active-btn' : ''}
                                            onClick={(e) => handleFilterClick(e, filter.value)}
                                        >
                                            {filter.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {filteredBlogs.map((blog) => (
                        <div key={blog.id} className={`col-lg-4 col-md-6 ${blog.category}`}>
                            {/* <!-- Post Item Start --> */}
                            <div className="post-item">
                                {/* <!-- Post Featured Image Start--> */}
                                <div className="post-featured-image">
                                    <figure>
                                        <Link
                                            href={blog.link}
                                            className="image-anime"
                                            data-cursor-text="قراءة المقالة"
                                            style={{ display: 'block', position: 'relative', width: '100%', height: 'auto' }}
                                        >
                                            <Image
                                                src={blog.image}
                                                alt={blog.alt}
                                                width={0}
                                                height={0}
                                                sizes="100vw"
                                                style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
                                            />
                                        </Link>
                                    </figure>
                                </div>
                                {/* <!-- Post Featured Image End --> */}

                                {/* <!-- Post Item Body Start --> */}
                                <div className="post-item-body">
                                    {/* <!-- Post Item Content Start --> */}
                                    <div className="post-item-content">
                                        <h3>
                                            <Link href={blog.link}>
                                                {blog.title}
                                            </Link>
                                        </h3>
                                    </div>
                                    {/* <!-- Post Item Content End --> */}

                                    {/* <!-- Post Item Readmore Button Start--> */}
                                    <div className="post-item-btn">
                                        <Link href={blog.link}>اقرأ المزيد</Link>
                                    </div>
                                    {/* <!-- Post Item Readmore Button End--> */}
                                </div>
                                {/* <!-- Post Item Body End --> */}
                            </div>
                            {/* <!-- Post Item End --> */}
                        </div>
                    ))}

                    {filteredBlogs.length === 0 && (
                        <div className="col-12 text-center mt-5">
                            <p>لا توجد مقالات في هذا القسم حاليا.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogsTabs;