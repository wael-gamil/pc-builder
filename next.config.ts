import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ hostname: 'cdna.pcpartpicker.com' }],
  },
};

export default nextConfig;
