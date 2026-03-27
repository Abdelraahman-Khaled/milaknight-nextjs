import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query';

import translations from '@/app/context/translations';
import { getBlogs } from '@/app/api/blog';
import BlogsTabs from '@/app/components/blogs/blogsTabs';
import HeroSection from '@/app/components/ui/HeroSection';
import ScrollTicker from '@/app/components/ui/ScrollTicker';

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const t = translations[lang] || translations.ar;

    return {
        title: t.blog_seo_title,
        description: t.blog_seo_description,
    };
}

export default async function BlogPage({ params }) {
    const { lang } = await params;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['blogs'],
        queryFn: getBlogs,
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <HeroSection
                title="latest"
                page="blog"
                subtitle="blog"
                breadcrumb="home"
            />
            <ScrollTicker />
            <BlogsTabs />
        </HydrationBoundary>
    );
}
