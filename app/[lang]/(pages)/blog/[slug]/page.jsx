import { permanentRedirect } from 'next/navigation';
import { getBlogDetails } from '@/app/api/blog';
import BlogDetailContent from '@/app/components/blogs/BlogDetailContent';
import { cookies } from 'next/headers';
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
    const { lang, slug } = await params;
    const blog = await getBlogDetails(slug);

    if (!blog) return {};

    const language = lang || "ar";

    const title = language === 'ar'
        ? (blog.meta_title_ar || blog.title_ar)
        : (blog.meta_title_en || blog.title_en);

    const description = language === 'ar'
        ? (blog.meta_description_ar || blog.description_ar)
        : (blog.meta_description_en || blog.description_en);

    const featuredPhoto = blog.photos?.find(p => p.is_arabic === (language === 'ar')) || blog.photos?.[0];
    const photoUrl = featuredPhoto?.url || blog.photo_url;

    const canonical = language === 'ar' ? blog.slug_ar : blog.slug;

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
            canonical: `https://mila-knight.com/${language}/blog/${canonical}`,
            languages: {
                "ar": `https://mila-knight.com/ar/blog/${blog.slug_ar}`,
                "en": `https://mila-knight.com/en/blog/${blog.slug}`,
            }
        }
    }
}

export default async function BlogDetailsPage({ params }) {
    const { lang, slug } = await params;

    const queryClient = new QueryClient();

    // Use getBlogDetails for prefetching
    await queryClient.prefetchQuery({
        queryKey: ['blog', slug],
        queryFn: () => getBlogDetails(slug),
    });

    // Get the data from cache or fetch again if needed (usually it's in cache now)
    const blog = queryClient.getQueryData(['blog', slug]);

    if (!blog) {
        permanentRedirect(`/${lang || 'ar'}`);
    }

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <BlogDetailContent slug={slug} initialBlog={blog} />
        </HydrationBoundary>
    );
}
