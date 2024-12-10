import pluginJs from "@eslint/js"
import stylistic from "@stylistic/eslint-plugin"
import pluginImport from "eslint-plugin-import"
import globals from "globals"
import tsEslint from "typescript-eslint"

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        settings: {
            "react": {
                version: "detect"
            },
            "import/parsers": {
                "@typescript-eslint/parser": [".ts", ".tsx"]
            },
            "import/resolver": {
                node: {
                    paths: ["src"],
                    extensions: [".js", ".jsx", ".ts", ".d.ts", ".tsx"]
                },
                typescript: {
                    project: "./tsconfig.app.json"
                }
            }
        }
    },
    ...tsEslint.configs.recommended,
    pluginImport.flatConfigs.recommended,
    { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
    {
        languageOptions: {
            sourceType: "module",
            globals: {
                ...globals.node,
                ...globals.browser
            }
        }
    },
    pluginJs.configs.recommended,
    stylistic.configs["disable-legacy"],
    stylistic.configs.customize({
        indent: 4,
        quotes: "double",
        semi: false,
        commaDangle: "never",
        jsx: true
    }),
    {
        rules: {
            "react/react-in-jsx-scope": "off"
        }
    },
    {
        rules: {
            "import/order": [
                "error",
                {
                    "groups": [
                        "builtin",
                        "external",
                        "internal",
                        "parent",
                        "sibling",
                        "type",
                        "object",
                        "index"
                    ],
                    "newlines-between": "always",
                    "pathGroups": [
                        {
                            pattern: "react",
                            group: "builtin",
                            position: "after"
                        },
                        {
                            pattern: "@**",
                            group: "internal",
                            position: "after"
                        },
                        {
                            pattern: "../**",
                            group: "parent",
                            position: "after"
                        },
                        {
                            pattern: "./**",
                            group: "sibling",
                            position: "after"
                        },
                        {
                            pattern: "**.scss",
                            group: "index",
                            position: "after"
                        }
                    ],
                    "distinctGroup": true
                }
            ]
        }
    }
]
