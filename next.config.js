const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});

module.exports = withMDX({
  pageExtensions: ["js", "jsx", "md", "mdx"],
  webpack(config) {
    config.node = {
      fs: "empty",
    };

    return config;
  },
});
