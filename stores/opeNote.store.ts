import { create } from 'zustand';
import { Note } from "./note.store.ts";

interface OpeNoteStore {
  noteId: string;
  noteTitle: string;
  noteContent: string;
  noteTags: string[];
  isOpeDisabled: boolean;

  // 初始化方法
  initialize: (note: Note) => void;

  // 状态更新方法
  setNoteTitle: (title: string) => void;
  setNoteContent: (content: string) => void;

  // 标签操作
  addTag: (tag: string) => void;
  removeTag: (index: number) => void;

  validateForm: () => void;
  reset: () => void;
}

export const useOpeNoteStore = create<OpeNoteStore>((set, get) => ({
  noteId: '',
  noteTitle: '',
  noteContent: '',
  noteTags: [],
  isOpeDisabled: true,

  initialize: (note: Note) => {
    set({
      noteId: note.noteId,
      noteTitle: note.title,
      noteContent: note.content,
      noteTags: note.tags,
      isOpeDisabled: true,
    });
  },

  setNoteTitle: (title: string) => {
    set({ noteTitle: title });
  },

  setNoteContent: (content:  string) => {
    set({ noteContent: content });
  },

  addTag: (tag) => {
    if (tag.trim() !== '') {
      set({ noteTags: [...get().noteTags, tag.trim()] });
      get().validateForm();
    }
  },

  removeTag: (index) => {
    const newTags = [...get().noteTags];
    newTags.splice(index, 1);
    set({ noteTags: newTags });
    get().validateForm();
  },

  validateForm: () => {
    set({
      isOpeDisabled: get().noteContent.trim() === '',
    });
  },


  reset: () => {
    set({
      noteId: '',
      noteContent: '',
      noteTags: [],
    });
  },
}))
