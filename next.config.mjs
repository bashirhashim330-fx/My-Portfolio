/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages serves this project from /My-Portfolio.
  // Local builds stay at / so the generated out/index.html can be previewed in Acode/SPCK.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
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
