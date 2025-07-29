import React, { useState } from 'react';
import {useOpeNoteStore} from '../../../stores/opeNote.store.ts';
import TagsEditor from "../LearnMain/TagsEditor.tsx";

const NoteTagsEditor = () => {
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
        <TagsEditor
            title="添加标签"
            tags={tags}
            tagInput={tagInput}
            setTagInput={setTagInput}
            onAddTag={handleAddTag}
            onRemoveTag={removeTag}
        />
    );
};

export default NoteTagsEditor;
