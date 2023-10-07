module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ios.js',
          '.android.js',
          '.ios.jsx',
          '.android.jsx',
          '.js',
          '.jsx',
          '.json',
          '.ts',
          '.tsx',
        ],
        alias: {
          '@src': './src',
          '@components': './src/components',
          '@api': './src/api',
          '@queries': './src/queries',
          '@i18n': './i18n/supportedLanguages.ts',
          '@theme': './nativeBaseTheme.ts',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
