/** @type {import("prettier").Config} */

export default {
  plugins: [
    "prettier-plugin-astro",
    "prettier-stylelint",
    "prettier-plugin-tailwindcss",
  ],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
