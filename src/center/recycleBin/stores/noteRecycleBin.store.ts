import { create } from 'zustand';
import { NoteSection } from '@/center/recycleBin/types';
import { generateNoteRecycleBin } from '@/center/recycleBin/utils/generateNoteRecycleBin.ts';
import { SectionListData } from 'react-native';

interface NoteRecycleBinStore {
    sections: SectionListData<NoteSection>[];
    activeLetter: string;
    setActiveLetter: (letter: string) => void;
    popupLetter: string;
    setPopupLetter: (letter: string) => void;
}

export const useNoteRecycleBinStore = create<NoteRecycleBinStore>((set) => ({
    sections: generateNoteRecycleBin(),
    activeLetter: '',
    setActiveLetter: (letter: string) => set({ activeLetter: letter }),
    popupLetter: '',
    setPopupLetter: (letter: string) => set({ popupLetter: letter }),
}));
