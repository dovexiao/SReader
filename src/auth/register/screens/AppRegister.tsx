import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    StatusBar,
    ScrollView,
} from 'react-native';
import RegisterSecureInput from '../components/RegisterSecureInput.tsx';
import EmailInput from '../../login/components/EmailInput.tsx';
import CaptchaInput from '../../login/components/CaptchaInput.tsx';
import {Button, CheckBox} from '@ui-kitten/components';
import {NavigationProps} from '../../types/navigationType.ts';
import { useRegisterStore } from '../../login/stores/register.store.ts';

const { width } = Dimensions.get('window');
const PRIMARY_COLOR = '#F09050'; // 主橙色
const TEXT_COLOR_DARK = '#333333';
const TEXT_COLOR_LIGHT = '#888888';

const AppRegister: React.FC<NavigationProps> = ({ navigation }) => {
    const handleLogin = () => {
        navigation.replace('AppLogin');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={'#FFFFFF'} />
            <ScrollView>
                <View style={styles.container}>
                    {/*<View style={styles.logoContainer}>*/}
                    {/*    <View style={styles.logo} >*/}
                    {/*        <Icon*/}
                    {/*            name="person-outline"*/}
                    {/*            width={60}*/}
                    {/*            height={60}*/}
                    {/*            fill={'#ffffff'}*/}
                    {/*        />*/}
                    {/*    </View>*/}
                    {/*</View>*/}

                    <Text style={styles.title}>创建账号</Text>
                    <View style={styles.titleUnderline} />

                    <Text style={styles.subtitle}>
                        创建您的RTalky账号, 开启社交学习新体验
                    </Text>

                    <EmailInput label={'邮箱账号'} type={'REGISTER'} />

                    <RegisterSecureInput label={'注册密码'} type={'REGISTER_PASSWORD'} />

                    <RegisterSecureInput label={'确认密码'} type={'REGISTER_CONFIRM'} />

                    <CaptchaInput label={'邮箱验证码'} type={'REGISTER'} />

                    <AgreementCheckbox />

                    <RegisterButton navigation={navigation}/>

                    <View style={styles.loginContainer}>
                        <Text style={styles.loginText}>已有账号? </Text>
                        <TouchableOpacity onPress={handleLogin}>
                            <Text style={[styles.loginText, styles.loginLink]}>
                                登录
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const AgreementCheckbox = () => {
    const isChecked = useRegisterStore(state => state.isChecked);
    const setIsChecked = useRegisterStore(state => state.setIsChecked);

    return (
        <View style={styles.checkboxContainer}>
            <CheckBox
                checked={isChecked}
                onChange={nextChecked => setIsChecked(nextChecked)}
            />
            <View style={{ flexDirection: 'row', marginLeft: 10, alignItems: 'center' }}>
                <Text style={styles.checkboxText}>我已阅读并同意</Text>
                <Text style={styles.checkboxTextHeight}> 用户协议 </Text>
                <Text style={styles.checkboxText}>和</Text>
                <Text style={styles.checkboxTextHeight}> 隐私政策 </Text>
            </View>
        </View>
    );
};

// 提取注册按钮为独立组件
const RegisterButton = ({ navigation }: { navigation: NavigationProps['navigation'] }) => {
    const isChecked = useRegisterStore(state => state.isChecked);
    const validateForm = useRegisterStore(state => state.validateForm);
    const resetForm = useRegisterStore(state => state.resetForm);

    const handleRegister = () => {
        if (validateForm()) {
            resetForm();
        }
    };

    return (
        <Button
            style={styles.registerButton}
            onPress={handleRegister}
            disabled={!isChecked}>
            <Text style={styles.registerButtonText}>注册</Text>
        </Button>
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
    checkboxContainer: {
        width: '100%',
        flexDirection: 'row',
        marginBottom: 30,
    },
    checkboxText: {
        fontSize: 14,
        color: TEXT_COLOR_LIGHT,
    },
    checkboxTextHeight: {
        fontSize: 14,
        color: PRIMARY_COLOR,
    },
    registerButton: {
        width: '100%',
        height: 50,
        // backgroundColor: PRIMARY_COLOR,
        borderRadius: 25,
        borderWidth: 0,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: PRIMARY_COLOR, // 添加阴影
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        // elevation: 5, // Android 阴影
    },
    registerButtonText: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginText: {
        fontSize: 14,
        color: TEXT_COLOR_LIGHT,
    },
    loginLink: {
        color: PRIMARY_COLOR,
        fontWeight: 'bold',
    },
});

export default AppRegister;
