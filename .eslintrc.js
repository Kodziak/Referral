module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: [
    '@vue/airbnb',
    '@vue/typescript',
    'plugin:vue/recommended',
    'plugin:vue/essential',
    'plugin:vue-scoped-css/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    indent: 'off',
    '@typescript-eslint/indent': ['error', 2],
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
    'import/no-unresolved': [
      2,
      { caseSensitive: false },
    ],
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
