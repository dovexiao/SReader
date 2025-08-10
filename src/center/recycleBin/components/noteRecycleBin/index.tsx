import React, {useRef} from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import SectionList, {
    SectionBankAPI
} from '@/center/recycleBin/components/noteRecycleBin/SectionBank.tsx';
import LetterPopup, {
    LetterPopupAPI
} from '@/center/recycleBin/components/noteRecycleBin/LetterPopup.tsx';
import AlphabetNavigator from '@/center/recycleBin/components/noteRecycleBin/AlphabetNavigator.tsx';
import { useNoteRecycleBinStore } from '@/center/recycleBin/stores';

export const NoteRecycleBin = () => {
    const noteRecycleBinSectionListRef = useRef<SectionBankAPI>(null);
    const letterPopupRef = useRef<LetterPopupAPI>(null);

    const onLetterPress = (letter: string) => {
        letterPopupRef.current?.show(letter);
        const sectionIndex = useNoteRecycleBinStore.getState().sections.findIndex(s => s.title === letter);
        noteRecycleBinSectionListRef.current?.scrollToSection(sectionIndex);
    };

    return (
        <View style={styles.container}>
            <SectionList ref={noteRecycleBinSectionListRef} />
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
