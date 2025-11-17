// @ts-check
import * as eslint from "@eslint/js";
import * as tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig(
    eslint.configs.recommended,
    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylisticTypeChecked,
    globalIgnores(["**/idl_type.ts", "**/dist/**"]),
    {
        rules: {
            "no-console": "error",
            "@typescript-eslint/consistent-type-definitions": 0,
            "@typescript-eslint/restrict-template-expressions": 0,
            "@typescript-eslint/no-confusing-void-expression": 0,
            "@typescript-eslint/require-await": 0,
            "@typescript-eslint/no-unnecessary-condition": 0,
            "@typescript-eslint/no-unsafe-argument": 0,
        },
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
);