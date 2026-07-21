/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Local SVG/JPEG placeholders live in /public/images. Add remote patterns here
    // only if real photos are ever served from a CDN.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
