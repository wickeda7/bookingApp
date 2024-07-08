module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['react-native-reanimated/plugin'],
      [
        'module-resolver',
        {
          extensions: ['.ios.js', '.android.js', '.ios.jsx', '.android.jsx', '.js', '.jsx', '.json', '.ts', '.tsx'],
          root: ['.'],
          alias: {
            '@api': './src/api',
            '@assets': './assets',
            '@components': './src/components',
            '@screens': './src/screens',
            '@utils': './src/utils',
            '@languages': './src/languages',
            '@hooks': './src/hooks',
            '@contexts': './src/contexts',
            '@constants': './src/constants',
            '@navigation': './src/navigation',
            '@theme': './src/theme',
            '@redux': './src/redux',
            '@services': './src/services',
          },
        },
      ],
      [
        'module:react-native-dotenv',
        {
          envName: 'APP_ENV',
          moduleName: '@env',
          path: '.env',
        },
      ],
    ],
  };
};
