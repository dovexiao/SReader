import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import {SectionList, SectionListData, StyleSheet, Text, TouchableOpacity, View, ViewToken} from 'react-native';
import { NoteSection } from '@/center/recycleBin/types';
import getItemLayout from 'react-native-get-item-layout-section-list';
import { useTheme } from '@ui-kitten/components';
import { useNoteRecycleBinStore } from '@/center/recycleBin/stores';
import { MoreOpeIcon } from '@/icon';
import { getTagColor } from '@utils/getTagColor.ts';
import { formatTime } from '@utils/formatTime.ts';
import { useGlobal } from '@contexts/GlobalContext.tsx';
import NoteRecycleBinSettingsAction from '@/center/recycleBin/components/NoteRecycleBinSettingsAction.tsx';

const ITEM_HEIGHT: number = 120;
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

    const { bottomActionSheetRef } = useGlobal();

    // 暴露给父组件的API方法
    useImperativeHandle(ref, () => ({
        scrollToSection: (sectionIndex: number) => {
            sectionListRef.current?.scrollToLocation({
                sectionIndex: Math.min(Math.max(0, sectionIndex), sections.length - 1),
                itemIndex: 1,
                viewOffset: 0,
                animated: true,
                viewPosition: 0,
            });
        },
    }));

    // 渲染列表项
    const renderSection = ({ item }: { item: NoteSection }) => (
        <View style={styles.itemContainer}>
            <View style={styles.header}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.time} numberOfLines={1} ellipsizeMode={'tail'}>{formatTime(item.createdAt, { format: 'datetime' })}</Text>
                <TouchableOpacity onPress={() => {
                    bottomActionSheetRef.current?.show(<NoteRecycleBinSettingsAction cardId={item.noteId}/>);
                }}>
                    <MoreOpeIcon width={25} height={25} color={'#000'} />
                </TouchableOpacity>
            </View>

            <Text style={styles.introduce} numberOfLines={1} ellipsizeMode={'tail'}>{item.introduce}</Text>

            <View style={styles.tagsContainer}>
                {item.tags?.map((tag, index) => (
                    <View
                        key={index}
                        style={[
                            styles.tag,
                            { backgroundColor: getTagColor() },
                        ]}
                    >
                        <Text style={styles.tagText}>{tag}</Text>
                    </View>
                ))}
            </View>
        </View>
    );

    // 渲染分组标题
    const renderSectionHeader = ({ section }: { section: SectionListData<NoteSection> }) => (
        <View style={[styles.sectionHeader, { backgroundColor: '#FFF' }]}>
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
        // backgroundColor: '#FFFFFF',
        paddingHorizontal: 15,
        // borderBottomWidth: 1,
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
        // flexDirection: 'row',
        // alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 16,
        paddingLeft: 15,
        paddingRight: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333',
        marginRight: 16,
    },
    time: {
        fontSize: 16,
        // fontWeight: 'bold',
        color: '#555555',
        // marginBottom: 8,
        flex: 1,
    },
    icon: {
        fontSize: 16,
    },
    introduce: {
        fontSize: 14,
        color: '#444444',
        marginBottom: 12,
        lineHeight: 20,
        backgroundColor: '#F5F7FA',
        padding: 16,
        borderRadius: 8,
    },
    meta: {
        fontSize: 12,
        color: '#666666',
        marginBottom: 8,
    },
    content: {
        fontSize: 14,
        color: '#444444',
        marginBottom: 12,
        lineHeight: 20,
        backgroundColor: '#F5F7FA',
        padding: 16,
        borderRadius: 8,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 8,
    },
    tag: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 16,
        marginRight: 8,
        marginBottom: 4,
    },
    tagText: {
        fontSize: 12,
        color: '#555555',
    },
});

export default NoteRecycleBinSectionList;
