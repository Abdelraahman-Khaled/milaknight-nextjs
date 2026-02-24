export const dynamic = "force-static";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      disallow: "/cdn-cgi/",
    },
    sitemap: "https://www.mila-knight.com/sitemap.xml",
  };
}
