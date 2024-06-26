/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier',
  ],
  env: {
    'vue/setup-compiler-macros': true,
  },
  parserOptions: {
    ecmaVersion: '2022',
    sourceType: 'module',
  },
  "plugins": [
    "prettier"
  ],
  "rules": {
    "import/extensions": "off",
    "no-console": "error",
    "no-debug": "off",
    "no-unused-vars": "warn",
    "prefer-const": "warn",
    "prettier/prettier": [
      "error",
      {
        "singleQuote": true,
        "semi": true,
        "useTabs": true,
        "tabWidth": 2,
        "trailingComma": "all",
        "printWidth": 120,
        "bracketSpacing": true,
        "arrowParens": "avoid",
        "endOfLine": "auto"
      }
    ]
  }
}