import React, { forwardRef, useImperativeHandle } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
    interpolate,
    runOnJS,
    SensorType,
    useAnimatedSensor,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withSpring,
    Easing,
    withTiming,
} from 'react-native-reanimated';
import Icon from "react-native-vector-icons/MaterialIcons";

type AvatarActionsModalHandle = {
    show: () => void;
    hide: () => void;
};

const menuItems = [{
    title: '从相册选择',
}, {
    title: '拍照',
}, {
    title: '保存图片',
}];

const AvatarActionsModal = forwardRef<AvatarActionsModalHandle>((_, ref) => {
    const transitionTime = useSharedValue(0);
    const transitionThreshold: number = 250;

    const display = useDerivedValue(() => {
        // console.log('display', transitionTime.value);
        return transitionTime.value > 0 ? 'flex' : 'none';
    });

    const backdropStyle = useAnimatedStyle(() => ({
        display: display.value,
        opacity: interpolate(transitionTime.value, [0, transitionThreshold], [0, 1]),
    }));

    const modalStyle = useAnimatedStyle(() => ({
        display: display.value,
        // opacity: interpolate(transitionTime.value, [0, transitionThreshold], [0, 1]),
    }));

    const menuStyle = useAnimatedStyle(() => ({
        display: display.value,
        opacity: interpolate(transitionTime.value, [0, transitionThreshold], [0, 1]),
    }));

    const showActionsModal = () => {
        transitionTime.value = withTiming(transitionThreshold, {
            duration: transitionThreshold, // 动画持续时间（毫秒）
            easing: Easing.linear, // 线性插值，适合模拟时间流逝
        });
    };

    const hideActionsModal = () => {
        transitionTime.value = withTiming(0, {
            duration: transitionThreshold, // 动画持续时间（毫秒）
            easing: Easing.linear, // 线性插值，适合模拟时间流逝
        });
    };

    useImperativeHandle(ref, () => ({
        show: showActionsModal,
        hide: hideActionsModal,
    }));

    return (
        <>
            {/* 半透明遮罩层 */}
            <AnimatedPressable
                style={[styles.backdrop, backdropStyle]}
                onPress={hideActionsModal}
            />

            <Animated.View
                style={[styles.container, modalStyle]}
            >
                <Animated.View style={[styles.menuContainer, menuStyle]}>
                    {menuItems.map((item, index) => (
                        <React.Fragment key={index}>
                            <TouchableOpacity style={styles.menuItem}>
                                <Text style={styles.menuItemText}>{item.title}</Text>
                            </TouchableOpacity>
                            <View style={styles.divider}/><View/>
                        </React.Fragment>
                    ))}
                </Animated.View>
                <AnimatedTouchableOpacity style={[styles.closeButton, menuStyle]}>
                    <Text style={styles.closeButtonText}>取消</Text>
                </AnimatedTouchableOpacity>
            </Animated.View>
        </>
    );
});

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        marginBottom: 20,
        paddingHorizontal: 8,
        zIndex: 200,
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 199
    },
    menuContainer: {
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        marginBottom: 20,
        overflow: 'hidden',
    },
    menuItem: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
        // marginBottom: 1,
        backgroundColor: '#FFFFFF',
        // borderBottomWidth: 1,
        // borderBottomColor: '#F3F4F6',
    },
    menuItemText: {
        fontSize: 16,
        color: '#1F2937',
        // fontWeight: '500',
    },
    closeButton: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF',
    },
    closeButtonText: {
        fontSize: 16,
        color: '#1F2937',
        // fontWeight: '500',
    },
    divider: {
        height: 1,
        backgroundColor: '#F3F4F6',
    },
});

export default AvatarActionsModal;
