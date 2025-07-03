import { create } from 'zustand';
import { validators } from '../utils/validators.ts';

interface RegisterStore {
    // 表单字段
    emailAccount: string;
    password: string;
    confirmPassword: string;
    emailVerificationCode: string;
    isChecked: boolean;

    // 错误提示
    emailCaption: string;
    passwordCaption: string;
    confirmPasswordCaption: string;
    emailVerificationCodeCaption: string;

    // 表单状态方法
    setEmailAccount: (emailAccount: string) => void;
    setPassword: (password: string) => void;
    setConfirmPassword: (confirmPassword: string) => void;
    setEmailVerificationCode: (emailVerificationCode: string) => void;
    setIsChecked: (isChecked: boolean) => void;

    // 表单验证方法
    validateForm: () => boolean;
    resetForm: () => void;
}

export const useRegisterStore = create<RegisterStore>((set, get) => ({
    // 初始状态
    emailAccount: '',
    password: '',
    confirmPassword: '',
    emailVerificationCode: '',
    isChecked: false,
    emailCaption: '',
    passwordCaption: '',
    confirmPasswordCaption: '',
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

        // 如果确认密码已填写，则重新验证确认密码
        if (get().confirmPassword) {
            const confirmError = validators.validateConfirmPassword(password, get().confirmPassword);
            set({ confirmPasswordCaption: confirmError });
        }
    },

    setConfirmPassword: (confirmPassword) => {
        set({ confirmPassword });
        const error = validators.validateConfirmPassword(get().password, confirmPassword);
        set({ confirmPasswordCaption: error });
    },

    setEmailVerificationCode: (emailVerificationCode) => {
        set({ emailVerificationCode });
        const error = validators.validateVerificationCode(emailVerificationCode);
        set({ emailVerificationCodeCaption: error });
    },

    setIsChecked: (isChecked: boolean) => set(() => ({ isChecked })),

    // 表单整体验证
    validateForm: () => {
        const state = get();

        // 验证所有字段
        const emailError = validators.validateEmail(state.emailAccount);
        const passwordError = validators.validatePassword(state.password);
        const confirmError = validators.validateConfirmPassword(state.password, state.confirmPassword);
        const codeError = validators.validateVerificationCode(state.emailVerificationCode);

        // 更新错误提示
        set({
            emailCaption: emailError,
            passwordCaption: passwordError,
            confirmPasswordCaption: confirmError,
            emailVerificationCodeCaption: codeError,
        });

        // 检查表单是否有效
        const isValid = !(emailError || passwordError || confirmError || codeError);
        if (!isValid) return false;

        // 检查同意条款
        if (!state.isChecked) {
            // 可以添加一个全局错误提示
            return false;
        }

        return true;
    },

    // 重置表单
    resetForm: () => {
        set({
            emailAccount: '',
            password: '',
            confirmPassword: '',
            emailVerificationCode: '',
            isChecked: false,
            emailCaption: '',
            passwordCaption: '',
            confirmPasswordCaption: '',
            emailVerificationCodeCaption: '',
        });
    },
}));
