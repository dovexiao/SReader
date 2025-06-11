// metro.config.js
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

// 获取默认配置
const defaultConfig = getDefaultConfig(__dirname);

// 添加资源处理器
const customConfig = {
    transformer: {
        getTransformOptions: async () => ({
            transform: {
                experimentalImportSupport: false,
                inlineRequires: true,
            },
        }),
        // 添加资源处理
        babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
        // 确保包含图片资源扩展名
        assetExts: [...defaultConfig.resolver.assetExts, 'png', 'jpg', 'jpeg', 'gif'],
        sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
    },
};

// 合并配置并应用 Reanimated 包装
const mergedConfig = mergeConfig(defaultConfig, customConfig);
module.exports = wrapWithReanimatedMetroConfig(mergedConfig);
