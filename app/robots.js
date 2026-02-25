export const dynamic = "force-static";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/cdn-cgi/", // Cloudflare internal scripts
        "/api/", // Next.js API routes
        "/admin/", // Example private dashboard route
      ],
    },
    sitemap: "https://www.mila-knight.com/sitemap.xml",
  };
}
