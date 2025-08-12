import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Disable React's StrictMode for now to prevent double-rendering in development
  // which can cause hydration warnings
  reactStrictMode: false,
  swcMinify: true,
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  webpack: (config) => {
    // Important: return the modified config
    return config;
  },
  // Enable CSS modules
  cssModules: true,
  // Enable CSS imports
  cssLoaderOptions: {
    importLoaders: 1,
    modules: {
      localIdentName: '[local]___[hash:base64:5]',
    },
  },
  // Enable source maps in production
  productionBrowserSourceMaps: true,
};

export default nextConfig;
