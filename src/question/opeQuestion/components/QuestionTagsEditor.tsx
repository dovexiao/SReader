import React, { useState } from 'react';
import { useOpeQuestionStore } from '../stores/opeQuestion.store.ts';
import { TagsEditor } from '../../../note/createNote/components';

export const QuestionTagsEditor = () => {
    const tags = useOpeQuestionStore(state => state.questionTags);
    const addTag = useOpeQuestionStore(state => state.addTag);
    const removeTag = useOpeQuestionStore(state => state.removeTag);
    const [tagInput, setTagInput] = useState('');

    const handleAddTag = () => {
        if (tagInput.trim() !== '') {
            addTag(tagInput.trim());
            setTagInput('');
        }
    };

    return (
        <TagsEditor
            title="标签"
            tags={tags}
            tagInput={tagInput}
            setTagInput={setTagInput}
            onAddTag={handleAddTag}
            onRemoveTag={removeTag}
        />
    );
};
