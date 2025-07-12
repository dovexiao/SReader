import { create } from 'zustand';
import { notes } from "../assets/notes.ts";

export type Note = {
    noteId: string,
    createdAt: string,
    lastModified: string,
    title: string,
    content: string,
    introduce: string,
    tags: string[];
};

interface NoteStore {
    notes: Note[],
    createNote: (note: Note) => void;
    updateNote: (note: any) => void;
}

export const useNoteStore = create<NoteStore>((set, get) => ({
    notes: notes as Note[],
    createNote: (question: Note) => {
        const newQuestionId = generateNoteId(get().notes[get().notes.length - 1].noteId);
        set((state) => ({
            notes: [...state.notes, { ...question, questionId: newQuestionId }],
        }));
    },
    updateNote: (question: any) => {
        set((state) => ({
            notes: state.notes.map((q) => (q.noteId === question.questionId ? {...q, ...question} : q)),
        }));
    },
}));

const generateNoteId = (noteId: string) => {
    const match = noteId.match(/^N(\d+)$/);
    if (!match) {
        return 'N001';
    }

    let numberPart = parseInt(match[1], 10) + 1;
    const paddedNumber = numberPart.toString().padStart(3, '0');
    return `N${paddedNumber}`;
};

