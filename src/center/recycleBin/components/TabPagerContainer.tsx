import React, { forwardRef, useImperativeHandle } from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import Animated, { runOnJS, useAnimatedRef, useAnimatedScrollHandler } from 'react-native-reanimated';
import { useRecycleBinStore } from '@/center/recycleBin/stores';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface TabPagerContainerProps {
    children: React.ReactNode[];
}

// 定义组件暴露的方法接口
export interface TabPagerContainerAPI {
    scrollToPage: (page: number) => void;
}

export const TabPagerContainer = forwardRef<TabPagerContainerAPI, TabPagerContainerProps>(({ children }, ref) => {
    const flatListRef = useAnimatedRef<Animated.FlatList<React.ReactNode>>();

    const { setCurrentPage } = useRecycleBinStore();
    const childrenArray = React.Children.toArray(children);

    // 暴露给父组件的滑动方法
    useImperativeHandle(ref, () => ({
        scrollToPage: (page: number) => {
            if (page >= 0 && page < childrenArray.length) {
                flatListRef.current?.scrollToIndex({
                    index: page,
                    animated: true,
                });
            }
        }
    }));

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            const scrollX = event.contentOffset.x;
            const page = Math.round(scrollX / SCREEN_WIDTH);
            runOnJS(setCurrentPage)(page);
        },
        onMomentumEnd: (event) => {
            const scrollX = event.contentOffset.x;
            const page = Math.round(scrollX / SCREEN_WIDTH);
            runOnJS(setCurrentPage)(page);
        },
    });

    return (
        <Animated.FlatList
            ref={flatListRef}
            data={childrenArray}
            renderItem={({ item }) => (
                <View style={styles.page}>
                    {item}
                </View>
            )}
            initialScrollIndex={0}
            initialNumToRender={10}
            keyExtractor={(_, index) => `page-${index}`}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            onMomentumScrollEnd={scrollHandler}
            getItemLayout={(data, index) => ({
                length: SCREEN_WIDTH,
                offset: SCREEN_WIDTH * index,
                index
            })}
        />
    );
});

// TabPagerContainer.displayName = 'TabPagerContainer'; // 设置显示名称，便于调试

const styles = StyleSheet.create({
    page: {
        width: SCREEN_WIDTH,
        height: '100%',
    }
});
