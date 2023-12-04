/** @type {import("eslint").Linter.Config} */

const config = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  plugins: ["tailwindcss"],
  extends: [
    "next/core-web-vitals",
    "prettier",
    "plugin:tailwindcss/recommended",
  ],
  rules: {},
  settings: {
    tailwindcss: {
      callees: ["cn", "cva"],
      config: "./tailwind.config.ts",
      classRegex: "^(class(Name)?|tw)$",
    },
    next: {
      rootDir: ["./"],
    },
  },
}

module.exports = config
