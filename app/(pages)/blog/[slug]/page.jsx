import { notFound } from 'next/navigation';
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
    const { slug } = await params;
    const blog = await getBlogDetails(slug);

    if (!blog) return {};


    const decodedSlug = decodeURIComponent(slug);
    const isArabicRequest = decodedSlug === blog.slug_ar;

    const title = isArabicRequest
        ? (blog.meta_title_ar || blog.title_ar)
        : (blog.meta_title_en || blog.title_en);

    const description = isArabicRequest
        ? (blog.meta_description_ar || blog.description_ar)
        : (blog.meta_description_en || blog.description_en);

    const photoUrl = isArabicRequest
        ? (blog.photos?.find(p => p.is_arabic)?.url || blog.photo_url)
        : (blog.photos?.find(p => !p.is_arabic)?.url || blog.photo_url);


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
            canonical: `https://www.mila-knight.com/blog/${decodedSlug}`,
            languages: {
                "ar": `https://www.mila-knight.com/blog/${encodeURIComponent(blog.slug_ar)}`,
                "en": `https://www.mila-knight.com/blog/${blog.slug}`,
            }
        }
    }
}

export default async function BlogDetailsPage({ params }) {
    const { slug } = await params;

    const queryClient = new QueryClient();

    // Use getBlogDetails for prefetching
    await queryClient.prefetchQuery({
        queryKey: ['blog', slug],
        queryFn: () => getBlogDetails(slug),
    });

    // Get the data from cache or fetch again if needed (usually it's in cache now)
    const blog = queryClient.getQueryData(['blog', slug]);

    if (!blog) notFound();

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <BlogDetailContent slug={slug} initialBlog={blog} />
        </HydrationBoundary>
    );
}
