module.exports = {
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    'prettier',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    'vue/setup-compiler-macros': true,
  },
  plugins: ['prettier', 'vue'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: false,
    },
    ecmaVersion: 2022, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  rules: {
    'vue/no-v-html': 'off',
  },
  overrides: [],
};
