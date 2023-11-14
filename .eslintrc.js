module.exports = {
  extends: ["eslint-config-codely/typescript"],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        project: ["./tsconfig.json"],
      },
    },
  ],
  rules: {
    "no-console": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
    "padding-line-between-statements": "off",
    "@typescript-eslint/unbound-method": "off",
    "prettier/prettier": ["error", { endOfLine: "auto", semi: false }],
    semi: ["error", "never"],
  },
}
