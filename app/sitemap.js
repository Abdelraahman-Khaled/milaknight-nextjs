import { getBlogs } from "./api/blog";
import { servicesData } from "./data/servicesData";

export const dynamic = "force-dynamic";

export default async function sitemap() {
  const baseUrl = "https://www.mila-knight.com";
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
  const staticPages = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));

  // 2. صفحات الخدمات (تحويل مفاتيح الكائن إلى مصفوفة روابط)
  const servicePages = Object.keys(servicesData).map((slug) => ({
    url: `${baseUrl}/service/${slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // 3. صفحات المقالات مع الروابط البديلة (Alternates)
  let blogPages = [];
  try {
    const rawData = await getBlogs();
    const blogsArray = Array.isArray(rawData) ? rawData : [];

    blogPages = blogsArray.map((blog) => {
      // تشفير الروابط لضمان سلامة الحروف العربية
      const arabicSlug = encodeURI(blog.slug_ar || "");
      const englishSlug = encodeURI(blog.slug || "");

      const arabicUrl = `${baseUrl}/blog/${arabicSlug}`;
      const englishUrl = `${baseUrl}/blog/${englishSlug}`;

      return {
        url: arabicUrl, // الرابط الافتراضي
        lastModified: new Date(blog.updated_at || blog.created_at || new Date())
          .toISOString()
          .split("T")[0],
        changeFrequency: "weekly",
        priority: 0.7,
        // هذه الخاصية هي التي تجعل الكود يبدو "بشعاً" في المتصفح لكنها كنز للـ SEO
        // alternates: {
        //   languages: {
        //     ar: arabicUrl,
        //     en: englishUrl,
        //   },
        // },
      };
    });
  } catch (error) {
    console.error("Error fetching blogs for sitemap:", error);
  }

  return [...staticPages, ...servicePages, ...blogPages];
}
