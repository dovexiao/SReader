import { create } from 'zustand';

interface MainStore {
    navigateRecycleBin: () => void;
    setNavigateRecycleBin: (navigateRecycleBin: () => void) => void;
}

export const useMainStore = create<MainStore>((set) => ({
    navigateRecycleBin: () => {},
    setNavigateRecycleBin: (navigateRecycleBin: () => void) => set(() => ({ navigateRecycleBin })),
}));
