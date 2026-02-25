export const dynamic = "force-static";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/cdn-cgi/", // Cloudflare internal scripts
      ],
    },
    sitemap: "https://www.mila-knight.com/sitemap.xml",
  };
}
