import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CheckBox, Icon, Input } from '@ui-kitten/components';
import { useOpeQuestionStore } from '../stores/opeQuestion.store.ts';

export const MultipleChoiceEditor = () => {
    const selectedType = useOpeQuestionStore(state => state.questionType);
    const options = useOpeQuestionStore(state => state.options);
    const addOption = useOpeQuestionStore(state => state.addOption);
    const removeOption = useOpeQuestionStore(state => state.removeOption);
    const updateOptionText = useOpeQuestionStore(state => state.updateOptionText);
    const updateOptionChecked = useOpeQuestionStore(state => state.updateOptionChecked);

    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>
                选项 {selectedType === '多选题' && '(可多选)'}
            </Text>
            {options.map((option, index) => (
                <View key={option.id} style={styles.optionRow}>
                    <CheckBox
                        style={styles.checkbox}
                        checked={option.checked}
                        onChange={() => updateOptionChecked(option.id, !option.checked)}
                    >
                        <></>
                    </CheckBox>
                    <View style={{ flex: 1 }}>
                        <Input
                            value={option.text}
                            onChangeText={(text) => updateOptionText(option.id, text)}
                            multiline={true}
                            textStyle={styles.optionInput}
                            placeholder={`选项 ${index + 1}`}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => removeOption(option.id)}
                    >
                        <Icon
                            style={{ width: 20, height: 20 }}
                            name="trash-2-outline"
                            fill="#8F9BB3"
                        />
                    </TouchableOpacity>
                </View>
            ))}
            <TouchableOpacity style={styles.addButton} onPress={addOption}>
                <Text style={styles.addButtonText}>添加选项</Text>
            </TouchableOpacity>
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
    optionRow: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    checkboxContainer: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    checkbox: {
        // width: 18,
        // height: 18,
        // borderWidth: 1,
        // borderColor: '#666',
        // borderRadius: 2,
        marginRight: 10,
    },
    optionInput: {
        width: '65%',
        fontSize: 16,
        lineHeight: 30,
        // color: '#333',
    },
    deleteButton: {
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: '#E4E9F2',
        borderRadius: 4,
        backgroundColor: '#F7F9FC',
        padding: 12,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 4,
        padding: 8,
        alignSelf: 'flex-start',
    },
    addButtonText: {
        marginLeft: 4,
        color: '#666',
        fontSize: 14,
    },
});
