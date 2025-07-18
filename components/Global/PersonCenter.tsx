import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import {Alert, Dimensions, Pressable, StatusBar, StyleSheet, Text, View} from 'react-native';
import { useTheme } from '@ui-kitten/components';
import Animated, {
    interpolate,
    runOnJS,
    SensorType,
    useAnimatedSensor,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';

type PersonCenterHandle = {
    show: () => void;
    hide: () => void;
};

const modelWidth = Dimensions.get('window').width * 0.8;

const PersonCenter = forwardRef<PersonCenterHandle>((_, ref) => {
    const positionX = useSharedValue<number>(-modelWidth);
    const visible = useSharedValue(false);
    const display = useDerivedValue(() => {
        if (visible.value) {
            return 'flex';
        // } else if (positionX.value < -modelWidth / 4) {
        //     return 'none';
        }
        return 'none';
    });

    const showPersonCenter = () => {
        // Alert.alert('show');
        visible.value = true;
        positionX.value = withSpring(0, {
            mass: 1,
            stiffness: 100,
            damping: 20,
        });
    };

    const hidePersonCenter = () => {
        // Alert.alert('hide');
        positionX.value = withSpring(-modelWidth, {
            mass: 1,
            stiffness: 100,
            damping: 15,
        }, () => {
            // visible.value = false;
        });
        const timer = setTimeout(() => {
            visible.value = false;
            clearTimeout(timer);
        }, 500);
    };

    useImperativeHandle(ref, () => ({
        show: showPersonCenter,
        hide: hidePersonCenter,
    }));

    const containerStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: positionX.value }]
    }));

    const backdropStyle = useAnimatedStyle(() => ({
        display: display.value,
        opacity: interpolate(positionX.value, [-modelWidth, 0], [0, 1]),
    }));

    return (
        <>
            {/*<StatusBar barStyle="light-content" backgroundColor={'rgba(255,255,255,0)'} translucent={true} />*/}

            {/* 半透明遮罩层 */}
            <AnimatedPressable
                style={[styles.backdrop, backdropStyle]}
                onPress={hidePersonCenter}
            />

            {/* 侧边栏主体 */}
            <Animated.View style={[styles.container, containerStyle]}>
                <LinearGradient
                    style={{ flex: 1 }}
                    colors={['#dbeefd', '#ffffff']}
                >
                    <View style={styles.content}>
                        <View style={{ height: StatusBar.currentHeight }} />
                        <Text style={styles.title}>个人中心</Text>
                        <Pressable onPress={hidePersonCenter}>
                            <Text style={styles.closeButton}>关闭</Text>
                        </Pressable>
                    </View>
                </LinearGradient>
            </Animated.View>
        </>
    );
});

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        width: modelWidth,
        height: '100%',
        backgroundColor: '#ffffff',
        zIndex: 100,
        borderRightWidth: 1,
        borderColor: '#ddd'
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20
    },
    closeButton: {
        color: 'blue',
        padding: 10
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 99
    }
});

export default PersonCenter;
