module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["tsconfig.json"],
    createDefaultProgram: true,
  },
  plugins: ["react-refresh", "plugin:prettier/recommended"],
  rules: {
    "react-refresh/only-export-components": "warn",
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "@typescript-eslint/explicit-function-return-type": "off",
    "import/order": [
      "warn",
      {
        "pathGroups": [
          {
            "pattern": "~/**",
            "group": "external",
            "position": "after"
          }
        ],
        "newlines-between": "always-and-inside-groups"
      }
    ],
    "react/jsx-sort-props": [
      "warn",
      {
        "callbacksLast": true,
        "shorthandFirst": true,
        "noSortAlphabetically": false,
        "reservedFirst": true
      }
    ],
  }
}
