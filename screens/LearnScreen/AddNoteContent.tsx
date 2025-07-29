import React from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    StatusBar, Text,
} from 'react-native';
import { NavigationProps } from '../../types/navigationType.ts';
import {Button, Divider, Input} from '@ui-kitten/components';
import TopNavigationOpe from '../../components/Main/TopNavigationOpe.tsx';
import {useOpeNoteStore} from "../../stores/opeNote.store.ts";
import NoteContentEditor from "../../components/Learn/note/NoteContentEditor.tsx";

const AddNoteContent: React.FC<NavigationProps> = ({ navigation }) => {
    const noteContent = useOpeNoteStore(state => state.noteContent);
    const setNoteContent = useOpeNoteStore(state => state.setNoteContent);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={{ height: StatusBar.currentHeight, backgroundColor: '#ffffff'}} />
            <TopNavigationOpe
                title={'创建新笔记'}
                navigation={navigation}
                renderItemAccessory={() => <></>}
            />
            <Divider />

            <View style={styles.container}>
                <ScrollView style={{ flex: 1 }}>

                    <NoteContentEditor />

                    <NextStepButton navigation={navigation} />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const NextStepButton = ({ navigation }: { navigation: any }) => {
    const isOpeContentDisabled = useOpeNoteStore(state => state.isOpeContentDisabled);

    const handleNext = () => {
        const state = useOpeNoteStore.getState();
        navigation.navigate('CreateNoteTag', {
            note: {
                title: state.noteTitle,
                content: state.noteContent,
                introduce: state.noteIntroduce,
            },
        });
    };

    return (
        <Button style={styles.endButton} onPress={handleNext} disabled={isOpeContentDisabled}>
            <Text style={styles.endButtonText}>下一步</Text>
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
        paddingHorizontal: 10,
        paddingVertical: 20,
        backgroundColor: '#FFFFFF',
    },
    endButton: {
        borderRadius: 4,
        padding: 12,
        alignItems: 'center',
        marginVertical: 20,
        marginBottom: 10,
        // backgroundColor: '#3366FF',
    },
    endButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default AddNoteContent;
