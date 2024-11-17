const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
    transformer: {
        babelTransformerPath: require.resolve('react-native-typescript-transformer'),
    },
    resolver: {
        assetExts: assetExts.filter(ext => ext !== 'ts' && ext !== 'tsx'),
        sourceExts: [...sourceExts, 'ts', 'tsx'],
    },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
