import { create } from 'zustand';
import { QuestionSection } from '@/center/recycleBin/types';
import { SectionListData } from 'react-native';
import { generateQuestionRecycleBin } from '@/center/recycleBin/utils/generateQuestionRecycleBin.ts';

interface QuestionRecycleBinStore {
    sections: SectionListData<QuestionSection>[];
    activeLetter: string;
    setActiveLetter: (letter: string) => void;
    popupLetter: string;
    setPopupLetter: (letter: string) => void;
}

export const useQuestionRecycleBinStore = create<QuestionRecycleBinStore>((set) => ({
    sections: generateQuestionRecycleBin(),
    activeLetter: '',
    setActiveLetter: (letter: string) => set({ activeLetter: letter }),
    popupLetter: '',
    setPopupLetter: (letter: string) => set({ popupLetter: letter }),
}));
