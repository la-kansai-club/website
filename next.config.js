/** @type {import('next').NextConfig} */
const nextConfig = {
  // SanityにアップロードされたSanity画像(sanity/lib/image.tsのurlFor()が生成するcdn.sanity.io)を
  // next/imageで表示できるようにする許可リスト。これが無いと画像最適化APIが拒否し、
  // 画像が一切表示されない(2026-07-30、ヘッダーロゴが表示されない不具合として発覚・修正)。
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

module.exports = nextConfig;
