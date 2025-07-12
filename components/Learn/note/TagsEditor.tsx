import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Input, Icon, Text } from '@ui-kitten/components';
import {useOpeNoteStore} from '../../../stores/opeNote.store.ts';

const TagsEditor = () => {
    const tags = useOpeNoteStore(state => state.noteTags);
    const addTag = useOpeNoteStore(state => state.addTag);
    const removeTag = useOpeNoteStore(state => state.removeTag);
    const [tagInput, setTagInput] = useState('');

    const handleAddTag = () => {
        if (tagInput.trim() !== '') {
            addTag(tagInput.trim());
            setTagInput('');
        }
    };

    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>标签</Text>

            {tags.length > 0 && (
                <View style={styles.tagsContainer}>
                    {tags.map((tag, index) => (
                        <View key={index} style={styles.tag}>
                            <Text style={styles.tagText}>{tag}</Text>
                            <TouchableOpacity
                                style={styles.removeTagButton}
                                onPress={() => removeTag(index)}
                            >
                                <Text style={styles.removeTagButtonText}>×</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            )}

            <View style={styles.optionRow}>
                <View style={{ flex: 1 }}>
                    <Input
                        value={tagInput}
                        onChangeText={setTagInput}
                        multiline={true}
                        textStyle={styles.optionInput}
                        placeholder="输入标签"
                    />
                </View>
                <TouchableOpacity style={styles.deleteButton} onPress={handleAddTag}>
                    <Icon
                        style={{ width: 20, height: 20 }}
                        name="plus-outline"
                        fill="#8F9BB3"
                    />
                </TouchableOpacity>
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
    optionRow: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    optionInput: {
        width: '65%',
        fontSize: 14,
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
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 8,
    },
    tag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 16,
        paddingVertical: 4,
        paddingHorizontal: 12,
        marginRight: 8,
        marginBottom: 8,
    },
    tagText: {
        fontSize: 16,
        color: '#333',
    },
    removeTagButton: {
        marginLeft: 4,
        width: 16,
        height: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    removeTagButtonText: {
        backgroundColor: 'red',
        fontSize: 16,
        color: '#666',
        lineHeight: 16,
    },
});

export default TagsEditor;
