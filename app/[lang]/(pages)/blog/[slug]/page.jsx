import { notFound, permanentRedirect } from 'next/navigation';
import { getBlogDetails, isDeleted, isGone, isMissing } from '@/app/api/blog';
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
        // A deleted post is expected, not a failure — the page renders a 404, so
        // leave the metadata empty instead of stamping it with a bogus title.
        if (isGone(error)) return {};

        console.error("Metadata error:", error);
        return { title: ' Blog' };
    }
}

export default async function BlogDetailsPage({ params }) {
    const { lang, slug } = await params;
    const currentLang = lang || 'ar';
    const queryClient = new QueryClient();

    let blog;

    try {
        blog = await queryClient.fetchQuery({
            queryKey: ['blog', slug],
            queryFn: () => getBlogDetails(slug),
            retry: false,
        });
    } catch (error) {
        const status = error.response?.status;

        // A deleted post sends the visitor to the home page rather than a dead
        // end. Permanent (308) by request: browsers cache this indefinitely, so
        // a post that is later restored will not reach anyone who already hit
        // the old URL until they clear their own cache.
        if (isDeleted(error)) permanentRedirect(`/${currentLang}`);
        if (isMissing(error)) notFound();

        // A transient failure (500, network blip) must not become a 404 or a
        // permanent redirect — both stick in caches long after the API recovers.
        console.error(
            `Blog fetch failed for "${slug}" (status ${status ?? 'n/a'}):`,
            error.response?.data ?? error
        );
        throw error;
    }

    if (!blog || Object.keys(blog).length === 0) notFound();

    let decodedSlug = slug;
    try {
        decodedSlug = decodeURIComponent(slug);
    } catch {
        notFound();
    }

    const arSlug = blog.slug_ar || blog.slug;
    const enSlug = blog.slug || blog.slug_ar;

    // The locale in the URL decides the language — never the slug. Deciding it
    // from the slug meant /en/blog/<arabic-slug> redirected straight back to
    // /ar, so the toggle could never leave Arabic on a blog post. The two
    // checks below keep the requested locale and correct only the slug.
    if (currentLang === "ar" && decodedSlug !== arSlug) {
        permanentRedirect(`/ar/blog/${encodeURIComponent(arSlug)}`);
    }
    if (currentLang === "en" && decodedSlug !== enSlug) {
        permanentRedirect(`/en/blog/${encodeURIComponent(enSlug)}`);
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
