import React, { useState, useRef, useEffect } from 'react';
import { TouchableWithoutFeedback, StyleSheet, View } from 'react-native';
import { Icon, IconElement, Input, Text } from '@ui-kitten/components';

type InputProps = {
    label: string;
    value: string;
    setValue: (value: string) => void;
    caption: string;
};

const AlertIcon = (props: any): IconElement => (
    <Icon
        {...props}
        name="alert-circle-outline"
        fill={props.color}
    />
);

const CaptchaInput = ({ label, value, setValue, caption }: InputProps): React.ReactElement => {
    const [countdown, setCountdown] = useState<string>('获取验证码');
    const timerRef = useRef<NodeJS.Timeout | null>(null);

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

    const renderIcon = (): React.ReactElement => (
        <TouchableWithoutFeedback onPress={handleCountdown}>
            <View style={styles.captchaButton}>
                <Text style={styles.captchaButtonText}>
                    {countdown !== '获取验证码' ? `${countdown} 秒后过期` : countdown}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    );

    const renderCaption = (): React.ReactElement => {
        return (
            <View style={styles.captionContainer}>
                {AlertIcon(styles.captionIcon)}
                <Text style={styles.captionText}>
                    {caption}
                </Text>
            </View>
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
        color: '#A0A0A0',
    },
    captionText: {
        fontSize: 12,
        fontWeight: '400',
        fontFamily: 'opensans-regular',
        color: '#A0A0A0',
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
