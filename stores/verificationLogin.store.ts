import { create } from 'zustand';
import { validators } from '../utils/validators.ts';

interface VerificationLoginStore {
    // 表单字段
    emailAccount: string;
    emailVerificationCode: string;

    // 错误提示
    emailCaption: string;
    emailVerificationCodeCaption: string;

    // 表单状态方法
    setEmailAccount: (emailAccount: string) => void;
    setEmailVerificationCode: (emailVerificationCode: string) => void;

    // 表单验证方法
    validateForm: () => boolean;
    resetForm: () => void;
}

export const useVerificationLoginStore = create<VerificationLoginStore>((set, get) => ({
    // 初始状态
    emailAccount: '',
    emailVerificationCode: '',
    emailCaption: '',
    emailVerificationCodeCaption: '',

    // 更新字段并实时验证
    setEmailAccount: (emailAccount) => {
        set({ emailAccount });
        const error = validators.validateEmail(emailAccount);
        set({ emailCaption: error });
    },

    setEmailVerificationCode: (emailVerificationCode) => {
        set({ emailVerificationCode });
        const error = validators.validateVerificationCode(emailVerificationCode);
        set({ emailVerificationCodeCaption: error });
    },

    // 表单整体验证
    validateForm: () => {
        const state = get();

        // 验证所有字段
        const emailError = validators.validateEmail(state.emailAccount);
        const codeError = validators.validateVerificationCode(state.emailVerificationCode);

        // 更新错误提示
        set({
            emailCaption: emailError,
            emailVerificationCodeCaption: codeError,
        });

        // 检查表单是否有效
        const isValid = !(emailError || codeError);
        if (!isValid) return false;

        return true;
    },

    // 重置表单
    resetForm: () => {
        set({
            emailAccount: '',
            emailVerificationCode: '',
            emailCaption: '',
            emailVerificationCodeCaption: '',
        });
    },
}));
