import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const NoVerificationCodeHelper = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>收不到验证码</Text>
            <Text style={styles.item}>
                1.确认手机号
                <Text style={styles.heightLight}> 135 5951 6636 </Text>
                是否填写正确
            </Text>
            <Text style={styles.item}>2.检查短信是否被安全软件拦截</Text>
            <Text style={styles.item}>3.使用语音验证码</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 10,
        paddingTop: 20,
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    item: {
        fontSize: 16,
        marginBottom: 10,
    },
    heightLight: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 18,
    },
});
