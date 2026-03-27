import { getBlogs } from "./api/blog";
import { servicesData } from "./data/servicesData";

export const dynamic = "force-dynamic";

export default async function sitemap() {
  const baseUrl = "https://mila-knight.com";
  const currentDate = new Date().toISOString().split("T")[0];

  // 1. الصفحات الثابتة
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/projects",
    "/pricing",
    "/contact",
    "/blog",
  ];
  const staticPages = staticRoutes.flatMap((route) => [
    {
      url: `${baseUrl}/ar${route}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: route === "" ? 1 : 0.8,
    },
    {
      url: `${baseUrl}/en${route}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: route === "" ? 0.9 : 0.7,
    }
  ]);

  // 2. صفحات الخدمات
  const servicePages = Object.keys(servicesData).flatMap((slug) => [
    {
      url: `${baseUrl}/ar/service/${slug}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/service/${slug}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    }
  ]);

  // 3. صفحات المقالات
  let blogPages = [];
  try {
    const rawData = await getBlogs();
    const blogsArray = Array.isArray(rawData) ? rawData : [];

    blogPages = blogsArray.flatMap((blog) => {
      const arabicSlug = encodeURI(blog.slug_ar || "");
      const englishSlug = encodeURI(blog.slug || "");

      const lastMod = new Date(blog.updated_at || blog.created_at || new Date())
        .toISOString()
        .split("T")[0];

      return [
        {
          url: `${baseUrl}/ar/blog/${arabicSlug}`,
          lastModified: lastMod,
          changeFrequency: "weekly",
          priority: 0.7,
        },
        {
          url: `${baseUrl}/en/blog/${englishSlug}`,
          lastModified: lastMod,
          changeFrequency: "weekly",
          priority: 0.7,
        }
      ];
    });
  } catch (error) {
    console.error("Error fetching blogs for sitemap:", error);
  }

  return [...staticPages, ...servicePages, ...blogPages];
}
