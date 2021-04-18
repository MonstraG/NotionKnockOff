const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: false
});

module.exports = withBundleAnalyzer({
  target: process.env.BUILD_TARGET || "server",
  future: {
    webpack5: true
  },
  reactStrictMode: true
});
