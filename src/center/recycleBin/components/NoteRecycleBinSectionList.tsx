import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { SectionList, SectionListData, StyleSheet, Text, View, ViewToken } from 'react-native';
import { NoteSection } from '@/center/recycleBin/types';
import getItemLayout from 'react-native-get-item-layout-section-list';
import { useTheme } from '@ui-kitten/components';
import { useNoteRecycleBinStore } from "@/center/recycleBin/stores";

const ITEM_HEIGHT: number = 80;
const HEADER_HEIGHT: number = 40;

const buildGetItemLayout = getItemLayout<NoteSection>({
    getItemHeight: ITEM_HEIGHT,
    getSectionHeaderHeight: HEADER_HEIGHT,
});

export interface NoteRecycleBinSectionListAPI {
    scrollToSection: (sectionIndex: number) => void;
}

const NoteRecycleBinSectionList = forwardRef<NoteRecycleBinSectionListAPI>((_, ref) => {
    const sectionListRef = useRef<SectionList<NoteSection>>(null);
    const themes = useTheme();

    const sections = useNoteRecycleBinStore(state => state.sections);
    const setActiveLetter = useNoteRecycleBinStore(state => state.setActiveLetter);

    // 暴露给父组件的API方法
    useImperativeHandle(ref, () => ({
        scrollToSection: (sectionIndex: number) => {
            sectionListRef.current?.scrollToLocation({
                sectionIndex: Math.min(Math.max(0, sectionIndex), sections.length - 1),
                itemIndex: 1,
                viewOffset: 0,
                animated: true,
                viewPosition: 0, // 滚动到顶部
            });
        }
    }));

    // 渲染列表项
    const renderSection = ({ item }: { item: NoteSection }) => (
        <View style={styles.itemContainer}>
            <Text>123456</Text>
        </View>
    );

    // 渲染分组标题
    const renderSectionHeader = ({ section }: { section: SectionListData<NoteSection> }) => (
        <View style={styles.sectionHeader}>
            <Text style={[styles.sectionHeaderText, { color: themes['color-primary-500'] }]}>{section.title}</Text>
        </View>
    );

    // 记录当前可视分组
    const onViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
        if (viewableItems.length > 0) {
            const firstItem = viewableItems[0];
            if (firstItem.section) {
                setActiveLetter(firstItem.section.title);
            }
        }
    };

    return (
        <SectionList
            ref={sectionListRef}
            sections={sections}
            keyExtractor={(_, index) => 'section' + index}
            renderItem={renderSection}
            renderSectionHeader={renderSectionHeader}
            stickySectionHeadersEnabled
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{ itemVisiblePercentThreshold: 100 }}
            contentContainerStyle={styles.contentContainer}
            getItemLayout={buildGetItemLayout}
        />
    );
});

const styles = StyleSheet.create({
    sectionHeader: {
        height: HEADER_HEIGHT,
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
    },
    sectionHeaderText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    contentContainer: {
        paddingBottom: 20,
    },
    itemContainer: {
        height: ITEM_HEIGHT,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 16,
        paddingHorizontal: 15,
        // marginHorizontal: 15,
        // marginVertical: 10,
        // borderRadius: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
});

export default NoteRecycleBinSectionList;
