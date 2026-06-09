import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.module.less": {
        loaders: [{ loader: "less-loader", options: { sourceMap: true } }],
        as: "*.module.css",
      },
    },
  },

  webpack(config) {
    const rules = config.module.rules.find(
      (r: { oneOf?: unknown[] }) => r.oneOf,
    ) as { oneOf: Record<string, unknown>[] } | undefined;
    if (rules) {
      const cssModuleRule = rules.oneOf.find(
        (r: Record<string, unknown>) =>
          r.test instanceof RegExp &&
          r.test.test(".module.css") &&
          r.issuerLayer &&
          typeof r.issuerLayer === "object" &&
          "or" in r.issuerLayer,
      );
      if (cssModuleRule) {
        rules.oneOf.unshift({
          ...cssModuleRule,
          test: /\.module\.less$/,
          use: [
            ...(Array.isArray(cssModuleRule.use) ? cssModuleRule.use : []),
            { loader: "less-loader", options: { sourceMap: true } },
          ],
        });
      }
    }

    return config;
  },
};

export default nextConfig;
