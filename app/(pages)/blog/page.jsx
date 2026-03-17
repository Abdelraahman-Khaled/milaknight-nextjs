import HeroSection from '../../components/ui/HeroSection';
import ScrollTicker from '../../components/ui/ScrollTicker';
import BlogsTabs from '../../components/blogs/blogsTabs';
import { getBlogs } from '../../api/blog';
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query';

import translations from '@/app/context/translations';
import { cookies } from 'next/headers';

export async function generateMetadata() {
    const cookieStore = await cookies();
    const language = cookieStore.get('NEXT_LOCALE')?.value || 'ar';
    const t = translations[language];

    return {
        title: t.blog_seo_title,
        description: t.blog_seo_description,
    };
}

export default async function BlogPage() {
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
