import React, { useState, useRef, useEffect } from 'react';
import { TouchableWithoutFeedback, StyleSheet, View } from 'react-native';
import { Icon, IconElement, Input, Text } from '@ui-kitten/components';
import { useGlobal } from '@/contexts/GlobalContext.tsx';
import { useVerificationStore } from '@/global/sliderVerification/stores/verification.store.ts';
import { useRegisterStore } from '../stores/register.store.ts';
import { useVerificationLoginStore } from '../stores/verificationLogin.store.ts';

type InputProps = {
    label: string;
    type: 'REGISTER' | 'LOGIN';
};

const AlertIcon = (props: any): IconElement => (
    <Icon
        {...props}
        name="alert-circle-outline"
        fill={props.color}
    />
);

const useVerificationCodeField = (type: InputProps['type']) => {
    // 同时调用所有Hook确保调用顺序一致
    const loginValue = useVerificationLoginStore(state => state.emailVerificationCode);
    const loginSetValue = useVerificationLoginStore(state => state.setEmailVerificationCode);
    const loginCaption = useVerificationLoginStore(state => state.emailVerificationCodeCaption);

    const registerValue = useRegisterStore(state => state.emailVerificationCode);
    const registerSetValue = useRegisterStore(state => state.setEmailVerificationCode);
    const registerCaption = useRegisterStore(state => state.emailVerificationCodeCaption);

    // 根据type选择返回值
    return type === 'LOGIN'
        ? { value: loginValue, setValue: loginSetValue, caption: loginCaption }
        : { value: registerValue, setValue: registerSetValue, caption: registerCaption };
};

const CaptchaInput = ({ label, type }: InputProps): React.ReactElement => {
    const { value, setValue, caption } = useVerificationCodeField(type);

    const [countdown, setCountdown] = useState<string>('获取验证码');
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const { sliderVerificationRef } = useGlobal();

    const verificationStatus = useVerificationStore(state => state.verificationStatus);
    const verificationVisible = useVerificationStore(state => state.verificationVisible);

    const handleShowVerification = () => {
        if (countdown === '获取验证码') {
            sliderVerificationRef.current?.showVerification();
        }
    };

    // 处理倒计时逻辑
    const handleCountdown = () => {
        if (countdown === '获取验证码') {
            setCountdown('60');
            timerRef.current = setInterval(() => {
                setCountdown(prev => {
                    if (prev === '1') {
                        clearInterval(timerRef.current!);
                        timerRef.current = null;
                        return '获取验证码';
                    }
                    return `${parseInt(prev, 10) - 1}`;
                });
            }, 1000);
        }
    };

    useEffect(( ) => {
        if (verificationStatus === 'success' && !verificationVisible) {
            handleCountdown();
        }
    }, [verificationStatus, verificationVisible]);

    const renderIcon = (): React.ReactElement => (
        <TouchableWithoutFeedback onPress={handleShowVerification}>
            <View style={styles.captchaButton}>
                <Text style={styles.captchaButtonText}>
                    {countdown !== '获取验证码' ? `${countdown} 秒后过期` : countdown}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    );

    const renderCaption = (): React.ReactElement => {
        return (
            <>
                {caption && <View style={styles.captionContainer}>
                    {AlertIcon(styles.captionIcon)}
                    <Text style={styles.captionText}>
                        {caption}
                    </Text>
                </View>}
            </>
        );
    };

    return (
        <Input
            style={styles.input}
            value={value}
            placeholder={label}
            caption={renderCaption}
            accessoryRight={renderIcon}
            onChangeText={nextValue => setValue(nextValue)}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        marginBottom: 20,
        borderRadius: 25,
        backgroundColor: '#F6F6F6',
        color: '#333333',
        fontSize: 16,
    },
    captionContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    captionIcon: {
        width: 10,
        height: 10,
        marginRight: 5,
        // color: '#A0A0A0',
        color: 'red',
    },
    captionText: {
        fontSize: 12,
        fontWeight: '400',
        fontFamily: 'opensans-regular',
        // color: '#A0A0A0',
        color: 'red',
    },
    captchaButton: {
        width: 100,
        height: 35,
        paddingHorizontal: 10,
        backgroundColor: '#F09050',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    captchaButtonText: {
        fontSize: 14,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});

export default CaptchaInput;
