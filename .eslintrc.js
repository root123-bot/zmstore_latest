module.exports = {
  root: true,
  extends: ['@react-native-community', 'eslint-config-prettier'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react-hooks'],
  env: {
    jest: true,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-undef': 'off',
        'jsx-quotes': ['off'],
        semi: 'off',
        'react-hooks/rules-of-hooks': 'error', // For checking rules of hooks
        'react-hooks/exhaustive-deps': 'warn',
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': [
          2,
          { ignoreFunctionTypeParameterNameValueShadow: true },
        ],
        quotes: 'off',
        'prettier/prettier': 'off',
      },
    },
  ],
};
