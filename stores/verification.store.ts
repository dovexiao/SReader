import { create } from 'zustand';
import {bgImage, puzzleImage} from '../assets/image.ts';

interface VerificationStore {
    verificationVisible: boolean;
    bgImage: string;
    puzzleImage: string;
    verificationImageLoading: boolean;
    verificationStatusLoading: boolean;
    verificationStatus: 'success' | 'fail' | 'default';
    bgAspectRatio: number;
    puzzleSizeRatio: number;
    puzzlePositionYRatio: number;
    setVerificationStatus: (status: 'success' | 'fail' | 'default') => void;
    setVerificationVisible: (visible: boolean) => void;
    fetchVerificationImage: () => Promise<void>;
    // fetchVerificationImage: () => void;
    fetchVerificationStatus: (puzzlePositionX: number) => Promise<void>;
    resetSliderVerification: () => void;
}

export const useVerificationStore = create<VerificationStore>()((set) => ({
    verificationVisible: false,
    bgImage: '',
    puzzleImage: '',
    verificationImageLoading: true,
    verificationStatusLoading: false,
    verificationStatus: 'default',
    bgAspectRatio: 0.8,
    puzzleSizeRatio: 0,
    puzzlePositionYRatio: 0,
    setVerificationVisible: (visible: boolean) => {
        set(() => ({ verificationVisible: visible }));
    },
    setVerificationStatus: (status: 'success' | 'fail' | 'default') => {
        set(() => ({
            verificationStatus: status,
            verificationStatusLoading: false,
        }));
    },
    fetchVerificationImage: async () => {
        const timer = setTimeout(() => {
            set(() => ({
                bgImage: bgImage,
                puzzleImage: puzzleImage,
                bgAspectRatio: 220 / 300,
                puzzleSizeRatio: 61 / 300,
                puzzlePositionYRatio: 53 / 300,
                verificationImageLoading: false,
            }));
            clearTimeout(timer);
        }, 3000);
    },
    fetchVerificationStatus: async (puzzlePositionX: number) => {
        set(() => ({
            verificationStatusLoading: true,
        }));
        return new Promise<void>((resolve) => {
            const timer = setTimeout(() => {
                if (puzzlePositionX >= 100 && puzzlePositionX <= 200) {
                    // console.log('验证成功', new Date());
                    set(() => ({
                        verificationStatus: 'success',
                        verificationStatusLoading: false,
                    }));
                } else {
                    // console.log('验证失败', new Date());
                    set(() => ({
                        verificationStatus: 'fail',
                        verificationStatusLoading: false,
                    }));
                }
                // console.log('验证结束', new Date());
                clearTimeout(timer);
                resolve();
            }, 3000);
        });
    },
    resetSliderVerification: () => {
        set(() => ({
            verificationStatus: 'default',
            verificationStatusLoading: false,
            verificationImageLoading: true,
            puzzleImage: '',
            bgImage: '',
            bgAspectRatio: 0.8,
            puzzleSizeRatio: 0,
            puzzlePositionYRatio: 0,
        }));
    },
}));
