import { Text } from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const OtherSection = () => {
    const menuItems = [
        {
            icon: 'sync-alt',
            title: '切换账号',
            color: '#4285F4',
            onPress: () => {
                console.log('点击了切换账号');
            },
        },
        {
            icon: 'logout',
            title: '退出登录',
            color: '#4285F4',
            onPress: () => {
                console.log('点击了退出登录');
            },
        },
    ];

    return (
        <View style={styles.sectionContainer}>
            {/*<Text style={styles.sectionTitle}>登出</Text>*/}
            <View style={styles.menuContainer}>
                {menuItems.map((item, index) => (
                    <TouchableOpacity key={index} style={styles.menuItem} onPress={() => {
                        item?.onPress?.();
                    }}>
                        <View style={styles.menuItemLeft}>
                            <View style={[styles.iconContainer, {backgroundColor: item.color + '15'}]}>
                                <Icon name={item.icon} size={20} color={item.color} />
                            </View>
                            <Text style={styles.menuItemText}>{item.title}</Text>
                        </View>
                        <Icon name="chevron-right" size={20} color="#9CA3AF" />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        marginBottom: 30,
        marginHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#787878',
        marginLeft: 15,
        marginBottom: 7,
    },
    menuContainer: {
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        overflow: 'hidden',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF',
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    menuItemText: {
        fontSize: 16,
        color: '#1F2937',
        // fontWeight: '500',
    },
});
