/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only use basePath for GitHub Pages, not for Vercel
  basePath: process.env.NEXT_PUBLIC_VERCEL === 'true' ? '' : '/My-Portfolio',
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
