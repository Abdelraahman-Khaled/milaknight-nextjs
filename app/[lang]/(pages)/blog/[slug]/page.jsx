import { permanentRedirect } from 'next/navigation';
import { getBlogDetails } from '@/app/api/blog';
import BlogDetailContent from '@/app/components/blogs/BlogDetailContent';
import Preloader from "@/app/components/Preloader";
import LegacyScripts from "@/app/components/LegacyScripts";

import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query';

export const dynamic = 'force-dynamic';

// Generate metadata for SEO
export async function generateMetadata({ params }) {
    try {
        const { lang, slug } = await params;
        const blog = await getBlogDetails(slug);

        if (!blog || Object.keys(blog).length === 0) return {};

        const language = lang || "ar";

        const title = language === 'ar'
            ? (blog.meta_title_ar || blog.title_ar)
            : (blog.meta_title_en || blog.title_en);

        const description = language === 'ar'
            ? (blog.meta_description_ar || blog.description_ar)
            : (blog.meta_description_en || blog.description_en);

        const featuredPhoto = blog.photos?.find(p => p.is_arabic === (language === 'ar')) || blog.photos?.[0];
        const photoUrl = featuredPhoto?.url || blog.photo_url;

        const arSlug = blog.slug_ar || blog.slug;
        const enSlug = blog.slug || blog.slug_ar;
        const canonicalSlug = language === 'ar' ? arSlug : enSlug;

        return {
            title: ` ${title}`,
            description,
            icons: {
                icon: '/images/icons/favicon.ico',
                shortcut: '/images/icons/favicon.ico',
            },
            openGraph: {
                title: ` ${title}`,
                description,
                images: photoUrl ? [photoUrl] : ["/images/icons/favicon.ico"],
            },
            twitter: {
                title: ` ${title}`,
                description,
                images: photoUrl ? [photoUrl] : ["/images/icons/favicon.ico"],
            },
            alternates: {
                canonical: `https://mila-knight.com/${language}/blog/${encodeURIComponent(canonicalSlug)}`,
                languages: {
                    "ar": `https://mila-knight.com/ar/blog/${encodeURIComponent(arSlug || slug)}`,
                    "en": `https://mila-knight.com/en/blog/${encodeURIComponent(enSlug || slug)}`,
                    "x-default": `https://mila-knight.com/ar/blog/${encodeURIComponent(arSlug || slug)}`
                }
            }
        }
    } catch (error) {
        console.error("Metadata error:", error);
        return { title: ' Blog' };
    }
}

export default async function BlogDetailsPage({ params }) {
    const { lang, slug } = await params;
    const currentLang = lang || 'ar';
    const queryClient = new QueryClient();

    let blog = null;

    try {
        await queryClient.prefetchQuery({
            queryKey: ['blog', slug],
            queryFn: async () => {
                try {
                    const data = await getBlogDetails(slug);
                    return data;
                } catch (error) {
                    // 🔥 هنا السر: اطبع الخطأ عشان تشوف الـ JSON اللي السيرفر بعته
                    if (error.response) {
                        console.log("---------------- API ERROR ----------------");
                        console.log(JSON.stringify(error.response.data, null, 2)); // ده اللي هيظهرلك الـ JSON
                        console.log("Status:", error.response.status);
                        console.log("-------------------------------------------");
                    }
                    throw error;
                }
            },
        });
        
        blog = queryClient.getQueryData(['blog', slug]);

        // 3. 🛡️ حماية: لو الـ blog مش موجود أو حصل خطأ 301
        if (!blog || Object.keys(blog).length === 0) {
            console.error("Blog not found or moved, redirecting to blog list...");
            permanentRedirect(`/${currentLang}/blog`);
        }

        // 4. بقية الكود
        let decodedSlug = decodeURIComponent(slug);
        const arSlug = blog.slug_ar || blog.slug;
        const enSlug = blog.slug || blog.slug_ar;

        const isEnglishSlug = decodedSlug === enSlug;
        const isArabicSlug = decodedSlug === arSlug;

        if (isEnglishSlug && !isArabicSlug && currentLang === 'ar') {
            permanentRedirect(`/en/blog/${encodeURIComponent(enSlug)}`);
        }
        if (isArabicSlug && !isEnglishSlug && currentLang === 'en') {
            permanentRedirect(`/ar/blog/${encodeURIComponent(arSlug)}`);
        }
        if (currentLang === "ar" && decodedSlug !== arSlug) {
            permanentRedirect(`/ar/blog/${encodeURIComponent(arSlug)}`);
        }
        if (currentLang === "en" && decodedSlug !== enSlug) {
            permanentRedirect(`/en/blog/${encodeURIComponent(enSlug)}`);
        }

    } catch (error) {
        // لو الخطأ سببه Redirect.. سيبه نيكست يتعامل معاه
        if (error.digest?.startsWith('NEXT_REDIRECT')) throw error;

        console.error("Page Processing Error:", error);
        // في حالة أي خطأ تاني (زي API Error: 301) هنحول لصفحة المدونة
        permanentRedirect(`/${currentLang}/blog`);
    }

    // Build FAQ schema if the blog has faqs
    const faqSchema = blog?.faqs && Array.isArray(blog.faqs) && blog.faqs.length > 0
        ? {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": blog.faqs.map((faq) => {
                const question = currentLang === 'ar'
                    ? (faq.question_ar || faq.question_en)
                    : (faq.question_en || faq.question_ar);
                const answer = currentLang === 'ar'
                    ? (faq.answer_ar || faq.answer_en)
                    : (faq.answer_en || faq.answer_ar);
                return {
                    "@type": "Question",
                    "name": question,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": answer,
                    },
                };
            }),
        }
        : null;

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            {faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            )}
            <Preloader />
            <main>
                <BlogDetailContent slug={slug} initialBlog={blog} />
            </main>
            <LegacyScripts />
        </HydrationBoundary>
    );
}

