import React, { useRef } from 'react';
import { Text } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

/**
 * 生成随机亮色（RGB）
 * 原理：每个通道值在180-255之间，确保高亮度[1,3](@ref)
 */
function generateLightColor() {
    const minBrightness: number = 120; // 最小亮度值（确保颜色明亮）
    const r = Math.floor(Math.random() * (255 - minBrightness)) + minBrightness;
    const g = Math.floor(Math.random() * (255 - minBrightness)) + minBrightness;
    const b = Math.floor(Math.random() * (255 - minBrightness)) + minBrightness;
    return { r, g, b };
}

/**
 * 基于基础色生成浅色（加白算法）
 * 原理：通过添加白色降低饱和度，保持高亮度[8](@ref)
 */
function generatePastelColor(baseColor: { r: number; g: number; b: number }) {
    const whitenFactor: number = 0.3; // 加白系数（0.5-0.7为浅色区间）
    return {
        r: Math.min(255, Math.floor(baseColor.r + (255 - baseColor.r) * whitenFactor)),
        g: Math.min(255, Math.floor(baseColor.g + (255 - baseColor.g) * whitenFactor)),
        b: Math.min(255, Math.floor(baseColor.b + (255 - baseColor.b) * whitenFactor)),
    };
}

function getRandomColor(): string {
    // const r = Math.floor(Math.random() * 256);
    // const g = Math.floor(Math.random() * 256);
    // const b = Math.floor(Math.random() * 256);
    // 暖色调基础：R和G较高，B较低
    const lightColor = generateLightColor();
    const { r, g, b} = generatePastelColor(lightColor);

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

type RandomAvatarProps = {
    size: number;
};

const RandomAvatar: React.FC<RandomAvatarProps> = ({ size }) => {
    const colors = useRef(getRandomColor()).current;

    return (
        <View style={[styles.teamAvatar, { backgroundColor: colors, width: size, height: size, borderRadius: Math.floor(size / 2) }]}>
            <Text style={[styles.teamNumber, { fontSize: Math.floor(size / 2) }]}>用户</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    teamAvatar: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    teamNumber: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});

export default RandomAvatar;
