import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    env: {
        API_HOST: "http://localhost:8081/api",
        LocalHost: "http://localhost:300"
    }
};

export default nextConfig;
