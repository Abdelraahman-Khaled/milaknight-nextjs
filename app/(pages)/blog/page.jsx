import HeroSection from '../../components/ui/HeroSection';
import ScrollTicker from '../../components/ui/ScrollTicker';
import BlogsTabs from '../../components/blogs/blogsTabs';

export default function BlogPage() {
    return (
        <>
            <HeroSection
                title="latest"
                page="blog"
                subtitle="blog"
                breadcrumb="home"
            />
            <ScrollTicker />
            <BlogsTabs />
        </>
    )
}
