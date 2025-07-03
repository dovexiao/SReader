// 验证工具函数
export const validators = {
    // 验证邮箱格式
    validateEmail: (email: string): string => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            return '请输入邮箱地址';
        }
        if (!regex.test(email)) {
            return '邮箱格式不正确';
        }
        return '';
    },

    // 验证密码格式（8-16位字母或数字）
    validatePassword: (password: string): string => {
        const regex = /^[a-zA-Z0-9]{8,16}$/;
        if (!password) {
            return '请输入密码';
        }
        if (password.length < 8 || password.length > 16) {
            return '密码长度需为8-16位';
        }
        if (!regex.test(password)) {
            return '密码只能包含字母和数字';
        }
        return '';
    },

    // 验证确认密码是否匹配
    validateConfirmPassword: (password: string, confirmPassword: string): string => {
        if (!confirmPassword) {
            return '请确认密码';
        }
        if (password !== confirmPassword) {
            return '两次输入的密码不一致';
        }
        return '';
    },

    // 验证邮箱验证码（去除前后空格）
    validateVerificationCode: (code: string): string => {
        const trimmedCode = code.trim();
        if (!trimmedCode) {
            return '请输入验证码';
        }
        if (trimmedCode.length !== 6) {
            return '验证码应为6位字符';
        }
        return '';
    }
};
