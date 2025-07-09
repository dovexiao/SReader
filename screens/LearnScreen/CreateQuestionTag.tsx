import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import { NavigationProps } from '../../types/navigationType.ts';
import { Button, Divider, Icon, Input } from '@ui-kitten/components';
import TopNavigationOpe from '../../components/MainComponents/TopNavigationOpe.tsx';
import { useOpeQuestionStore } from '../../stores/opeQuestion.store.ts';
import { useQuestionStore } from '../../stores/question.store.ts';

const CreateQuestionTag: React.FC<NavigationProps> = ({ navigation, route }) => {
    const question = route.params?.question;

    const [tagInput, setTagInput] = useState('');
    const tags = useOpeQuestionStore(state => state.questionTags);
    const addTag = useOpeQuestionStore(state => state.addTag);
    const removeTag = useOpeQuestionStore(state => state.removeTag);
    const createQuestion = useQuestionStore(state => state.createQuestion);

    const handleAddTag = () => {
        if (tagInput.trim() !== '') {
            addTag(tagInput.trim());
            setTagInput('');
        }
    };

    const handleSubmit = () => {
        createQuestion({
            ...question,
            tags,
            createdAt: new Date().toISOString(),
            lastModified: new Date().toISOString(),
        });
        navigation.goBack();
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <TopNavigationOpe
                title={'创建新题目'}
                navigation={navigation}
                renderItemAccessory={() => <></>}
            />
            <Divider />
            <View style={styles.container}>
                <Text style={styles.title}>添加标签</Text>

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

                <View style={styles.inputContainer}>
                    <View style={{ flex: 1 }}>
                        <Input
                            value={tagInput}
                            onChangeText={setTagInput}
                            multiline={true}
                            textStyle={styles.input}
                            placeholder="输入标签"
                        />
                    </View>
                    <TouchableOpacity style={styles.addButton} onPress={handleAddTag}>
                        <Icon
                            style={{ width: 20, height: 20 }}
                            name="plus-outline"
                            fill='#8F9BB3'
                        />
                    </TouchableOpacity>
                </View>

                <Button style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>提交</Text>
                </Button>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F0F0F0',
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    input: {
        fontSize: 14,
    },
    addButton: {
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
    addButtonText: {
        color: '#4CAF50',
        fontSize: 14,
        fontWeight: '500',
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 24,
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
        fontSize: 14,
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
        fontSize: 16,
        color: '#666',
        lineHeight: 16,
    },
    submitButton: {
        borderRadius: 4,
        padding: 12,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default CreateQuestionTag;
