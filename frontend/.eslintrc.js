module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      'airbnb',
      'plugin:react/recommended',
      'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays Prettier errors as ESLint errors.
      'prettier', // Turns off all ESLint rules that are unnecessary or might conflict with Prettier.
    ],
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 12,
      sourceType: 'module',
    },
    plugins: ['react'],
    rules: {
      // Your custom rules here
    },
  };