import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Radio, RadioGroup} from '@ui-kitten/components';
import {useOpeQuestionStore} from '../stores/opeQuestion.store.ts';

export const JudgementEditor = () => {
    const correctAnswer = useOpeQuestionStore(state => state.correctAnswer);
    const setCorrectAnswer = useOpeQuestionStore(state => state.setCorrectAnswer);

    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>答案</Text>
            <View style={styles.judgementContainer}>
                <RadioGroup
                    selectedIndex={correctAnswer}
                    onChange={index => setCorrectAnswer(index)}
                >
                    <Radio>
                        正确
                    </Radio>
                    <Radio>
                        错误
                    </Radio>
                </RadioGroup>
            </View>
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
    judgementContainer: {
        flexDirection: 'row',
        marginTop: 8,
    },
});
