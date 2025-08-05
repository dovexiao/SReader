import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView, StatusBar,
} from 'react-native';
import { NavigationProps } from '../../../../types/navigationType.ts';
import { Divider } from '@ui-kitten/components';
import TopNavigationOpe from '@/main/components/TopNavigationOpe.tsx';
import { useOpeQuestionStore } from '../stores/opeQuestion.store.ts';
import { useQuestionStore } from '../../questionBank/stores/question.store.ts';
import { TagsEditor } from '../../../note/createNote/components';

const CreateQuestionTags: React.FC<NavigationProps> = ({ navigation, route }) => {
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
            <View style={{ height: StatusBar.currentHeight, backgroundColor: '#FFFFFF'}} />
            <TopNavigationOpe
                title={'创建新题目'}
                navigation={navigation}
                renderItemAccessory={() => <></>}
            />
            <Divider />
            <TagsEditor
                title="添加标签"
                tags={tags}
                tagInput={tagInput}
                setTagInput={setTagInput}
                onAddTag={handleAddTag}
                onRemoveTag={removeTag}
                onSubmit={handleSubmit}
            />
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

export default CreateQuestionTags;
