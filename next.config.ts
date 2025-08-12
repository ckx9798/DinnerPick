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
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.namu.wiki",
        port: "",
        pathname: "/i/**",
      },
      {
        protocol: "https",
        hostname: "**.ftcdn.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "blogfiles.naver.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "shop-phinf.pstatic.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "search.pstatic.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
