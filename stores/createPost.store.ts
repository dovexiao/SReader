import { create } from 'zustand';

export type ImageType = {
    type: string;
    uri: string;
    width: number;
    height: number;
    base64: string;
};

interface createPostStore {
    postContext: string;
    postImages: ImageType[];
    postTags: string[];

    initialize: () => void;

    setPostContext: (context: string) => void;
    setPostImages: (images: ImageType[]) => void;
    setPostTags: (tags: string[]) => void;

    removeImage: (index: number) => void;
}

export const useCreatePostStore = create<createPostStore>((set, get) => ({
    postContext: '',
    postImages: [],
    postTags: [],

    initialize: () => {
        set({
            postContext: '',
            postImages: [],
            postTags: [],
        });
    },

    setPostContext: (context: string) => {
        set({ postContext: context });
    },

    setPostImages: (images: ImageType[]) => {
        set({ postImages: images });
    },

    setPostTags: (tags: string[]) => {
        set({ postTags: tags });
    },

    removeImage: (index: number) => {
        set((state) => ({
            postImages: [
                ...state.postImages.slice(0, index),
                ...state.postImages.slice(index + 1),
            ],
        }));
    },
}));
