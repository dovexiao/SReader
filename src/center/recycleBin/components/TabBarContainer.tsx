import React from 'react';
import { View, StyleSheet, Pressable, Dimensions } from 'react-native';
import { useTheme, Text, Icon } from '@ui-kitten/components';
import Animated, { useAnimatedRef } from 'react-native-reanimated';
import {useRecycleBinStore} from '@/center/recycleBin/stores';
import { Tab } from '@/center/recycleBin/types';
import { useTabContext } from '@/center/recycleBin/contexts/TabContext.tsx';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface TabBarProps {
    tabs: Tab[];
}

export const TabBarContainer: React.FC<TabBarProps> = ({ tabs }) => {
    const scrollViewRef = useAnimatedRef<Animated.ScrollView>();

    const setCurrentPage = useRecycleBinStore(state => state.setCurrentPage);
    const setTabLayouts = useRecycleBinStore((state) => state.setTabLayouts);

    const { goSelectedPage } = useTabContext();

    const onTabPress = (page: number) => {
        const tabLayout = useRecycleBinStore.getState().tabLayouts[page];
        scrollViewRef.current?.scrollTo({
            x: tabLayout.x - (SCREEN_WIDTH / 2) + (tabLayout.width / 2),
            animated: true,
        });
        setCurrentPage(page);
        goSelectedPage(page);
    };

    const onTabLayout = (index: number, event: any) => {
        const tabLayouts = useRecycleBinStore.getState().tabLayouts;
        const { x, width } = event.nativeEvent.layout;
        setTabLayouts({ ...tabLayouts, [index]: { x, width } });
    };

    return (
        <View>
            <Animated.ScrollView
                ref={scrollViewRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.tabBar}
            >
                {tabs?.map((item, index) => (
                    <TabCard
                        key={index}
                        tab={item}
                        index={index}
                        onTabPress={onTabPress}
                        onTabLayout={onTabLayout}
                    />
                ))}
            </Animated.ScrollView>

            {/*<Animated.View*/}
            {/*    style={[*/}
            {/*        styles.indicator,*/}
            {/*        {*/}
            {/*            width: SCREEN_WIDTH / tabs.length,*/}
            {/*            transform: [{ translateX: indicatorPosition }],*/}
            {/*            backgroundColor: themes['color-primary-500']*/}
            {/*        }*/}
            {/*    ]}*/}
            {/*/>*/}
        </View>
    );
};

type TabProps = {
    tab: Tab,
    index: number,
    onTabPress: (page: number) => void,
    onTabLayout: (index: number, event: any) => void,
};

const TabCard = ({ tab, index, onTabPress, onTabLayout }: TabProps) => {
    const themes = useTheme();
    const currentPage = useRecycleBinStore(state => state.currentPage);

    return (
        <Pressable
            style={({ pressed }) => [
                styles.tabItem,
                currentPage === index && { backgroundColor: themes['color-primary-100'] },
                pressed && { opacity: 0.7 }
            ]}
            onPress={() => onTabPress(index)}
            onLayout={(e) => onTabLayout(index, e)}
        >
            {tab.icon && (
                <Icon
                    name={tab.icon}
                    fill={currentPage === index ? themes['color-primary-500'] : themes['text-hint-color']}
                    style={styles.icon}
                />
            )}
            <Text
                style={[
                    styles.tabLabel,
                    { color: currentPage === index ? themes['color-primary-500'] : themes['text-hint-color'] }
                ]}
            >
                {tab.label}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        paddingTop: 10,
        paddingHorizontal: 10,
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
    },
    icon: {
        width: 22,
        height: 22,
    },
    indicator: {
        height: 3,
        position: 'absolute',
        bottom: 0,
        borderRadius: 2,
    }
});
