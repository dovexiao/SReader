export const presets = ['module:@react-native/babel-preset'];
export const plugins = [[
    'react-native-reanimated/plugin',
], [
    'module-resolver',
    {
        root: ['./src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
            '@contexts': './src/contexts',
            '@Global': './src/Global',
            '@components': './src/components',
            '@assets': './src/assets',
            '@utils': './src/utils',
            '@screens': './src/screens',
            '@services': './src/services',
            '@hooks': './src/hooks',
            '@stores': './src/stores',
            '@types': './src/types',
            '@navigator': './src/navigator',
            '@/': './src',
        },
    },
]];
