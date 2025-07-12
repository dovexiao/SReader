import React from 'react';
import { Text, Input } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import { useOpeNoteStore } from '../../../stores/opeNote.store.ts';

const NoteContentEditor = () => {
    const content = useOpeNoteStore(state => state.noteContent);
    const setContent = useOpeNoteStore(state => state.setNoteContent);

    const placeholder = '请输入笔记内容...';

    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>笔记内容</Text>
            <Input
                value={content}
                onChangeText={setContent}
                textStyle={styles.contentInput}
                multiline={true}
                placeholder={placeholder}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#333',
    },
    contentInput: {
        // borderWidth: 1,
        // borderColor: '#E0E0E0',
        // borderRadius: 4,
        // padding: 12,
        minHeight: 100,
        fontSize: 16,
        lineHeight: 30,
        // color: '#333',
        textAlignVertical: 'top',
    },
});

export default NoteContentEditor;
