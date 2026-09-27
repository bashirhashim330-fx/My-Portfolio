/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel uses the domain root; GitHub Pages uses /My-Portfolio.
  basePath: process.env.VERCEL_ENV ? '' : '/My-Portfolio',
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
