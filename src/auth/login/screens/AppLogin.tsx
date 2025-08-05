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
import { Button, Icon } from '@ui-kitten/components';
import { NavigationProps } from '../../types/navigationType.ts';
import EmailInput from '../components/EmailInput.tsx';
import LoginSecureInput from '../components/LoginSecureInput..tsx';

const { width } = Dimensions.get('window');
const PRIMARY_COLOR = '#F09050'; // 主橙色
const TEXT_COLOR_DARK = '#333333';
const TEXT_COLOR_LIGHT = '#888888';

const AppLogin: React.FC<NavigationProps> = ({ navigation }) => {
    const handleLogin = () => {

    };

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

                    <Text style={styles.title}>密码登录</Text>
                    <View style={styles.titleUnderline} />

                    <Text style={styles.subtitle}>
                        登录您的RTalky账号, 开启社交学习新体验
                    </Text>

                    <EmailInput label={'邮箱账号'} type={'LOGIN'} />

                    <LoginSecureInput label={'登录密码'} />

                    <View style={styles.forgotPasswordContainer}>
                        <TouchableOpacity
                            onPress={() => Alert.alert('提示', '跳转到邮箱验证码登录页面')}>
                            <Text style={styles.forgotPasswordText}>邮箱验证码登录</Text>
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
    forgotPasswordContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
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
