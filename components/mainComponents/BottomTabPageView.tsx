import React, { useRef } from 'react';
import {View, StyleSheet, PanResponder, Animated, Dimensions, Pressable, Text} from 'react-native';
import {Icon, useTheme} from '@ui-kitten/components';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface Tab {
    icon: string;
    label: string;
}

type TabBottomPageViewProps = {
    tabs: Tab[];
    children: React.ReactNode;
};

const BottomTabPageView: React.FC<TabBottomPageViewProps> = ({ tabs, children }) => {
    const pan = useRef(new Animated.Value(0)).current;
    const selectedIndexRef = useRef(0);
    const [selectedIndex, setSelectIndex] = React.useState(0);
    const themes = useTheme();

    const childrenArray = React.Children.toArray(children);
    const PAGE_COUNT = childrenArray.length;

    // 手势响应器配置
    // const panResponder = useRef(
    //     PanResponder.create({
    //         // onStartShouldSetPanResponderCapture: (_, gestureState) => {
    //         //     // // 捕获所有手势事件
    //         //     console.log('开始捕获所有手势事件', gestureState.dx, gestureState.dx, new Date());
    //         //     return true;
    //         // },
    //         onMoveShouldSetPanResponder: (_, gestureState) => {
    //             // 只响应水平滑动
    //             // console.log('开始响应特殊手势事件', gestureState.dx, gestureState.dy, new Date());
    //             const isHorizontal = Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
    //             const isSignificant = Math.abs(gestureState.dx) > 0;
    //             // console.log(isHorizontal && isSignificant);
    //             return isHorizontal && isSignificant;
    //             // return true;
    //         },
    //         onPanResponderMove: (_, gestureState) => {
    //             // 限制滑动范围 [-SCREEN_WIDTH, SCREEN_WIDTH]
    //             const currentIndex = selectedIndexRef.current;
    //             const newX = Math.max(-SCREEN_WIDTH, Math.min(gestureState.dx, SCREEN_WIDTH));
    //             const baseX = currentIndex * -SCREEN_WIDTH;
    //             const finallyX = Math.max(-SCREEN_WIDTH * 3, Math.min(baseX + newX, 0));
    //             // clampedX
    //             pan.setValue(finallyX);
    //         },
    //         onPanResponderRelease: (_, gestureState) => {
    //             // 判断滑动方向
    //             const currentIndex = selectedIndexRef.current;
    //             // console.log('手势滑动总距离', gestureState.dx);
    //             // console.log('当前选择index', currentIndex);
    //             if (gestureState.dx < -SCREEN_WIDTH * 0.05 && currentIndex < 3) {
    //                 animateToPosition(currentIndex + 1);
    //                 // handleModuleSelectedIndex(currentIndex + 1)
    //             } else if (gestureState.dx > SCREEN_WIDTH * 0.05 && currentIndex > 0) {
    //                 animateToPosition(currentIndex - 1);
    //                 // handleModuleSelectedIndex(currentIndex - 1)
    //             } else {
    //                 // console.log('滑动复位');
    //                 animateToPosition(currentIndex);
    //             }
    //         },
    //         onPanResponderGrant: () => {
    //             // console.log('手势正式激活');
    //         },
    //         onPanResponderReject: () => {
    //             // console.log('手势被拒绝');
    //         },
    //         onPanResponderTerminate: () => {
    //             // console.log('手势被系统强制终止');
    //             animateToPosition(selectedIndexRef.current);
    //         },
    //         onPanResponderTerminationRequest: () => false,
    //     })
    // ).current;

    // 动画到指定位置
    const animateToPosition = React.useCallback((index: number) => {
        selectedIndexRef.current = index;
        setSelectIndex(index);
        Animated.spring(pan, {
            toValue: index * -SCREEN_WIDTH,
            useNativeDriver: true,
            tension: 30,
            friction: 8,
        }).start();
    }, [pan]);

    // React.useEffect(() => {
    //     const listener = pan.addListener(value => {
    //         // console.log('pan value:', value.value);
    //     });
    //
    //     // 清除监听器
    //     return () => {
    //         pan.removeListener(listener);
    //     };
    // }, [pan]);

    const PAGE_WIDTH = SCREEN_WIDTH;

    const inputRange = Array.from({ length: PAGE_COUNT }, (_, i) =>
        -PAGE_WIDTH * (PAGE_COUNT - 1 - i)
    );

    const outputRange = Array.from({ length: PAGE_COUNT }, (_, i) =>
        (PAGE_WIDTH / PAGE_COUNT) * (PAGE_COUNT - 1 - i)
    );

    const indicatorPosition = pan.interpolate({
        inputRange,
        outputRange,
        extrapolate: 'clamp',
    });

    return (
        <View style={styles.container}>
            {/* 滑动内容区域 */}
            <Animated.View
                style={[
                    styles.contentContainer,
                    {
                        transform: [{ translateX: pan }],
                        width: SCREEN_WIDTH * 4,
                    },
                ]}
                // {...panResponder.panHandlers}
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
            <Animated.View
                style={[
                    styles.indicator,
                    {
                        width: SCREEN_WIDTH / PAGE_COUNT,
                        transform: [{ translateX: indicatorPosition }],
                        backgroundColor: themes['color-primary-500'],
                    },
                ]}
            />
            <View style={styles.tabBar}>
                {tabs.map((item, index) => {
                    // const Icon = item.icon;
                    const isActive = selectedIndex === index;

                    return (
                        <Pressable
                            key={index}
                            style={styles.tabItem}
                            onPress={() => animateToPosition(index)}
                        >
                            {item.icon && <Icon
                                name={item.icon}
                                fill={isActive ? themes['color-primary-500'] : '#888888'}
                                style={{width: isActive ? 27 : 24, height: isActive ? 27 : 24}}
                            />}
                            {item.label && <Text
                                style={[
                                    styles.tabLabel,
                                    {color: isActive ? themes['color-primary-500'] : '#888888'},
                                ]}
                            >
                                {item.label}
                            </Text>}
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0',
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'row',
        position: 'relative',
    },
    page: {
        width: SCREEN_WIDTH,
        height: '100%',
        position: 'absolute',
    },
    tabBar: {
        flexDirection: 'row',
        height: 70,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#EEEEEE',
    },
    indicator: {
        top: 0,
        height: 4,
        borderRadius: 0,
        zIndex: 0,
    },
    tabItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    tabLabel: {
        fontSize: 12,
        marginTop: 4,
    },
});

export default BottomTabPageView;
