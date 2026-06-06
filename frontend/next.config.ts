import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},

  webpack(config) {
    config.module.rules.push({
      test: /\.module\.less$/,
      use: [
        {
          loader: "css-loader",
          options: {
            modules: {
              localIdentName: "[name]__[local]--[hash:base64:5]",
              exportOnlyLocals: false,
            },
          },
        },
        "less-loader",
      ],
    });

    return config;
  },
};

export default nextConfig;
