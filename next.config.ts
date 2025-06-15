import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.notion.so',
      },
      {
        protocol: 'https',
        hostname: 'chat.openai.com',
      },
      {
        protocol: 'https',
        hostname: 'www.figma.com',
      },
      {
        protocol: 'https',
        hostname: 'www.canva.com',
      },
      {
        protocol: 'https',
        hostname: 'slack.com',
      },
      {
        protocol: 'https',
        hostname: 'claude.ai',
      },
      {
        protocol: 'https',
        hostname: 'linear.app',
      },
      {
        protocol: 'https',
        hostname: 'www.midjourney.com',
      },
      {
        protocol: 'https',
        hostname: 'framer.com',
      },
      // Domaines populaires pour les favicons et logos
      {
        protocol: 'https',
        hostname: 'logo.clearbit.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
      },
      {
        protocol: 'https',
        hostname: 'img.icons8.com',
      },
      // Domaines pour les Dev Tools
      {
        protocol: 'https',
        hostname: 'cursor.sh',
      },
      {
        protocol: 'https',
        hostname: 'code.visualstudio.com',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
      }
    ],
  },
};

export default nextConfig;
