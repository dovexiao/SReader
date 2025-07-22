import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ActionsSection = () => {
    const menuItems = [
        {
            icon: 'delete',
            title: '回收站',
            color: '#4285F4',
        },
        {
            icon: 'settings',
            title: '设置',
            color: '#4285F4',
        },
        {
            icon: 'help-outline',
            title: '反馈帮助',
            color: '#4285F4',
        },
        {
            icon: 'info-outline',
            title: '关于 RT',
            color: '#4285F4',
        },
    ];

    return (
        <View style={styles.quickActionsSection}>
            {/*<Text style={styles.sectionTitle}>Quick Actions</Text>*/}
            <View style={styles.menuContainer}>
                {menuItems.map((item, index) => (
                    <TouchableOpacity key={index} style={styles.menuItem}>
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
    quickActionsSection: {
        marginBottom: 40,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 16,
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

export default ActionsSection;
