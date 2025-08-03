import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {useOpeQuestionStore} from '../stores/opeQuestion.store.ts';

export const QuestionTypeDisplay = () => {
    const questionId = useOpeQuestionStore.getState().questionId;
    const questionType = useOpeQuestionStore.getState().questionType;

    return (
        <View style={styles.header}>
            <Text style={styles.questionId}>{questionId}</Text>
            <Text style={styles.questionType}>{questionType}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    questionId: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',
    },
    questionType: {
        fontSize: 16,
        color: '#555555',
    },
});
