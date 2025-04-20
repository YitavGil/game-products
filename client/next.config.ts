// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'm.media-amazon.com',
      'images-na.ssl-images-amazon.com',
      'image.api.playstation.com',
      'i.ibb.co',
      'cdn.vox-cdn.com',
      'static-cdn.jtvnw.net',
      'imgix.net',
      'placehold.co',
      'via.placeholder.com',
      'picsum.photos',
      'fakestoreapi.com',
      'robohash.org',
      'dummyimage.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ['mongodb'],
  },
};

export default nextConfig;