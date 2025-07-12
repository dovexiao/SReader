import React from 'react';
import { Text, Input } from '@ui-kitten/components';
import {useOpeQuestionStore} from '../../../stores/opeQuestion.store.ts';
import {StyleSheet, View} from 'react-native';

const QuestionContentEditor = () => {
    const selectedType = useOpeQuestionStore(state => state.questionType);
    const questionContent = useOpeQuestionStore(state => state.questionContent);
    const setQuestionContent = useOpeQuestionStore(state => state.setQuestionContent);

    const placeholder = selectedType === '填空题'
        ? '请输入题目内容，使用下划线 _____ 表示填空处...'
        : selectedType === '判断题'
            ? '请输入判断题内容...'
            : '请输入题目内容...';

    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>题目内容</Text>
            <Input
                value={questionContent}
                onChangeText={setQuestionContent}
                multiline={true}
                textStyle={styles.contentInput}
                placeholder={placeholder}
            />
            {selectedType === '填空题' && (
                <Text style={styles.tipText}>提示: 使用下划线 _____ 表示填空处</Text>
            )}
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
        // borderWidth: 1,
        // borderColor: '#E0E0E0',
        // borderRadius: 4,
        // padding: 12,
        minHeight: 100,
        fontSize: 16,
        lineHeight: 30,
        // color: '#333',
        textAlignVertical: 'top',
    },
    tipText: {
        fontSize: 16,
        lineHeight: 30,
        color: '#666',
        marginTop: 8,
    },
});

export default QuestionContentEditor;
