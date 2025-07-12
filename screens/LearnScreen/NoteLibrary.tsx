import React from 'react';
import {
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { NavigationProps } from '../../types/navigationType.ts';
import TopNavigationOpe from '../../components/Main/TopNavigationOpe.tsx';
import { Divider, TopNavigationAction } from '@ui-kitten/components';
import * as CommonIcon from '../../components/Icon';
import { Note, useNoteStore } from '../../stores/note.store.ts';
import NoteCard from '../../components/Learn/note/NoteCard.tsx';

const ADD_BUTTON_COLOR = '#4CAF50';

const NoteLibrary: React.FC<NavigationProps> = ({ navigation }) => {
    const notes = useNoteStore(state => state.notes);

    const renderItem = ({ item }: { item: Note }) => (
        <NoteCard note={item} />
    );

    const renderItemAccessory = () => {
        return (
            <TopNavigationAction
                icon={CommonIcon.FileAddIcon}
                onPress={() => {
                    // 打开居中操作框
                }}
            />
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={'#ffffff'} />
            <TopNavigationOpe
                title={'笔记库'}
                navigation={navigation}
                renderItemAccessory={renderItemAccessory}
            />
            <Divider />
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text>筛选机制[题目名称/题目介绍/笔记标签]在此添加</Text>
                    {/*<View style={{ flex: 1 }}>*/}
                    {/*    <Input*/}
                    {/*        value={search}*/}
                    {/*        onChangeText={(text) => setSearch(text)}*/}
                    {/*        accessoryLeft={CommonIcon.SearchIcon}*/}
                    {/*        style={styles.searchInput}*/}
                    {/*        placeholder="搜索题面/题型/创建者/标签..."*/}
                    {/*    />*/}
                    {/*</View>*/}
                </View>
                <FlatList
                    data={notes}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.noteId}
                    contentContainerStyle={styles.listContentContainer}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
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
        paddingHorizontal: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 16,
    },
    searchInput: {
        // flex: 1,
        borderRadius: 20,
        fontSize: 14,
        color: '#333333',
        backgroundColor: '#ffffff',
        // paddingVertical: 0,
    },
    addButton: {
        backgroundColor: ADD_BUTTON_COLOR,
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
    },
    listContentContainer: {
        paddingBottom: 16,
    },
});

export default NoteLibrary;
