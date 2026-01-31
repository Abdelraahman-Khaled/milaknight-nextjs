import HeroSection from '../../components/ui/HeroSection';
import ScrollTicker from '../../components/ui/ScrollTicker';
import BlogsTabs from '../../components/blogs/blogsTabs';
import { getBlogs } from '../../api/blog';
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query';

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
