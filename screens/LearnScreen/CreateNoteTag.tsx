import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView, StatusBar,
} from 'react-native';
import { NavigationProps } from '../../types/navigationType.ts';
import { Button, Divider, Icon, Input } from '@ui-kitten/components';
import TopNavigationOpe from '../../components/Main/TopNavigationOpe.tsx';
import {useOpeNoteStore} from "../../stores/opeNote.store.ts";
import {useNoteStore} from "../../stores/note.store.ts";
import TagsEditor from "../../components/Learn/LearnMain/TagsEditor.tsx";

const CreateNoteTag: React.FC<NavigationProps> = ({ navigation, route }) => {
    const note = route.params?.note;

    const [tagInput, setTagInput] = useState('');
    const tags = useOpeNoteStore(state => state.noteTags);
    const addTag = useOpeNoteStore(state => state.addTag);
    const removeTag = useOpeNoteStore(state => state.removeTag);
    const createNote = useNoteStore(state => state.createNote);

    const handleAddTag = () => {
        if (tagInput.trim() !== '') {
            addTag(tagInput.trim());
            setTagInput('');
        }
    };

    const handleSubmit = () => {
        createNote({
            ...note,
            tags,
            createdAt: new Date().toISOString(),
            lastModified: new Date().toISOString(),
        });
        navigation.goBack();
        navigation.goBack();
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={{ height: StatusBar.currentHeight, backgroundColor: '#FFFFFF'}} />
            <TopNavigationOpe
                title={'创建新笔记'}
                navigation={navigation}
                renderItemAccessory={() => <></>}
            />
            <Divider />
            <TagsEditor
                title="添加标签"
                tags={tags}
                tagInput={tagInput}
                setTagInput={setTagInput}
                onAddTag={handleAddTag}
                onRemoveTag={removeTag}
                onSubmit={handleSubmit}
            />
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
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
});

export default CreateNoteTag;
