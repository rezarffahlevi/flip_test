module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@components': './src/components',
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@themes': './src/themes',
          '@hooks': './src/hooks',
          '@assets': './src/assets'
        },
      },
    ],
  ],
};
