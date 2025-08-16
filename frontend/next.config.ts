/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization
  images: {
    domains: ['images.unsplash.com'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', 'react-icons'],
    optimizeCss: true,
  },
  
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Bundle analyzer (optional - remove in production)
  // ...(process.env.ANALYZE === 'true' && {
  //   webpack: (config: any) => {
  //     config.plugins.push(
  //       new (require('@next/bundle-analyzer'))({
  //         enabled: true,
  //       })
  //     );
  //     return config;
  //   },
  // }),
  
  // TypeScript and ESLint
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Headers for performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          // Performance headers
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
        ],
      },
      {
        source: '/resume.pdf',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'ALLOWALL',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
