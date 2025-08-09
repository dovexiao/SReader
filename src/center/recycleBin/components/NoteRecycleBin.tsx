import React, {useRef} from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import NoteRecycleBinSectionList, {
    NoteRecycleBinSectionListAPI
} from '@/center/recycleBin/components/NoteRecycleBinSectionList.tsx';
import LetterPopup, {
    LetterPopupAPI
} from '@/center/recycleBin/components/LetterPopup.tsx';
import AlphabetNavigator from '@/center/recycleBin/components/AlphabetNavigator.tsx';
import { useNoteRecycleBinStore } from '@/center/recycleBin/stores';

export const NoteRecycleBin = () => {
    const noteRecycleBinSectionListRef = useRef<NoteRecycleBinSectionListAPI>(null);
    const letterPopupRef = useRef<LetterPopupAPI>(null);

    const onLetterPress = (letter: string) => {
        letterPopupRef.current?.show(letter);
        const sectionIndex = useNoteRecycleBinStore.getState().sections.findIndex(s => s.title === letter);
        noteRecycleBinSectionListRef.current?.scrollToSection(sectionIndex);
    };

    return (
        <View style={styles.container}>
            <NoteRecycleBinSectionList ref={noteRecycleBinSectionListRef} />
            <LetterPopup ref={letterPopupRef} />
            <AlphabetNavigator onLetterPress={onLetterPress} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    }
});
