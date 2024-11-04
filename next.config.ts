import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    env: {
        API_HOST: "http://localhost:8081",
        LocalHost: "http://localhost:3000"
    }
};

export default nextConfig;
