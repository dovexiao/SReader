import React, {useEffect, useRef} from 'react';
import {Dimensions, Pressable, StyleSheet, View, Text} from 'react-native';
import {useTheme} from '@ui-kitten/components';
import Animated, {
    interpolate,
    runOnJS,
    SensorType, useAnimatedProps,
    useAnimatedSensor,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
    const pan = useSharedValue<number>(0);
    const selectedIndex = useSharedValue(0);
    const bottomState = useSharedValue(0);
    const gravitySensorX = useSharedValue<number>(0);
    const intervalId = useRef<NodeJS.Timeout | null>(null);
    const gravitySensorXOrigin = useSharedValue<number | null>(null);
    const themes = useTheme();

    const childrenArray = React.Children.toArray(children);
    const PAGE_COUNT = childrenArray.length;

    const gravitySensor = useAnimatedSensor(SensorType.GRAVITY);
    const tiltThreshold: number = 2;

    const latestGravityX = useSharedValue(0);

    useDerivedValue(() => {
        latestGravityX.value = gravitySensor.sensor.value.x;
    });

    const startInterval = () => {
        // console.log('开始监听传感器1');
        if (intervalId.current !== null) return;
        // console.log('开始监听传感器2')
        intervalId.current = setInterval(() => {
            if (gravitySensorXOrigin.value === null) {
                gravitySensorXOrigin.value = latestGravityX.value;
            }
            const x = latestGravityX.value - gravitySensorXOrigin.value;
            if (Math.abs(x) > tiltThreshold) {
                gravitySensorX.value = x;
                // console.log('sensorX间隔后发生变化', gravitySensorX.value);
            } else {
                gravitySensorX.value = 0;
                // console.log('sensorX间隔后发生变化', gravitySensorX.value);
            }
        }, 100);
    };

    const stopInterval = () => {
        if (intervalId.current !== null) {
            clearInterval(intervalId.current);
            intervalId.current = null;
        }
    };

    useEffect(() => {
        return () => {
            stopInterval()
        };
    }, [])

    const handleSensorTrigger = (index: number) => {
        // 'worklet';
        bottomState.value = index;
    }

    const pagePan = useDerivedValue(() => {
        const newGravitySensorX = gravitySensorX.value;
        const currentIndex = selectedIndex.value;
        // console.log('pagePan需要发生变化', newGravitySensorX);
        runOnJS(stopInterval)();

        // 向左倾斜切换上一页
        if (newGravitySensorX < 0 && currentIndex > 0) {
            // console.log('左倾斜sensorX', newGravitySensorX)
            // console.log('切换到', (currentIndex - 1) * -SCREEN_WIDTH);
            runOnJS(handleSensorTrigger)(currentIndex - 1);
            return withSpring((currentIndex - 1) * -SCREEN_WIDTH, {
                mass: 1,
                stiffness: 100,
                damping: 50,
            }, () => {
                // runOnJS(setSelectIndex)(currentIndex - 1);
                // console.log('旧值', selectedIndex.value, pan.value);
                selectedIndex.value = currentIndex - 1;
                pan.value = (currentIndex - 1) * -SCREEN_WIDTH;
                gravitySensorX.value = 0;
                // console.log('新值', selectedIndex.value, pan.value);
                runOnJS(startInterval)();
            });
        }
        // 向右倾斜切换下一页
        else if (newGravitySensorX > 0 && currentIndex < PAGE_COUNT - 1) {
            // console.log('右倾斜sensorX', newGravitySensorX)
            // console.log('切换到', (currentIndex + 1) * -SCREEN_WIDTH);
            runOnJS(handleSensorTrigger)(currentIndex + 1);
            return withSpring((currentIndex + 1) * -SCREEN_WIDTH, {
                mass: 1,
                stiffness: 100,
                damping: 50,
            }, () => {
                // runOnJS(setSelectIndex)(currentIndex + 1);
                // console.log('旧值', selectedIndex.value, pan.value);
                selectedIndex.value = currentIndex + 1;
                pan.value = (currentIndex + 1) * -SCREEN_WIDTH;
                gravitySensorX.value = 0;
                // console.log('新值', selectedIndex.value, pan.value);
                runOnJS(startInterval)();
            });
        }
        runOnJS(startInterval)();
        return pan.value;
    });

    // 动画到指定位置
    const animateToPosition = (index: number) => {
        const targetX = index * -SCREEN_WIDTH;
        bottomState.value = index;
        pan.value = withSpring(targetX, {
            mass: 1,
            stiffness: 100,
            damping: 50,
        }, () => {
            selectedIndex.value = index;
        });
        // console.log(targetX, index, pan.value);
    };

    const pageAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: pagePan.value }],
    }));

    const PAGE_WIDTH = SCREEN_WIDTH;

    const inputRange = Array.from({ length: PAGE_COUNT }, (_, i) =>
        -PAGE_WIDTH * (PAGE_COUNT - 1 - i)
    );

    const outputRange = Array.from({ length: PAGE_COUNT }, (_, i) =>
        (PAGE_WIDTH / PAGE_COUNT) * (PAGE_COUNT - 1 - i)
    );

    const indicatorAnimatedStyle = useAnimatedStyle(() => {
        const indicatorPosition = interpolate(
            pagePan.value,
            inputRange,
            outputRange,
            'clamp'
        );

        return {
            transform: [{ translateX: indicatorPosition }],
        }
    });

    return (
        <View style={styles.container}>
            {/* 滑动内容区域 */}
            <Animated.View
                style={[
                    styles.contentContainer,
                    pageAnimatedStyle,
                    {
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
                    indicatorAnimatedStyle,
                    // {
                    //     transform: [{ translateX: indicatorPosition }],
                    // },
                    {
                        width: SCREEN_WIDTH / PAGE_COUNT,
                        // transform: [{ translateX: indicatorPosition }],
                        backgroundColor: themes['color-primary-500'],
                    },
                ]}
            />
            <Animated.View style={styles.tabBar}>
                {tabs.map((item, index) => {
                    const size = useDerivedValue(() => {
                        return bottomState.value === index ? 27 : 27;
                    });

                    const color  = useDerivedValue(() => {
                        return bottomState.value === index ? themes['color-primary-500'] : '#888888';
                    });

                    const iconStyle = useAnimatedStyle(() => ({
                        color: color.value,
                        // width: size.value,
                        // height: size.value,
                    }));

                    const labelStyle = useAnimatedStyle(() => ({
                        color: color.value,
                    }));

                    const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
                    const AnimatedIcon = Animated.createAnimatedComponent(Icon);
                    const AnimatedText = Animated.createAnimatedComponent(Text);

                    return (
                        <AnimatedPressable
                            key={index}
                            style={styles.tabItem}
                            onPress={() => animateToPosition(index)}
                        >
                            {item.icon && (
                                <AnimatedIcon
                                    name={item.icon}
                                    size={size.value}
                                    style={iconStyle}
                                />
                            )}
                            {item.label && <AnimatedText
                                style={[
                                    styles.tabLabel,
                                    labelStyle,
                                ]}
                            >
                                {item.label}
                            </AnimatedText>}
                        </AnimatedPressable>
                    );
                })}
            </Animated.View>
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
