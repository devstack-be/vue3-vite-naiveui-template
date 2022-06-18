module.exports = {
  root: true,
  extends: [
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:vue/vue3-recommended",
    "plugin:vuejs-accessibility/recommended",
    "prettier",
  ],
  plugins: ["@typescript-eslint", "prettier-vue"],
  env: {
    "vue/setup-compiler-macros": true,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
  },
  overrides: [
    {
      files: ['*.vue'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:vue/vue3-recommended',
        'plugin:vuejs-accessibility/recommended',
        'plugin:prettier-vue/recommended',
        'prettier',
      ],
      rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      },
    },
  ],
};
