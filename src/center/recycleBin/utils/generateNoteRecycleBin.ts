// 生成示例数据
import { NoteSection } from '@/center/recycleBin/types';
import { ALPHABET } from '@/center/recycleBin/components/AlphabetNavigator.tsx';
import { SectionListData } from 'react-native';

export const generateNoteRecycleBin = (): SectionListData<NoteSection>[] => {
    const sectionListData: SectionListData<NoteSection>[] = [];

    ALPHABET.forEach(letter => {
        const noteSections: NoteSection[] = [];
        const noteCount: number = Math.floor(Math.random() * 5);

        for (let i = 1; i <= noteCount; i++) {
            noteSections.push({
                noteId: `${letter}${i}`,
                title: `${letter}笔记 ${i}`,
                introduce: '这是' + letter + '笔记 ' + i + ' 的简介',
                createdAt: new Date().toISOString(),
            });
        }

        if (noteSections.length > 0) {
            sectionListData.push({
                title: letter,
                data: noteSections,
            });
        }
    });

    return sectionListData;
};
