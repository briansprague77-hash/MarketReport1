/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.squarespace-cdn.com',
      },
      {
        protocol: 'https',
        hostname: 'admin.rocheboboistower.com',
      },
      {
        protocol: 'https',
        hostname: 'bh-3.com',
      },
      {
        protocol: 'https',
        hostname: 'viceroycwb.com',
      },
      {
        protocol: 'https',
        hostname: 'reflectionstpete.com',
      },
      {
        protocol: 'https',
        hostname: 'media.stpetecatalyst.com',
      },
      {
        protocol: 'https',
        hostname: 'www.residences400central.com',
      },
      {
        protocol: 'https',
        hostname: 's41951.pcdn.co',
      },
      {
        protocol: 'https',
        hostname: 'www.kolterurban.com',
      },
      {
        protocol: 'https',
        hostname: 'www.homesandcondostampa.com',
      },
      {
        protocol: 'https',
        hostname: 'floridayimby.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.agilitycms.com',
      },
      {
        protocol: 'https',
        hostname: 'marinapointe.com',
      },
    ],
  },
};

export default nextConfig;
