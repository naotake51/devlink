import { FlatCompat } from "@eslint/eslintrc";
import typescriptEslintParser from "@typescript-eslint/parser";
import importAccess from "eslint-plugin-import-access/flat-config";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/**
 * https://www.npmjs.com/package/eslint-plugin-import-access
 */
const importAccessConfig = {
  files: ["**/*.ts", "**/*.tsx"],
  languageOptions: {
    parser: typescriptEslintParser,
    parserOptions: {
      project: true,
      sourceType: "module",
    },
  },
  plugins: {
    "import-access": importAccess,
  },
  rules: {
    "import-access/jsdoc": ["error"],
  },
};

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  importAccessConfig,
  {
    ignores: ["src/__generated__/**"],
  },
];

export default eslintConfig;
