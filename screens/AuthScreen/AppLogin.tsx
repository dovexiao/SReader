import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Alert,
    StatusBar,
    ScrollView,
} from 'react-native';
import EmailInput from '../../components/AuthComponents/EmailInput.tsx';
import { Button, Icon } from '@ui-kitten/components';
import { NavigationProps } from '../../types/navigationType.ts';
import LoginSecureInput from '../../components/AuthComponents/LoginSecureInput..tsx';
import CaptchaInput from '../../components/AuthComponents/CaptchaInput.tsx';
import { usePasswordLoginStore } from '../../stores/passwordLogin.store.ts';
import { useVerificationLoginStore } from '../../stores/verificationLogin.store.ts';

const { width } = Dimensions.get('window');
const PRIMARY_COLOR = '#F09050'; // 主橙色
const TEXT_COLOR_DARK = '#333333';
const TEXT_COLOR_LIGHT = '#888888';

const AppLogin: React.FC<NavigationProps> = ({ navigation }) => {
    const [loginType, setLoginType] = useState<'PASSWORD' | 'VERIFICATION'>('PASSWORD');

    const handleRegister = () => {
        // 跳转到注册页面
        navigation.replace('AppRegister');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={'#FFFFFF'} />
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.logoContainer}>
                        <View style={styles.logo} >
                            <Icon
                                name="bulb-outline"
                                width={60}
                                height={60}
                                fill={'#ffffff'}
                            />
                        </View>
                    </View>

                    <Text style={styles.title}>RTALK</Text>
                    <View style={styles.titleUnderline} />

                    <Text style={styles.subtitle}>
                        登录您的 RTalk 账号, 开启社交学习新体验
                    </Text>

                    {loginType === 'PASSWORD' ?
                        <PasswordLoginBox setLoginType={setLoginType} /> :
                        <VerificationLoginBox setLoginType={setLoginType} />
                    }

                    <View style={styles.registerContainer}>
                        <Text style={styles.registerText}>还没有账号? </Text>
                        <TouchableOpacity onPress={handleRegister}>
                            <Text style={[styles.registerText, styles.registerLink]}>
                                立即注册
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

type LoginBoxProps = {
    setLoginType: (type: 'PASSWORD' | 'VERIFICATION') => void;
};

const PasswordLoginBox = ({ setLoginType }: LoginBoxProps) => {
    const validateForm = usePasswordLoginStore((state) => state.validateForm);
    const resetForm = usePasswordLoginStore((state) => state.resetForm);

    const handleLogin = () => {
        if (validateForm()) {
            resetForm();
        }
    };

    return (
        <>
            <EmailInput label={'邮箱账号'} type={'LOGIN_PASSWORD'} />

            <LoginSecureInput label={'登录密码'} />

            <View style={styles.authOptionsContainer}>
                <TouchableOpacity
                    onPress={() => {
                        setLoginType('VERIFICATION');
                        resetForm();
                    }}>
                    <Text style={styles.authOptionText}> 邮箱验证登录</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => Alert.alert('提示', '跳转到忘记密码页面')}>
                    <Text style={styles.forgotPasswordText}>忘记密码?</Text>
                </TouchableOpacity>
            </View>

            <Button
                style={styles.loginButton}
                onPress={handleLogin}>
                <Text style={styles.loginButtonText}>登录</Text>
            </Button>
        </>
    );
};

const VerificationLoginBox = ({ setLoginType }: LoginBoxProps) => {
    const validateForm = useVerificationLoginStore((state) => state.validateForm);
    const resetForm = useVerificationLoginStore((state) => state.resetForm);

    const handleLogin = () => {
        if (validateForm()) {
            resetForm();
        }
    };

    return (
        <>
            <EmailInput label={'邮箱账号'} type={'LOGIN_VERIFICATION'} />

            <CaptchaInput label={'邮箱验证码'} type={'LOGIN'} />

            <View style={styles.authOptionsContainer}>
                <TouchableOpacity
                    onPress={() => {
                        setLoginType('PASSWORD');
                        resetForm();
                    }}>
                    <Text style={styles.authOptionText}> 账号密码登录</Text>
                </TouchableOpacity>
            </View>

            <Button
                style={styles.loginButton}
                onPress={handleLogin}>
                <Text style={styles.loginButtonText}>登录</Text>
            </Button>
        </>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: width * 0.08, // 左右边距
        paddingTop: width * 0.15, // 顶部留白
    },
    logoContainer: {
        marginBottom: 20,
    },
    logo: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 80,
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 20, // 圆角
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: TEXT_COLOR_DARK,
        marginBottom: 8,
    },
    titleUnderline: {
        width: 80,
        height: 4,
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 2,
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 14,
        color: TEXT_COLOR_LIGHT,
        textAlign: 'center',
        marginBottom: 40,
    },
    authOptionsContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    authOptionText: {
        fontSize: 14,
        color: PRIMARY_COLOR,
    },
    forgotPasswordText: {
        fontSize: 14,
        color: PRIMARY_COLOR,
    },
    loginButton: {
        width: '100%',
        height: 50,
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 25,
        borderWidth: 0,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        shadowColor: PRIMARY_COLOR, // 添加阴影
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5, // Android 阴影
    },
    loginButtonText: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    loginHeight: {
        width: '100%',
        height: 50,
        borderRadius: 25,
        backgroundColor: PRIMARY_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    registerText: {
        fontSize: 14,
        color: TEXT_COLOR_LIGHT,
    },
    registerLink: {
        color: PRIMARY_COLOR,
        fontWeight: 'bold',
    },
});

export default AppLogin;
