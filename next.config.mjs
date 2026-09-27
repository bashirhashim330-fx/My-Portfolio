/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages needs /My-Portfolio; Vercel needs empty basePath
  basePath: process.env.VERCEL ? '' : '/My-Portfolio',
  output: 'export',
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
