import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Input} from '@ui-kitten/components';
import {useOpeQuestionStore} from '../../../stores/opeQuestion.store.ts';

const ShortAnswerEditor = () => {
    const shortAnswer = useOpeQuestionStore(state => state.shortAnswer);
    const setShortAnswer = useOpeQuestionStore(state => state.setShortAnswer);

    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>参考答案</Text>
            <Input
                value={shortAnswer}
                onChangeText={setShortAnswer}
                multiline={true}
                textStyle={styles.contentInput}
                placeholder="请输入参考答案..."
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

export default ShortAnswerEditor;
