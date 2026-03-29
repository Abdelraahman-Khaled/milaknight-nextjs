import { permanentRedirect } from 'next/navigation';
import { getBlogDetails } from '@/app/api/blog';
import BlogDetailContent from '@/app/components/blogs/BlogDetailContent';
import { cookies } from 'next/headers';
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/ui/Footer";
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
            title: `Milaknight | ${title}`,
            description,
            icons: {
                icon: '/images/icons/favicon.ico',
                shortcut: '/images/icons/favicon.ico',
            },
            openGraph: {
                title: `Milaknight | ${title}`,
                description,
                images: photoUrl ? [photoUrl] : ["/images/icons/favicon.ico"],
            },
            twitter: {
                title: `Milaknight | ${title}`,
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
        return { title: 'Milaknight | Blog' };
    }
}

export default async function BlogDetailsPage({ params }) {
    try {
        const { lang, slug } = await params;

        const queryClient = new QueryClient();

        // Use getBlogDetails for prefetching
        await queryClient.prefetchQuery({
            queryKey: ['blog', slug],
            queryFn: () => getBlogDetails(slug),
        });

        // Get the data from cache or fetch again if needed (usually it's in cache now)
        const blog = queryClient.getQueryData(['blog', slug]);

        if (!blog || Object.keys(blog).length === 0) {
            permanentRedirect(`/${lang || 'ar'}`);
        }

        const currentLang = lang || 'ar';
        
        // Safe decode
        let decodedSlug = slug;
        try {
            decodedSlug = decodeURIComponent(slug);
        } catch (e) {
            console.error("Slug decoding failed on server:", e);
        }

        // Canonical slugs from API
        const arSlug = blog.slug_ar || blog.slug; // Arabic canonical
        const enSlug = blog.slug || blog.slug_ar;    // English canonical

        // 🔁 CROSS LANGUAGE REDIRECT LOGIC
        // Determine which language this slug belongs to (only if they are different)
        const isEnglishSlug = decodedSlug === enSlug;
        const isArabicSlug = decodedSlug === arSlug;

        // Condition for redirecting between languages:
        // Slug is English-only and we are in Arabic section -> Switch to English
        if (isEnglishSlug && !isArabicSlug && currentLang === 'ar') {
            permanentRedirect(`/en/blog/${encodeURIComponent(enSlug)}`);
        }
        // Slug is Arabic-only and we are in English section -> Switch to Arabic
        if (isArabicSlug && !isEnglishSlug && currentLang === 'en') {
            permanentRedirect(`/ar/blog/${encodeURIComponent(arSlug)}`);
        }

        // 🔧 NORMALIZATION within the same language context
        if (currentLang === "ar" && decodedSlug !== arSlug) {
            permanentRedirect(`/ar/blog/${encodeURIComponent(arSlug)}`);
        }
        if (currentLang === "en" && decodedSlug !== enSlug) {
            permanentRedirect(`/en/blog/${encodeURIComponent(enSlug)}`);
        }

        return (
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Preloader />
                <main>
                    <BlogDetailContent slug={slug} initialBlog={blog} />
                </main>
                <LegacyScripts />
            </HydrationBoundary>
        );
    } catch (error) {
        // If it was a redirect error, rethrow it so Next.js can handle it
        if (error.digest && (error.digest.startsWith('NEXT_REDIRECT') || error.digest.startsWith('NEXT_NOT_FOUND'))) {
            throw error;
        }
        console.error("BlogDetailsPage error:", error);
        permanentRedirect(`/${lang || 'ar'}/blog`);
    }
}

