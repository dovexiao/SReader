import React, { forwardRef, useImperativeHandle } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Animated, {
    useAnimatedScrollHandler,
    useSharedValue,
    useAnimatedRef,
    runOnJS,
    useAnimatedProps,
} from 'react-native-reanimated';
import { useQuestionPaginatorStore } from '../stores';
import { Question } from '../../questionBank/types';

const { width: screenWidth } = Dimensions.get('window');

type ContainerAPI = {
    scrollToPage: (page: number) => void;
    getCurrentPage: () => number;
    setScrollEnabled: (enabled: boolean) => void;
};

interface QuestionPagerContainerProps {
    questions: Question[];
    initialScrollIndex: number,
    renderItem: ({ item }: { item: Question }) => JSX.Element;
}

const QuestionPagerContainer = forwardRef<ContainerAPI, QuestionPagerContainerProps>(
    ({ questions, initialScrollIndex, renderItem }, ref) => {
        const scrollX = useSharedValue(0);
        const flatListRef = useAnimatedRef<Animated.FlatList<Question>>();
        const isScrollEnabled = useSharedValue(true);

        const setCurrentPage = useQuestionPaginatorStore((state) => state.setCurrentPage);

        // 暴露API给控制层
        useImperativeHandle(ref, () => ({
            scrollToPage: (page: number) => {
                flatListRef.current?.scrollToIndex({
                    index: page,
                    animated: true,
                });
            },
            getCurrentPage: () => {
                return Math.round(scrollX.value / screenWidth);
            },
            setScrollEnabled: (enabled) => {
                isScrollEnabled.value = enabled;
            },
        }));

        const scrollHandler = useAnimatedScrollHandler({
            onScroll: (event) => {
                scrollX.value = event.contentOffset.x;
                const page = Math.round(scrollX.value / screenWidth);
                runOnJS(setCurrentPage)(page);
            },
            onMomentumEnd: (event) => {
                scrollX.value = event.contentOffset.x;
                const page = Math.round(scrollX.value / screenWidth);
                runOnJS(setCurrentPage)(page);
            },
        });

        const animatedProps = useAnimatedProps(() => {
            return {
                scrollEnabled: isScrollEnabled.value,
            };
        });

        return (
            <Animated.FlatList
                ref={flatListRef}
                animatedProps={animatedProps}
                data={questions}
                renderItem={renderItem}
                initialScrollIndex={initialScrollIndex}
                initialNumToRender={10}
                keyExtractor={(item) => item.questionId}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={scrollHandler}
                onMomentumScrollEnd={scrollHandler}
                // scrollEnabled={isScrollEnabled.value}
                style={styles.container}
                getItemLayout={(data, index) => ({
                    length: screenWidth, // 每个item的高度
                    offset: screenWidth * index, // 累加偏移量
                    index,
                })}
            />
        );
    }
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
});

export default QuestionPagerContainer;
export type { ContainerAPI };
