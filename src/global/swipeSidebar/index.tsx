import React, { forwardRef, useImperativeHandle } from 'react';
import {
    Dimensions,
    Pressable,
    StatusBar,
    StyleSheet,
    View
} from 'react-native';
import Animated, {
    interpolate,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import PanSwipeResponder from '@/main/components/PanSwipeResponder.tsx';

// 定义交互容器暴露的API
export type SwipeSidebarAPI = {
    show: () => void;
    hide: () => void;
    getVisible: () => boolean;
};

// 计算侧边栏宽度（占屏幕90%，与原逻辑一致）
const sidebarWidth = Dimensions.get('window').width * 0.9;

// 通用滑动交互容器：从左侧滑出，支持手势滑动关闭
const SwipeSidebar = forwardRef<SwipeSidebarAPI, { children: React.ReactNode }>(({ children }, ref) => {
    // 动画相关共享值
    const positionX = useSharedValue<number>(-sidebarWidth); // 侧边栏X轴位置（-width为隐藏，0为显示）
    const visible = useSharedValue(false); // 控制显示/隐藏状态

    // 控制遮罩层显示逻辑（根据位置动态切换）
    const display = useDerivedValue(() => {
        return visible.value ? 'flex' : 'none';
    });

    // 显示侧边栏（带动画）
    const show = () => {
        visible.value = true;
        positionX.value = withSpring(0, {
            mass: 1,
            stiffness: 100,
            damping: 20,
        });
    };

    // 隐藏侧边栏（带动画）
    const hide = () => {
        positionX.value = withSpring(-sidebarWidth, {
            mass: 1,
            stiffness: 100,
            damping: 15,
        });
        // 动画结束后隐藏（延迟500ms匹配动画时长）
        const timer = setTimeout(() => {
            visible.value = false;
            clearTimeout(timer);
        }, 500);
    };

    // 获取当前显示状态
    const getVisible = () => visible.value;

    // 暴露API给父组件
    useImperativeHandle(ref, () => ({
        show,
        hide,
        getVisible,
    }));

    // 侧边栏容器动画样式
    const containerAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: positionX.value }],
    }));

    // 遮罩层动画样式（透明度随侧边栏位置变化）
    const backdropAnimatedStyle = useAnimatedStyle(() => ({
        display: display.value,
        opacity: interpolate(positionX.value, [-sidebarWidth, 0], [0, 1]),
    }));

    return (
        <>
            {/* 半透明遮罩层：点击关闭侧边栏 */}
            <AnimatedPressable
                style={[styles.backdrop, backdropAnimatedStyle]}
                onPress={hide}
            />

            {/* 侧边栏主体：包含手势处理和传入的内容 */}
            <Animated.View style={[styles.container, containerAnimatedStyle]}>
                {/* 提升PanSwipeResponder层级：包裹所有内容，处理左滑关闭手势 */}
                <PanSwipeResponder
                    onSwipeLeft={hide} // 向左滑动时关闭
                    threshold={60} // 触发滑动的最小距离
                    minVelocity={0.7} // 触发滑动的最小速度
                >
                    {/* 预留状态栏高度 */}
                    {/*<View style={{ height: StatusBar.currentHeight }} />*/}
                    {/* 传入的子内容（如个人中心具体内容） */}
                    <View style={styles.contentContainer}>
                        {children}
                    </View>
                </PanSwipeResponder>
            </Animated.View>
        </>
    );
});

// 动画化Pressable组件
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// 基础样式
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        width: sidebarWidth,
        height: '100%',
        backgroundColor: '#F9FAFB',
        zIndex: 100,
        // borderRightWidth: 1,
        // borderColor: '#ddd',
    },
    contentContainer: {
        flex: 1,
        // paddingHorizontal: 20,
        // paddingTop: 20,
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 99,
    },
});

export default SwipeSidebar;
