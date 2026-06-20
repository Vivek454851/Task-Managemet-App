import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    '@mui/material',
    '@mui/icons-material',
    '@mui/x-data-grid',
    '@mui/system',
  ],
};

export default nextConfig;
