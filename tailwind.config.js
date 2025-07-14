module.exports = {
  plugins: [require("@tailwindcss/typography")],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: {
              maxWidth: "100ch",
            },
            "code::before": {
              content: "",
            },
            "code::after": {
              content: "",
            },
          },
        },
      },
    },
  },
};
