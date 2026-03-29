const nextConfig = {
  output: 'standalone',
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mila-knight.com',
      },
      {
        protocol: 'https',
        hostname: 'backend.mila-knight.com',
      },
      {
        protocol: 'https',
        hostname: '**.mila-knight.com',
      },
      {
        protocol: 'https',
        hostname: 'img.logo.dev',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
    ],
  },
};

export default nextConfig;
