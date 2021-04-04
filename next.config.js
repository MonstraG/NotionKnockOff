module.exports = {
  target: process.env.BUILD_TARGET || "server",
  future: {
    webpack5: true
  },
  reactStrictMode: true
};
