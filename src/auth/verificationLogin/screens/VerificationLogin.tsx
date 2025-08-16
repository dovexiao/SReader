import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet, SafeAreaView, StatusBar,
} from 'react-native';
import TopNavigationOpe from "@/main/components/TopNavigationOpe.tsx";
import {Button, CheckBox, Divider, Input, useTheme} from "@ui-kitten/components";
import Icon from "react-native-vector-icons/MaterialIcons";

const VerificationLogin = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isAgreed, setIsAgreed] = useState(false);

    // 切换协议勾选状态
    const handleAgree = () => {
        setIsAgreed(!isAgreed);
    };

    // 验证并登录逻辑
    const handleVerifyLogin = () => {
        console.log('执行验证并登录，手机号：', phoneNumber);
    };

    // 密码登录跳转逻辑
    const handlePasswordLogin = () => {
        console.log('跳转到密码登录页面');
    };

    // 找回账号逻辑
    const handleFindAccount = () => {
        console.log('跳转到找回账号页面');
    };

    // 其他方式登录逻辑
    const handleOtherLogin = () => {
        console.log('展示其他登录方式');
    };

    const InputAccessory = () => (
        <View>
            <Text style={styles.countryCode}>+86</Text>
        </View>
    )

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={'#FFFFFF'} />
            {/* 顶部返回与帮助 */}
            <TopNavigationOpe />
            <Divider />
            <View style={styles.container}>
                {/* 标题与说明 */}
                <Text style={styles.title}>RTalky 验证登录</Text>
                <Text style={styles.desc}>未注册的手机号验证通过后将自动注册</Text>

                {/* 手机号输入 */}
                <Input
                    style={styles.phoneInput}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    size={'large'}
                    placeholder="请输入手机号"
                    keyboardType="phone-pad"
                    accessoryLeft={InputAccessory}
                />

                {/* 密码登录跳转 */}
                <TouchableOpacity style={styles.passwordLoginContainer} onPress={handlePasswordLogin}>
                    <Icon name={'sync-alt'} size={15} color={'#4285F4'} />
                    <Text style={styles.passwordLoginText}>密码登录</Text>
                </TouchableOpacity>

                {/* 验证并登录按钮 */}
                <VerifyLoginButton />

                {/* 协议勾选 */}
                <AgreementCheckbox />

                {/* 底部辅助操作 */}
                {/*<View style={styles.bottomActions}>*/}
                {/*    <TouchableOpacity onPress={handleFindAccount}>*/}
                {/*        <View style={styles.actionItem}>*/}
                {/*            /!* 这里用文字模拟图标，实际可替换为 Image 组件 *!/*/}
                {/*            <Text style={styles.actionIcon}>👤</Text>*/}
                {/*            <Text style={styles.actionText}>找回账号</Text>*/}
                {/*        </View>*/}
                {/*    </TouchableOpacity>*/}
                {/*</View>*/}
            </View>
        </SafeAreaView>
    );
};

const AgreementCheckbox = () => {
    const themes = useTheme();

    // const isChecked = useRegisterStore(state => state.isChecked);
    // const setIsChecked = useRegisterStore(state => state.setIsChecked);

    return (
        <View style={styles.checkboxContainer}>
            <CheckBox
                // checked={isChecked}
                // onChange={nextChecked => setIsChecked(nextChecked)}
            />
            <View style={styles.checkboxContent}>
                <Text style={styles.checkboxText}>
                    我已阅读并同意
                    <Text style={{ color: themes['color-primary-500'] }}> 用户协议 </Text>
                    和
                    <Text style={{ color: themes['color-primary-500'] }}> 隐私政策 </Text>
                </Text>
            </View>
        </View>
    );
};

const VerifyLoginButton = () => {
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
            <Text style={styles.buttonText}>验证并登录</Text>
        </Button>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    backText: {
        fontSize: 24,
    },
    helpText: {
        fontSize: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    desc: {
        fontSize: 14,
        color: '#999',
        marginBottom: 25,
    },
    phoneInput: {
        borderRadius: 8,
        marginBottom: 15,
    },
    countryCode: {
        fontSize: 16,
    },
    passwordLoginContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
    },
    passwordLoginText: {
        fontSize: 14,
        color: '#4285F4',
        marginLeft: 3,
    },
    checkboxContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
    },
    checkboxContent: {
        flexDirection: 'row',
        marginLeft: 10,
        alignItems: 'center',
    },
    checkboxText: {
        fontSize: 14,
        color: '#888888',
    },
    button: {
        width: '100%',
        height: 50,
        borderRadius: 12,
        borderWidth: 0,
        marginBottom: 25,
    },
    buttonText: {
        fontSize: 20,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    bottomActions: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 50,
    },
});

export default VerificationLogin;
