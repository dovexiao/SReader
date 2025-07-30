import React from 'react';
import {
    FlatList,
    SafeAreaView, ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { NavigationProps } from '../../types/navigationType.ts';
import TopNavigationOpe from '../../components/Main/TopNavigationOpe.tsx';
import {Divider, TopNavigationAction} from '@ui-kitten/components';
import * as CommonIcon from '../../components/Icon';
import { Note, useNoteStore } from '../../stores/note.store.ts';
import NoteCard from '../../components/Learn/note/NoteCard.tsx';
import {useOpeNoteStore} from '../../stores/opeNote.store.ts';
import FilterDisplayController from '../../components/Learn/LearnMain/FilterDisplayController.tsx';

const NoteLibrary: React.FC<NavigationProps> = ({ navigation }) => {
    const reset = useOpeNoteStore(state => state.reset);

    const renderItemAccessory = () => {
        return (
            <TopNavigationAction
                icon={CommonIcon.FileAddIcon}
                onPress={() => {
                    reset();
                    navigation.navigate('AddNoteCover');
                }}
            />
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            {/*<StatusBar barStyle="dark-content" backgroundColor={'#ffffff'} translucent={false} />*/}
            <View style={{ height: StatusBar.currentHeight, backgroundColor: '#FFFFFF'}} />
            <TopNavigationOpe
                title={'笔记库'}
                navigation={navigation}
                renderItemAccessory={renderItemAccessory}
            />
            <Divider />

            {/* 使用封装的筛选控制器组件 */}
            <FilterDisplayController
                FilterContent={FilterContent}
                MainContent={MainContent}
                containerStyle={styles.container}
            />
        </SafeAreaView>
    );
};

// 主内容
const MainContent: React.FC = () => {
    const notes = useNoteStore(state => state.notes);

    const renderItem = ({ item }: { item: Note }) => (
        <NoteCard note={item} />
    );

    return (
        <FlatList
            data={notes}
            renderItem={renderItem}
            keyExtractor={(item) => item.noteId}
            contentContainerStyle={styles.listContentContainer}
            showsVerticalScrollIndicator={false}
        />
    );
};

// 筛选内容
const FilterContent: React.FC = () => {
    return (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <Text>题目名称搜索</Text>
            <Text>最近题目名称搜索</Text>
            <Text>题目介绍搜索</Text>
            <Text>最近题目介绍搜索</Text>
            <Text>标签名称搜索</Text>
            <Text>最近标签名称搜索</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F0F0F0',
    },
    container: {
        flex: 1,
        paddingTop: 16,
        // paddingHorizontal: 16,
    },
    listContentContainer: {
        paddingBottom: 16,
    },
});

export default NoteLibrary;
