import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import {Dimensions, PanResponder, StyleSheet, View} from 'react-native';
import Animated, {
    Easing,
    runOnJS,
    useAnimatedRef,
    useAnimatedScrollHandler, useAnimatedStyle,
    useSharedValue,
    withSpring, withTiming
} from 'react-native-reanimated';
import {useRecycleBinStore} from '@/center/recycleBin/stores';
import {NoteRecycleBin} from '@/center/recycleBin/components/NoteRecycleBin.tsx';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface TabPagerContainerProps {
    children: React.ReactNode[];
}

// 定义组件暴露的方法接口
export interface TabPagerContainerAPI {
    scrollToPage: (page: number) => void;
}

export const TabPagerContainer = forwardRef<TabPagerContainerAPI, TabPagerContainerProps>(({ children }, ref) => {
    const scrollX = useSharedValue(0);
    const selectedIndexRef = useRef(0);

    const childrenArray = React.Children.toArray(children);
    const PAGE_COUNT = childrenArray.length;

    const setCurrentPage = useRecycleBinStore(state => state.setCurrentPage);

    // 手势响应器配置
    const panResponder = useRef(
        PanResponder.create({
            // onStartShouldSetPanResponderCapture: (_, gestureState) => {
            //     // // 捕获所有手势事件
            //     console.log('开始捕获所有手势事件', gestureState.dx, gestureState.dx, new Date());
            //     return true;
            // },
            onMoveShouldSetPanResponder: (_, gestureState) => {
                // 只响应水平滑动
                // console.log('开始响应特殊手势事件', gestureState.dx, gestureState.dy, new Date());
                const isHorizontal = Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
                const isSignificant = Math.abs(gestureState.dx) > 0;
                // console.log(isHorizontal && isSignificant);
                return isHorizontal && isSignificant;
                // return true;
            },
            onPanResponderMove: (_, gestureState) => {
                // 限制滑动范围 [-SCREEN_WIDTH, SCREEN_WIDTH]
                const currentIndex = selectedIndexRef.current;
                const newX = Math.max(-SCREEN_WIDTH, Math.min(gestureState.dx, SCREEN_WIDTH));
                const baseX = currentIndex * -SCREEN_WIDTH;
                // finallyX
                scrollX.value = Math.max(-SCREEN_WIDTH * (PAGE_COUNT - 1), Math.min(baseX + newX, 0));
            },
            onPanResponderRelease: (_, gestureState) => {
                // 判断滑动方向
                const currentIndex = selectedIndexRef.current;
                // console.log('手势滑动总距离', gestureState.dx);
                // console.log('当前选择index', currentIndex);
                if (gestureState.dx < -SCREEN_WIDTH * 0.1 && currentIndex < PAGE_COUNT - 1) {
                    scrollToPage(currentIndex + 1);
                } else if (gestureState.dx > SCREEN_WIDTH * 0.1 && currentIndex > 0) {
                    scrollToPage(currentIndex - 1);
                } else {
                    // console.log('滑动复位');
                    scrollToPage(currentIndex);
                }
            },
            onPanResponderGrant: () => {
                // console.log('手势正式激活');
            },
            onPanResponderReject: () => {
                // console.log('手势被拒绝');
            },
            onPanResponderTerminate: () => {
                // console.log('手势被系统强制终止');
                scrollToPage(selectedIndexRef.current);
            },
            onPanResponderTerminationRequest: () => false,
        })
    ).current;

    const scrollToPage = (index: number) => {
        if (index < 0 || index >= PAGE_COUNT) {
            return;
        }
        setCurrentPage(index);
        selectedIndexRef.current = index;
        scrollX.value = withTiming(index * -SCREEN_WIDTH, {
            duration: 500,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1), // 使用标准的缓动曲线，类似于iOS的默认滑动
        });
    };

    // 暴露给父组件的滑动方法
    useImperativeHandle(ref, () => ({
        scrollToPage,
    }));

    const containerStyle = useAnimatedStyle(() => ({
        transform: [{
            translateX: scrollX.value,
        }],
        width: SCREEN_WIDTH * PAGE_COUNT,
    }));

    return(
        <Animated.View
            style={[
                styles.container,
                containerStyle,
            ]}
            {...panResponder.panHandlers}
        >
            {childrenArray.map((child, index) => (
                <View
                    key={index}
                    style={[styles.page, { left: SCREEN_WIDTH * index }]}
                >
                    {child}
                </View>
            ))}
        </Animated.View>
    );
});

// TabPagerContainer.displayName = 'TabPagerContainer'; // 设置显示名称，便于调试

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        position: 'relative',
    },
    page: {
        width: SCREEN_WIDTH,
        height: '100%',
        position: 'absolute',
    },
});
