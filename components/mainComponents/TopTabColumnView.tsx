import React, {useRef, useState} from 'react';
import {View, StyleSheet, PanResponder, Animated, Dimensions, Pressable, ScrollView} from 'react-native';
import {useTheme, Text, Icon} from '@ui-kitten/components';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface Tab {
    label: string;
    icon: string;
}

type TabBottomPageViewProps = {
    tabs: Tab[];
    children: React.ReactNode;
};

const TopTabColumnView: React.FC<TabBottomPageViewProps> = ({ tabs, children }) => {
    const pan = useRef(new Animated.Value(0)).current;
    const selectedIndexRef = useRef(0);
    const [selectedIndex, setSelectIndex] = React.useState(0);
    const scrollViewRef = useRef<ScrollView>(null);
    const [tabLayouts, setTabLayouts] = useState<Record<number, { x: number; width: number }>>({});
    const themes = useTheme();

    const childrenArray = React.Children.toArray(children);
    const PAGE_COUNT = childrenArray.length;

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
                const finallyX = Math.max(-SCREEN_WIDTH * (PAGE_COUNT - 1), Math.min(baseX + newX, 0));
                // clampedX
                pan.setValue(finallyX);
            },
            onPanResponderRelease: (_, gestureState) => {
                // 判断滑动方向
                const currentIndex = selectedIndexRef.current;
                // console.log('手势滑动总距离', gestureState.dx);
                // console.log('当前选择index', currentIndex);
                if (gestureState.dx < -SCREEN_WIDTH * 0.05 && currentIndex < PAGE_COUNT - 1) {
                    animateToPosition(currentIndex + 1);
                    // handleModuleSelectedIndex(currentIndex + 1)
                } else if (gestureState.dx > SCREEN_WIDTH * 0.05 && currentIndex > 0) {
                    animateToPosition(currentIndex - 1);
                    // handleModuleSelectedIndex(currentIndex - 1)
                } else {
                    // console.log('滑动复位');
                    animateToPosition(currentIndex);
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
                animateToPosition(selectedIndexRef.current);
            },
            onPanResponderTerminationRequest: () => false,
        })
    ).current;

    // 动画到指定位置
    const animateToPosition = React.useCallback((index: number) => {
        selectedIndexRef.current = index;
        setSelectIndex(index);
        scrollToTab(index);
        Animated.spring(pan, {
            toValue: index * -SCREEN_WIDTH,
            useNativeDriver: true,
            tension: 30,
            friction: 8,
        }).start();
    }, [pan]);

    const scrollToTab = (index: number) => {
        if (index < 0 || index >= tabs.length) {return;}

        const tabLayout = tabLayouts[index];
        if (!tabLayout) {return;}

        const { x: tabX, width: tabWidth } = tabLayout;

        // 直接使用 scrollTo 方法
        scrollViewRef.current?.scrollTo({
            x: tabX - (SCREEN_WIDTH / 2) + (tabWidth / 2), // 居中滚动
            animated: true,
        });
    };

    const onTabLayout = (index: number, event: any) => {
        const { x, width } = event.nativeEvent.layout;
        setTabLayouts((prev) => ({ ...prev, [index]: { x, width } }));
    };

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

    // const PAGE_WIDTH = SCREEN_WIDTH;
    //
    // const inputRange = Array.from({ length: PAGE_COUNT }, (_, i) =>
    //     -PAGE_WIDTH * (PAGE_COUNT - 1 - i)
    // );
    //
    // const outputRange = Array.from({ length: PAGE_COUNT }, (_, i) =>
    //     (PAGE_WIDTH / PAGE_COUNT) * (PAGE_COUNT - 1 - i)
    // );
    //
    // const indicatorPosition = pan.interpolate({
    //     inputRange,
    //     outputRange,
    //     extrapolate: 'clamp',
    // });

    return (
        <View style={styles.container}>
            <View>
                <ScrollView
                    ref={scrollViewRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.tabBar}
                >
                    {tabs.map((item, index) =>(
                        <Pressable
                            key={index}
                            style={[
                                styles.tabItem,
                                selectedIndex === index && { backgroundColor: '#fff4ee' },
                            ]}
                            onPress={() => animateToPosition(index)}
                            onLayout={(e) => onTabLayout(index, e)}
                        >
                            {item.icon && <Icon
                                name={item.icon}
                                fill={selectedIndex === index ? themes['color-primary-500'] : '#888888'}
                                style={{width: 22, height: 22}}
                            />}
                            {item.label && <Text
                                style={[
                                    styles.tabLabel,
                                    selectedIndex === index && { color: themes['color-primary-500'] },
                                ]}
                            >
                                {item.label}
                            </Text>}
                            {/*{selectedIndex === index && <View style={{width: 25, height: 2, marginTop: 5,backgroundColor: themes['color-primary-500']}}/>}*/}
                        </Pressable>
                    ))}
                </ScrollView>
            </View>
            {/* 滑动内容区域 */}
            <Animated.View
                style={[
                    styles.contentContainer,
                    {
                        transform: [{ translateX: pan }],
                        width: SCREEN_WIDTH * PAGE_COUNT,
                    },
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBar: {
        paddingTop: 10,
        paddingHorizontal: 10,
        // backgroundColor: 'red'
    },
    tabItem: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginRight: 10,
        backgroundColor: '#F8F9FA',
    },
    tabLabel: {
        marginLeft: 8,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#999',
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
});

export default TopTabColumnView;
