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
    sitemap: "https://mila-knight.com/sitemap.xml",
  };
}
