import js from "@eslint/js";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import svelte from "eslint-plugin-svelte";
import prettier from "eslint-config-prettier";
import globals from "globals";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
    {
        files: ["**/*.{js,jsx}"],
        ...js.configs.recommended,
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
    },
    {
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: "module",
            },
        },
        plugins: {
            "@typescript-eslint": ts,
        },
        rules: {
            // ...ts.configs.recommended.rules,
        },
    },
    {
        // rules: {
        //     "no-unused-vars": ["error", {
        //         vars: "all",
        //         args: "after-used",
        //         ignoreRestSiblings: false,
        //         argsIgnorePattern: "^_",
        //         varsIgnorePattern: "^_",
        //         caughtErrors: "all"
        //     }],
        // },
    },
    {
        ignores: ["build/", "dist/"],
    },
];
