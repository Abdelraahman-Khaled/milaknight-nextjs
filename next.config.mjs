const nextConfig = {
  output: "standalone",
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
};

export default nextConfig;
