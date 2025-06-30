module.exports = {
  output: "export",
  basePath: process.env.PAGES_BASE_PATH,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};
