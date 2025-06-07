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
import SecureInput from '../../components/AuthComponents/SecureInput.tsx';
import EmailInput from '../../components/AuthComponents/EmailInput.tsx';
import CaptchaInput from '../../components/AuthComponents/CaptchaInput.tsx';
import {Button, CheckBox} from '@ui-kitten/components';
import {NavigationProps} from '../../types/navigationType.ts';

const { width } = Dimensions.get('window');
const PRIMARY_COLOR = '#F09050'; // 主橙色
const TEXT_COLOR_DARK = '#333333';
const TEXT_COLOR_LIGHT = '#888888';

const AppRegister: React.FC<NavigationProps> = ({ navigation }) => {
    const [emailAccount, setEmailAccount] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [checked, setChecked] = React.useState(false);

    const handleRegister = () => {
        Alert.alert('注册信息', `邮箱账号: ${emailAccount}\n密码: ${password}`);
    };

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

                    <EmailInput
                        label={'邮箱账号'}
                        value={emailAccount}
                        setValue={setEmailAccount}
                        caption={'请输入有效邮箱账号'}
                    />

                    <SecureInput
                        label={'登录密码'}
                        value={password}
                        setValue={setPassword}
                        caption={'请输入至少8位有效字符-字母/数字'}
                    />

                    <SecureInput
                        label={'确认密码'}
                        value={confirmPassword}
                        setValue={setConfirmPassword}
                        caption={'请输入有效登录密码'}
                    />

                    <CaptchaInput
                        label={'邮箱验证码'}
                        value={emailAccount}
                        setValue={setEmailAccount}
                        caption={'请输入有效邮箱账号'}
                    />

                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            checked={checked}
                            onChange={nextChecked => setChecked(nextChecked)}
                        />
                        <View style={{ flexDirection: 'row', marginLeft: 10, alignItems: 'center' }}>
                            <Text style={styles.checkboxText}>我已阅读并同意</Text>
                            <Text style={styles.checkboxTextHeight}> 用户协议 </Text>
                            <Text style={styles.checkboxText}>和</Text>
                            <Text style={styles.checkboxTextHeight}> 隐私政策 </Text>
                        </View>
                    </View>

                    <Button
                        style={styles.registerButton}
                        onPress={handleRegister}
                        disabled={!checked}>
                        <Text style={styles.registerButtonText}>注册</Text>
                    </Button>

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

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: width * 0.08, // 左右边距
        paddingTop: width * 0.1, // 顶部留白
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
