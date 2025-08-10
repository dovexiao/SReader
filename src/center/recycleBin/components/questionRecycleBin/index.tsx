import React, {useRef} from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import SectionBank, {
    SectionBankAPI
} from '@/center/recycleBin/components/questionRecycleBin/SectionBank.tsx';
import LetterPopup, {
    LetterPopupAPI
} from '@/center/recycleBin/components/questionRecycleBin/LetterPopup.tsx';
import AlphabetNavigator from '@/center/recycleBin/components/questionRecycleBin/AlphabetNavigator.tsx';
import { useQuestionRecycleBinStore } from '@/center/recycleBin/stores';

export const QuestionRecycleBin = () => {
    const SectionListRef = useRef<SectionBankAPI>(null);
    const letterPopupRef = useRef<LetterPopupAPI>(null);

    const onLetterPress = (letter: string) => {
        letterPopupRef.current?.show(letter);
        const sectionIndex = useQuestionRecycleBinStore.getState().sections.findIndex(s => s.title === letter);
        SectionListRef.current?.scrollToSection(sectionIndex);
    };

    return (
        <View style={styles.container}>
            <SectionBank ref={SectionListRef} />
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
