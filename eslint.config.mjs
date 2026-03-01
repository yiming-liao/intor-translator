import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import { importConfig } from "./.config/eslint/import.mjs";
import { typescriptConfig } from "./.config/eslint/typescript.mjs";
import { unicornConfig } from "./.config/eslint/unicorn.mjs";
import { unusedImportsConfig } from "./.config/eslint/unused-imports.mjs";
import prettierPlugin from "eslint-plugin-prettier";

export default defineConfig([
  globalIgnores([
    ".yarn/**",
    ".config/**",
    "eslint.config.mjs",
    "dist",
    "coverage",
    "examples",
    "export",
    "bench",
    "scripts",
    "tsup.config.ts",
    "vitest.config.ts",
    "__test__/types",
  ]),

  js.configs.recommended,
  ...typescriptConfig,
  ...unicornConfig,
  ...importConfig,
  ...unusedImportsConfig,

  {
    settings: {
      "import/resolver": {
        typescript: {
          project: ["./tsconfig.json"],
          noWarnOnMultipleProjects: true,
        },
      },
    },
  },

  // Prettier
  {
    plugins: { prettier: prettierPlugin },
    rules: { "prettier/prettier": "warn" },
  },
]);
