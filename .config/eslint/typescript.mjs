import tseslint from "typescript-eslint";

export const typescriptConfig = [
  // src
  ...tseslint.configs.recommendedTypeChecked.map((config) => ({
    ...config,
    files: ["src/**/*.ts"],
    languageOptions: {
      ...(config.languageOptions ?? {}),
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: process.cwd(),
      },
    },
  })),

  // test
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: ["__test__/**/*.ts"],
    languageOptions: {
      ...(config.languageOptions ?? {}),
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: process.cwd(),
      },
    },
  })),

  // shared
  {
    rules: {
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports", fixStyle: "separate-type-imports" },
      ],
    },
  },
];
