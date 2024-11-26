import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    env: {
        API_HOST: process.env.NEXT_PUBLIC_API_BASE_URL,
        LocalHost: process.env.SELF_URL
    }
};

export default nextConfig;
