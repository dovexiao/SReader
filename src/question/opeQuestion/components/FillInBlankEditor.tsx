import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon, Input} from '@ui-kitten/components';
import {useOpeQuestionStore} from '../stores/opeQuestion.store.ts';

export const FillInBlankEditor = () => {
    const blanks = useOpeQuestionStore(state => state.blanks);
    const addBlank = useOpeQuestionStore(state => state.addBlank);
    const updateBlankText = useOpeQuestionStore(state => state.updateBlankText);
    const removeBlank = useOpeQuestionStore(state => state.removeBlank);

    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>答案</Text>
            {blanks.map((blank, index) => (
                <View key={blank.id} style={styles.blankRow}>
                    <Text style={styles.blankNumber}>{index + 1}.</Text>
                    <View style={{ flex: 1 }}>
                        <Input
                            value={blank.text}
                            onChangeText={(text) => updateBlankText(blank.id, text)}
                            multiline={true}
                            textStyle={styles.blankInput}
                            placeholder={`填空 ${index + 1} 的答案`}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => removeBlank(blank.id)}
                    >
                        <Icon
                            style={{ width: 20, height: 20 }}
                            name="trash-2-outline"
                            fill="#8F9BB3"
                        />
                    </TouchableOpacity>
                </View>
            ))}
            <TouchableOpacity style={styles.addButton} onPress={addBlank}>
                {/*<Plus size={20} color="#666" />*/}
                <Text style={styles.addButtonText}>添加填空</Text>
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
    blankRow: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    blankNumber: {
        width: 24,
        textAlign: 'center',
        fontSize: 14,
        color: '#333',
        marginRight: 8,
    },
    blankInput: {
        fontSize: 16,
        lineHeight: 30,
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
