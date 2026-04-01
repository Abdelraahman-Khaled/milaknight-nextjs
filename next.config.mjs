const nextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
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
