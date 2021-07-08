const path = require("path");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: false
});

module.exports = withBundleAnalyzer({
  webpack: (config) => {
    config.resolve.alias["~"] = path.resolve(__dirname);
    return config;
  },
  reactStrictMode: true
});
