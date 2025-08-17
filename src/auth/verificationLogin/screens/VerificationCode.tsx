import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import { VerificationCodeInput, NoVerificationCodeHelper } from '@/auth/verificationLogin/components';
import TopNavigationOpe from '@/main/components/TopNavigationOpe.tsx';
import { Button, Divider } from '@ui-kitten/components';
import { useGlobal } from '@contexts/GlobalContext.tsx';

const VerificationCode = () => {
    const [code, setCode] = useState(['', '', '', '']);
    const [countdown, setCountdown] = useState(47);
    const [isCounting, setIsCounting] = useState(true);

    const { bottomActionSheetRef } = useGlobal();

    // 处理单个验证码输入框的输入
    const handleCodeInput = () => {

    };

    // 登录逻辑
    const handleLogin = () => {

    };

    // 重新发送验证码逻辑
    const handleResend = () => {
        if (!isCounting) {
            setCountdown(47);
            setIsCounting(true);
            // 调用发送验证码接口
            console.log('重新发送验证码');
        }
    };

    // 倒计时逻辑
    useEffect(() => {

    }, [countdown, isCounting]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={'#FFFFFF'} />
            {/* 顶部返回与帮助 */}
            <TopNavigationOpe />
            <Divider />
            <View style={styles.container}>
                {/* 标题与手机号提示 */}
                <Text style={styles.title}>请输入验证码</Text>
                <Text style={styles.phoneTip}>
                    短信已发送至 <Text style={styles.phoneTipHighlight} >+86 135 5951 6636</Text>
                </Text>

                {/* 验证码输入框 */}
                <View style={styles.codeInputContainer}>
                    <VerificationCodeInput
                        cellCount={6}
                        onFinish={() => {
                            console.log('验证码输入完成');
                        }}
                    />
                </View>

                {/* 登录按钮 */}
                <LoginButton />

                {/* 辅助操作 */}
                <View style={styles.helperContainer}>
                    <TouchableOpacity onPress={() => {
                        bottomActionSheetRef.current?.show(
                            <NoVerificationCodeHelper />
                        )
                    }}>
                        <Text style={styles.helperText}>收不到验证码？</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleResend} disabled={isCounting}>
                        <Text style={[styles.helperText, isCounting && styles.countdownText]}>
                            {isCounting ? `${countdown} 秒后重新发送` : '重新发送'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const LoginButton = () => {
    // const isChecked = useRegisterStore(state => state.isChecked);
    // const validateForm = useRegisterStore(state => state.validateForm);
    // const resetForm = useRegisterStore(state => state.resetForm);

    const handleRegister = () => {
        // if (validateForm()) {
        //     resetForm();
        // }
    };

    return (
        <Button
            style={styles.button}
            onPress={handleRegister}
            // disabled={!isChecked}
        >
            <Text style={styles.buttonText}>登录</Text>
        </Button>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    phoneTip: {
        fontSize: 14,
        color: '#999',
        marginBottom: 25,
    },
    phoneTipHighlight: {
        fontWeight: 'bold',
        color: '#000',
        fontSize: 16,
    },
    codeInputContainer: {
        marginBottom: 30,
    },
    codeInput: {
        width: 60,
        height: 60,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 8,
        fontSize: 24,
    },
    loginButton: {
        backgroundColor: '#ff7a90',
        borderRadius: 8,
        paddingVertical: 15,
        alignItems: 'center',
        marginBottom: 20,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    helperContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    helperText: {
        fontSize: 14,
        color: '#007AFF',
    },
    countdownText: {
        color: '#999',
    },

    button: {
        width: '100%',
        height: 50,
        borderRadius: 8,
        borderWidth: 0,
        marginBottom: 25,
    },
    buttonText: {
        fontSize: 20,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});

export default VerificationCode;
