import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import { NavigationProps } from '../../types/navigationType.ts';
import { Button, Divider } from '@ui-kitten/components';
import TopNavigationOpe from '../../components/Main/TopNavigationOpe.tsx';
import NoteContentEditor from '../../components/Learn/note/NoteContentEditor.tsx';
import NoteTitleEditor from '../../components/Learn/note/NoteTitleEditor.tsx';
import TagsEditor from '../../components/Learn/note/TagsEditor.tsx';
import { useOpeNoteStore } from '../../stores/opeNote.store.ts';
import { useNoteStore } from '../../stores/note.store.ts';

const OpeNote: React.FC<NavigationProps> = ({ navigation }) => {
    const noteId = useOpeNoteStore(state => state.noteId);

    return (
        <SafeAreaView style={styles.safeArea}>
            <TopNavigationOpe
                title={'编辑 ' + noteId + ' 笔记'}
                navigation={navigation}
                renderItemAccessory={() => <></>}
            />
            <Divider />

            <ScrollView style={styles.container}>
                <NoteTitleEditor />

                <NoteContentEditor />

                <TagsEditor />

                <SaveStepButton navigation={navigation} />

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

const SaveStepButton = ({ navigation }: { navigation: any }) => {
    const isSaveDisabled = useOpeNoteStore(state => state.isOpeDisabled);
    const updateQuestion = useNoteStore(state => state.updateNote);

    // 处理保存
    const handleSave = () => {
        const state = useOpeNoteStore.getState();
        const newQuestion = {
            noteId: state.noteId,
            content: state.noteContent,
            tags: state.noteTags,
            lastModified: new Date().toISOString(),
        };

        updateQuestion(newQuestion);

        navigation.goBack();
    };

    return (
        <Button style={styles.endButton} onPress={() => handleSave()} disabled={isSaveDisabled}>
            <Text style={styles.endButtonText}>保存</Text>
        </Button>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F0F0F0',
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    endButton: {
        borderRadius: 4,
        padding: 12,
        alignItems: 'center',
        // marginTop: 16,
        // backgroundColor: '#3366FF',
    },
    endButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default OpeNote;
