import { create } from 'zustand';

interface AuthStore {
  isLoggedIn: boolean;
  userId: string;
  nickname: string;
  avatar: string;
  introduction: string;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setUserId: (userId: string) => void;
  setNickname: (nickname: string) => void;
  setAvatar: (avatar: string) => void;
  setIntroduction: (introduction: string) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false,
  userId: '',
  nickname: '',
  avatar: '',
  introduction: '',
  setIsLoggedIn: (isLoggedIn:  boolean) => set(() => ({ isLoggedIn })),
  setUserId: (userId: string) => set(() => ({ userId })),
  setNickname: (nickname: string) => set(() => ({ nickname })),
  setAvatar: (avatar: string) => set(() => ({ avatar })),
  setIntroduction: (introduction: string) => set(() => ({ introduction })),
}));
