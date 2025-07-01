import { get } from './request.ts';

export const getVerificationCaptcha = async () => {
    return get('/auth/captcha');
};

