import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useTheme } from '@ui-kitten/components';
import { useNoteRecycleBinStore } from '@/center/recycleBin/stores';

export const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('');

interface AlphabetNavigatorProps {
    onLetterPress?: (letter: string) => void;
}

const AlphabetNavigator: React.FC<AlphabetNavigatorProps> = ({ onLetterPress }) => {
    const themes = useTheme();
    const sections = useNoteRecycleBinStore(state => state.sections);
    const activeLetter = useNoteRecycleBinStore(state => state.activeLetter);

    const handleLetterPress = (letter: string) => {
        // 如果有数据才触发点击事件
        const hasData = sections.some(s => s.title === letter);
        if (hasData && onLetterPress) {
            onLetterPress(letter);
        }
    };

    return (
        <View style={styles.alphabetContainer}>
            {ALPHABET.map(letter => {
                const isActive = letter === activeLetter;
                const hasData = sections.some(s => s.title === letter);

                return (
                    <TouchableOpacity
                        key={letter}
                        onPress={() => handleLetterPress(letter)}
                        disabled={!hasData}
                        style={styles.letterButton}
                    >
                        <Text style={[
                            styles.letterText,
                            isActive && [styles.activeLetter, { color: themes['color-primary-500'] }],
                            !hasData && styles.disabledLetter,
                        ]}>
                            {letter}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    alphabetContainer: {
        position: 'absolute',
        right: 10,
        top: 0,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 15,
    },
    letterButton: {
        paddingVertical: 1,
        paddingHorizontal: 5,
    },
    letterText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#999',
    },
    activeLetter: {
        fontSize: 14,
    },
    disabledLetter: {
        color: '#ddd',
    },
});

export default AlphabetNavigator;
