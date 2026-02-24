import { getBlogs } from "./api/blog";
import { servicesData } from "./data/servicesData";

export const dynamic = "force-dynamic"; // Ensures it fetches live blogs on request instead of caching at build

export default async function sitemap() {
  const baseUrl = "https://www.mila-knight.com";

  // Static route definitions
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/projects",
    "/pricing",
    "/contact",
    "/blog",
  ];

  // Map static pages to sitemap object format
  const staticPages = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));

  // Map service pages dynamically from servicesData keys
  const serviceSlugs = Object.keys(servicesData);
  const servicePages = serviceSlugs.map((slug) => ({
    url: `${baseUrl}/service/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Map blog pages dynamically from API
  let blogPages = [];
  try {
    const rawData = await getBlogs();
    const blogsArray = Array.isArray(rawData) ? rawData : [];

    blogPages = blogsArray.map((blog) => {
      // Safely handling both English and Arabic slugs
      const canonicalSlug = blog.slug_ar || blog.slug;

      return {
        url: `${baseUrl}/blog/${canonicalSlug}`,
        lastModified: new Date(blog.created_at || new Date()).toISOString(),
        changeFrequency: "weekly",
        priority: 0.8,
        alternates: {
          languages: {
            ar: `${baseUrl}/blog/${blog.slug_ar}`,
            en: `${baseUrl}/blog/${blog.slug}`,
            "x-default": `${baseUrl}/blog/${canonicalSlug}`,
          },
        },
      };
    });
  } catch (error) {
    console.error("Error fetching blogs for sitemap:", error);
  }

  // Merge and return all sitemap items
  return [...staticPages, ...servicePages, ...blogPages];
}
