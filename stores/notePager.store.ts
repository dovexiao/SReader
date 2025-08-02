import { create } from 'zustand';

interface NotePager {
    currentPage: number;

    // 状态更新方法
    setCurrentPage: (page: number) => void;

    reset: () => void;
}

export const useNotePagerStore = create<NotePager>((set, get) => ({
    currentPage: 0,

    setCurrentPage: (page: number) => {
        set({ currentPage: page });
    },

    reset: () => {
        set({ currentPage: 0 });
    },
}));

