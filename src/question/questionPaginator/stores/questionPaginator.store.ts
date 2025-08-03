import { create } from 'zustand';

interface QuestionPaginatorStore {
    currentPage: number;
    pageCount: number;

    setCurrentPage: (page: number) => void;
    setPageCount: (pageCount: number) => void;
}

export const useQuestionPaginatorStore = create<QuestionPaginatorStore>((set, get) => ({
    currentPage: 1,
    pageCount: 1,

    setCurrentPage: (page: number) => {
        set({ currentPage: page });
    },
    setPageCount: (pageCount: number) => {
        set({ pageCount: pageCount });
    },
}));
