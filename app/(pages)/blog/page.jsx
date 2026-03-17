import HeroSection from '../../components/ui/HeroSection';
import ScrollTicker from '../../components/ui/ScrollTicker';
import BlogsTabs from '../../components/blogs/blogsTabs';
import { getBlogs } from '../../api/blog';
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query';

export const metadata = {
    title: "تصفح المزيد من أخبار ومقالات عن التسويق الالكتروني من ميلا نايت",
    description:
        "تصفح المزيد من المقالات وتعرف علينا فنحن نسعى إلى تطوير خطط تسويقية تمزج بين أحدث التقنيات وأدق رؤى ونؤمن بأن كل علامة تجارية تستحق قصة نجاحها الخاصة",
};

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
