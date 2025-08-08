import { Text } from '@ui-kitten/components';
import React, { useRef } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useGlobal } from '@contexts/GlobalContext.tsx';
import DeleteNoteAction from './DeleteNoteAction.tsx';
import EditIntroduceAction, { EditIntroduceActionAPI } from './EditIntroduceAction.tsx';
import RenameNoteAction, { RenameNoteActionAPI } from './RenameNoteAction.tsx';
import { useNoteStore } from '@/note/noteLibrary/stores';

export const NoteSettingsAction = ({ cardId }: { cardId: string}) => {
    const { actionDialogRef, bottomActionSheetRef } = useGlobal();
    const note = useNoteStore(state => state.notes.filter(q => q.noteId === cardId)[0]);
    const updateNote = useNoteStore(state => state.updateNote);
    const deleteNote = useNoteStore(state => state.deleteNote);
    const renameNoteActionRef = useRef<RenameNoteActionAPI>(null);
    const editIntroduceActionRef = useRef<EditIntroduceActionAPI>(null);

    const renameNote = () => {
        const title = renameNoteActionRef.current?.getTitle();
        console.log(title);
        updateNote({
            ...note,
            title: title?.trim() || note.title,
        });
    };

    const editIntroduce = () => {
        const introduce = editIntroduceActionRef.current?.getIntroduce();
        updateNote({
            ...note,
            introduce: introduce?.trim() || note.introduce,
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>设置</Text>
            </View>
            <View style={styles.actionContent}>
                <TouchableOpacity style={styles.actionObject} onPress={() => {
                    bottomActionSheetRef.current?.hide();
                    actionDialogRef.current?.show({
                        content: <RenameNoteAction ref={renameNoteActionRef} cardId={cardId} />,
                        onConfirm: renameNote,
                    });
                }}>
                    <Text style={styles.actionText}>重命名</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionObject} onPress={() => {
                    actionDialogRef.current?.show({
                        content: <EditIntroduceAction ref={editIntroduceActionRef} cardId={cardId} />,
                        onConfirm: editIntroduce,
                    });
                }}>
                    <Text style={styles.actionText}>修改简介</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionObject} onPress={() => {
                    actionDialogRef.current?.show({
                        content: <DeleteNoteAction />,
                        onConfirm: () => {
                            deleteNote(cardId);
                            bottomActionSheetRef.current?.hide();
                        },
                    });
                }}>
                    <Text style={styles.actionText}>删除</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleContainer: {
        width: '100%',
        padding: 6,
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    actionContent: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 12,
        paddingBottom: 20,
        backgroundColor: '#FFF',
    },
    actionObject: {
        width: '30%',
        aspectRatio: 1,
        backgroundColor: '#FFF',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 4,
        borderTopColor: '#FD9B37',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 3,
    },
    actionText: {
        fontSize: 14,
        // fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default NoteSettingsAction;
