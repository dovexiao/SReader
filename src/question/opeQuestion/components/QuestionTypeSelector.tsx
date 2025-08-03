import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {QuestionType, useOpeQuestionStore} from '../stores/opeQuestion.store.ts';

const QUESTION_TYPES = ['单选题', '多选题', '填空题', '判断题', '简答题'];

export const QuestionTypeSelector = () => {
    const selectedType = useOpeQuestionStore(state => state.questionType);
    const setSelectedType = useOpeQuestionStore(state => state.setQuestionType);

    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>选择题型</Text>
            <View style={styles.typeContainer}>
                {QUESTION_TYPES.map((type) => (
                    <TouchableOpacity
                        key={type}
                        style={[
                            styles.typeButton,
                            selectedType === type && styles.selectedTypeButton,
                        ]}
                        onPress={() => setSelectedType(type as QuestionType)}
                    >
                        <Text style={[
                            styles.typeButtonText,
                            selectedType === type && styles.selectedTypeButtonText,
                        ]}>
                            {type}
                        </Text>
                    </TouchableOpacity>
                ))}
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
    typeContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        padding: 4,
    },
    typeButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 4,
        marginRight: 4,
    },
    selectedTypeButton: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1,
    },
    typeButtonText: {
        color: '#666',
        fontSize: 16,
    },
    selectedTypeButtonText: {
        color: '#333',
        fontWeight: '500',
    },
});
