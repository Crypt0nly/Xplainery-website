/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Linting is run separately; don't fail production builds on style rules.
    ignoreDuringBuilds: true,
  },
  poweredByHeader: false,
};

export default nextConfig;
