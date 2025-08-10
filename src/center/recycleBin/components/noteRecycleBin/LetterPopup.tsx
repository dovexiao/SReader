import { Text } from '@ui-kitten/components';
import React, { forwardRef, useImperativeHandle } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withTiming,
    withDelay,
    cancelAnimation
} from 'react-native-reanimated';
import { useNoteRecycleBinStore } from '@/center/recycleBin/stores';

export interface LetterPopupAPI {
    show: (letter?: string) => void;
}

const LetterPopup = forwardRef<LetterPopupAPI>((props, ref) => {
    const fadeAnim = useSharedValue(0);
    const popupLetter = useNoteRecycleBinStore(state => state.popupLetter);

    // 执行动画序列
    const showAnimation = () => {
        // 取消任何正在进行的动画
        cancelAnimation(fadeAnim);

        fadeAnim.value = withSequence(
            withTiming(1, { duration: 100 }),
            withDelay(300, withTiming(0, { duration: 500 }))
        );
    };

    // 暴露给父组件的API
    useImperativeHandle(ref, () => ({
        show: (letter?: string) => {
            if (letter) {
                useNoteRecycleBinStore.setState({ popupLetter: letter });
            }
            showAnimation();
        }
    }));

    const containerStyle = useAnimatedStyle(() => ({
        opacity: fadeAnim.value,
        transform: [{ translateY: '-150%' }],
    }));

    return (
        <Animated.View style={[styles.letterPopup, containerStyle]}>
            <Text style={styles.popupText}>{popupLetter}</Text>
        </Animated.View>
    )
});

const styles = StyleSheet.create({
    letterPopup: {
        position: 'absolute',
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(240, 144, 80, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        zIndex: 98,
        top: '50%', // 确保垂直居中
    },
    popupText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default LetterPopup;
