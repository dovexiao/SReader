import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useGlobal } from '@contexts/GlobalContext.tsx';

// 测试页面组件
const BottomActionSheetTestScreen = () => {
    // 使用全局钩子获取底部操作栏引用
    const { actionDialogRef, bottomActionSheetRef, avatarActionsModalRef } = useGlobal();

    // 显示操作栏
    const showActionSheet1 = () => {
        actionDialogRef.current?.show({
            content: <View style={styles.actionSheetContent}>
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => {
                        console.log('选项一被点击');
                        actionDialogRef.current?.hide();
                    }}
                >
                    <Text style={styles.menuText}>选项一</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => {
                        console.log('选项二被点击');
                        actionDialogRef.current?.hide();
                    }}
                >
                    <Text style={styles.menuText}>选项二</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => actionDialogRef.current?.hide()}
                >
                    <Text style={styles.cancelText}>取消</Text>
                </TouchableOpacity>
            </View>,
        });
    };

    const showActionSheet2 = () => {
        bottomActionSheetRef.current?.show(<View style={styles.actionSheetContent}>
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                    console.log('选项一被点击');
                    actionDialogRef.current?.hide();
                }}
            >
                <Text style={styles.menuText}>选项一</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                    console.log('选项二被点击');
                    actionDialogRef.current?.hide();
                }}
            >
                <Text style={styles.menuText}>选项二</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => actionDialogRef.current?.hide()}
            >
                <Text style={styles.cancelText}>取消</Text>
            </TouchableOpacity>
        </View>);
    }

    const showActionSheet3 = () => {
        avatarActionsModalRef.current?.show();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>功能操作栏测试</Text>
            <TouchableOpacity
                style={styles.customButton}
                onPress={() => {
                    showActionSheet1();
                    // showActionSheet2();
                    // showActionSheet3();
                }}
            >
                <Text style={styles.customButtonText}>自定义按钮显示</Text>
            </TouchableOpacity>
        </View>
    );
};

// 样式定义
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
    },
    customButton: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#6200ee',
        borderRadius: 8,
        alignItems: 'center',
    },
    customButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
    actionSheetContent: {
        // padding: 16,
        backgroundColor: '#FFF',
    },
    menuItem: {
        paddingVertical: 18,
        alignItems: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e0e0e0',
        backgroundColor: 'white',
    },
    menuText: {
        fontSize: 16,
        color: '#333',
    },
    cancelButton: {
        // marginTop: 10,
        paddingVertical: 18,
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 12,
    },
    cancelText: {
        fontSize: 16,
        color: '#f44336',
        fontWeight: '500',
    },
});

export default BottomActionSheetTestScreen;
