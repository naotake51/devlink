/**
 * https://nextjs.org/docs/app/api-reference/config/eslint#running-lint-on-staged-files
 */

// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require("path");

/**
 * FIXME::
 * eslint-plugin-import-accessの都合、ファイル変更で他ファイルがLintエラーになることがある。
 * dependency-treeを使って依存ファイルを取得する方法を検討したが大掛かりな割に解決できる問題が小さいので保留した。
 */
const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

const buildPrettierCommand = (filenames) =>
  `prettier --write --ignore-unknown ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" ")}`;

module.exports = {
  "*.{js,jsx,ts,tsx}": [buildEslintCommand],
  "**.*": [buildPrettierCommand],
};
