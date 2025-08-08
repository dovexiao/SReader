import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ActionsSection, ProfileSection } from '@/center/personCenter/components';

// 个人中心具体内容：仅包含UI和内容相关逻辑
const PersonCenter = () => {

    return (
        <LinearGradient
            style={styles.gradientContainer}
            colors={['#F9FAFB', '#FFFFFF']}
        >
            <View style={styles.innerContent}>
                {/* 个人信息区域 */}
                <ProfileSection />
                {/* 操作项区域 */}
                <ActionsSection />
            </View>

            {/* 退出登录按钮 */}
            <TouchableOpacity style={styles.logoutButton}>
                <Icon name="logout" size={20} color="#EF4444" />
                <Text style={styles.logoutText}>退出登录</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradientContainer: {
        flex: 1,
    },
    innerContent: {
        flex: 1,
    },
    logoutButton: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        marginBottom: 40,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#F3F4F6',
    },
    logoutText: {
        color: '#EF4444',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
});

export default PersonCenter;
