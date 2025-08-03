import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Input} from '@ui-kitten/components';
import {useOpeQuestionStore} from '../stores/opeQuestion.store.ts';

export const AnalysisEditor = () => {
    const analysis = useOpeQuestionStore(state => state.questionAnalysis);
    const setAnalysis = useOpeQuestionStore(state => state.setQuestionAnalysis);

    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>解析</Text>
            <Input
              value={analysis}
              onChangeText={setAnalysis}
              multiline={true}
              textStyle={styles.contentInput}
              placeholder="请输入题目解析..."
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
        minHeight: 100,
        fontSize: 16,
        lineHeight: 30,
        textAlignVertical: 'top',
    },
});
