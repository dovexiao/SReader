import React, {useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    StatusBar,
} from 'react-native';
import { Button, Divider } from '@ui-kitten/components';
import TopNavigationOpe from '../../../../components/Main/TopNavigationOpe.tsx';
import { useOpeNoteStore } from '../../createNote/stores';
import { useNoteStore } from '../../noteLibrary/stores';
import { NoteContentEditor, NoteIntroduceEditor, NoteTagsEditor, NoteTitleEditor } from '../../createNote/components';
import { EditNoteProps } from '../types';

const EditNote: React.FC<EditNoteProps> = ({ navigation, route }) => {
    const { noteId } = route.params;

    const note = useNoteStore(state => state.notes.filter(q => q.noteId === noteId)[0]);
    const initialize = useOpeNoteStore(state => state.initialize);
    const reset = useOpeNoteStore(state => state.reset);

    useEffect(() => {
        console.log('initialize');
        initialize(note);

        return () => {
            reset();
        };
    }, [initialize, note, reset]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={{ height: StatusBar.currentHeight, backgroundColor: '#ffffff'}} />
            <TopNavigationOpe
                title={'编辑 ' + note?.noteId + ' 笔记'}
                navigation={navigation}
                renderItemAccessory={() => <></>}
            />
            <Divider />

            <ScrollView style={styles.container}>
                <NoteTitleEditor />

                <NoteIntroduceEditor />

                <NoteContentEditor />

                <NoteTagsEditor />

                <SaveStepButton navigation={navigation} />

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

const SaveStepButton = ({ navigation }: { navigation: any }) => {
    const isSaveDisabled = useOpeNoteStore(state => state.isOpeDisabled);
    const updateNote = useNoteStore(state => state.updateNote);

    // 处理保存
    const handleSave = () => {
        const state = useOpeNoteStore.getState();
        const newQuestion = {
            noteId: state.noteId,
            content: state.noteContent,
            tags: state.noteTags,
            lastModified: new Date().toISOString(),
        };

        updateNote(newQuestion);

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

export default EditNote;
