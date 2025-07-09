import { create } from 'zustand';
import { validators } from '../utils/validators.ts';

interface LoginStore {
    // 表单字段
    emailAccount: string;
    password: string;
    emailVerificationCode: string;

    // 错误提示
    emailCaption: string;
    passwordCaption: string;
    emailVerificationCodeCaption: string;

    // 表单状态方法
    setEmailAccount: (emailAccount: string) => void;
    setPassword: (password: string) => void;
    setEmailVerificationCode: (emailVerificationCode: string) => void;

    // 表单验证方法
    validateForm: () => boolean;
    resetForm: () => void;
}

export const useLoginStore = create<LoginStore>((set, get) => ({
    // 初始状态
    emailAccount: '',
    password: '',
    emailVerificationCode: '',
    emailCaption: '',
    passwordCaption: '',
    emailVerificationCodeCaption: '',

    // 更新字段并实时验证
    setEmailAccount: (emailAccount) => {
        set({ emailAccount });
        const error = validators.validateEmail(emailAccount);
        set({ emailCaption: error });
    },

    setPassword: (password) => {
        set({ password });
        const error = validators.validatePassword(password);
        set({ passwordCaption: error });
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
        const passwordError = validators.validatePassword(state.password);
        const codeError = validators.validateVerificationCode(state.emailVerificationCode);

        // 更新错误提示
        set({
            emailCaption: emailError,
            passwordCaption: passwordError,
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
            password: '',
            emailVerificationCode: '',
            emailCaption: '',
            passwordCaption: '',
            emailVerificationCodeCaption: '',
        });
    },
}));
