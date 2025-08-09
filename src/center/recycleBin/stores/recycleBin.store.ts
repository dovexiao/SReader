import { create } from 'zustand';

interface RecycleBinStore {
    currentPage: number,
    setCurrentPage: (page: number) => void,
    tabLayouts: Record<number, { x: number; width: number }>,
    setTabLayouts: (tabLayout: RecycleBinStore['tabLayouts']) => void,
}

export const useRecycleBinStore = create<RecycleBinStore>((set, get) => ({
    currentPage: 0,
    setCurrentPage: (page: number) => set(() => ({ currentPage: page })),
    tabLayouts: {},
    setTabLayouts: (newTabLayouts: RecycleBinStore['tabLayouts']) => {
        set(() => ({ tabLayouts: newTabLayouts }));
    },
}));
