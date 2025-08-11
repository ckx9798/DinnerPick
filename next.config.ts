/**
 * @format
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
        pathname: "/**", // via.placeholder.com 의 모든 경로 허용
      },
      {
        protocol: "https",
        hostname: "i.namu.wiki",
        port: "",
        pathname: "/i/**", // i.namu.wiki 의 /i/ 로 시작하는 모든 경로 허용
      },
    ],
  },
};

export default nextConfig;
