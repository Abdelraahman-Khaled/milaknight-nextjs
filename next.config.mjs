const nextConfig = {
  output: "standalone",
  compress: true, // Enable gzip/brotli compression

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mila-knight.com",
      },
      {
        protocol: "https",
        hostname: "backend.mila-knight.com",
      },
      {
        protocol: "https",
        hostname: "**.mila-knight.com",
      },
      {
        protocol: "https",
        hostname: "img.logo.dev",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.mila-knight.com",
          },
        ],
        destination: "https://mila-knight.com/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|png|webp|avif|css|js|woff2|woff)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};


export default nextConfig;
