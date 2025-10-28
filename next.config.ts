import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/wikipedia/**',
      },
      {
        protocol: 'https',
        hostname: 'www.vhv.rs',
        port: '',
        pathname: '/dpng/**',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        port: '',
        pathname: '/images**',
      },
      {
        protocol: 'https',
        hostname: 'static.wikia.nocookie.net',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'img.noriginmedia.com',
        port: ''
      }
    ],
  },
};

export default nextConfig;
