import React, { forwardRef, useImperativeHandle } from 'react';
import {Alert, Pressable, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Animated, {
    interpolate,
    runOnJS,
    SensorType,
    useAnimatedSensor,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withSpring,
    Easing,
    withTiming,
} from 'react-native-reanimated';
import Icon from "react-native-vector-icons/MaterialIcons";
import {usePermission} from "../../hooks/usePermission.ts";
import ImagePicker from "react-native-image-crop-picker";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { useAuthStore } from "../../stores/auth.store.ts";

type AvatarActionsModalHandle = {
    show: () => void;
    hide: () => void;
};

type AvatarActionsMenu = {
    title: string;
    permission: string | null;
};

const actionsMenu: AvatarActionsMenu[] = [{
    title: '从相册选择',
    permission: 'photos',
}, {
    title: '拍照',
    permission: 'camera',
}, {
    title: '保存图片',
    permission: null,
}];

const AvatarActionsModal = forwardRef<AvatarActionsModalHandle>((_, ref) => {
    // 渐变动画值
    const transitionValue = useSharedValue(0);
    // 动画持续时间
    const transitionTime: number = 250;

    // 相机权限hook
    const cameraPermission = usePermission({
        permission: 'camera',
        rationale: {
            title: '开启相机权限',
            message: 'RTalky 需要相机权限用于拍摄照片更新头像',
            positiveButton: '去开启'
        },
        settings: {
            title: '权限被拒绝',
            message: '请在设置中允许相机权限，并重启应用以维持最佳',
            positiveButton: '去设置'
        }
    });

    // 相册权限hook
    const photosPermission = usePermission({
        permission: 'photos',
        rationale: {
            title: '开启图片和视频权限',
            message: 'RTalky 需要图片和视频权限用于选择本地图片更新头像',
            positiveButton: '去开启'
        },
        settings: {
            title: '权限被拒绝',
            message: '请在设置中允许图片和视频权限，并重启应用以维持最佳',
            positiveButton: '去设置'
        }
    });

    const avatar = useAuthStore(state => state.avatar);
    const setAvatar = useAuthStore(state => state.setAvatar);

    const display = useDerivedValue(() => {
        // console.log('display', transitionValue.value);
        return transitionValue.value > 0 ? 'flex' : 'none';
    });

    const backdropStyle = useAnimatedStyle(() => ({
        display: display.value,
        opacity: interpolate(transitionValue.value, [0, 1], [0, 1]),
    }));

    const modalStyle = useAnimatedStyle(() => ({
        display: display.value,
        // opacity: interpolate(transitionValue.value, [0, 1], [0, 1]),
    }));

    const menuStyle = useAnimatedStyle(() => ({
        display: display.value,
        opacity: interpolate(transitionValue.value, [0, 1], [0, 1]),
    }));

    const showActionsModal = () => {
        transitionValue.value = withTiming(1, {
            duration: transitionTime, // 动画持续时间（毫秒）
            easing: Easing.linear, // 线性插值，适合模拟时间流逝
        });
    };

    const hideActionsModal = () => {
        transitionValue.value = withTiming(0, {
            duration: transitionTime, // 动画持续时间（毫秒）
            easing: Easing.linear, // 线性插值，适合模拟时间流逝
        });
    };

    useImperativeHandle(ref, () => ({
        show: showActionsModal,
        hide: hideActionsModal,
    }));

    return (
        <>
            {/* 半透明遮罩层 */}
            <AnimatedPressable
                style={[styles.backdrop, backdropStyle]}
                onPress={hideActionsModal}
            />

            <Animated.View
                style={[styles.container, modalStyle]}
            >
                <Animated.View style={[styles.menuContainer, menuStyle]}>
                    {actionsMenu.map((item, index) => (
                        <React.Fragment key={index}>
                            <TouchableOpacity
                                style={styles.menuItem}
                                onPress={async () => {
                                    if (item.permission === 'photos') {
                                        // console.log('photosPermission')
                                        // await photosPermission.requestPermission();
                                        if (await photosPermission.requestPermission()) {
                                            // console.log('已打开相册');
                                            ImagePicker.openPicker({
                                                width: 400,
                                                height: 400,
                                                cropping: true,
                                                cropperCircleOverlay: true,
                                                includeBase64: true,
                                            }).then((image) => {
                                                // console.log(image);
                                                hideActionsModal();
                                                setAvatar(image.path);
                                            });
                                        }
                                        // console.log('photosPermission', photosPermission.isGranted);
                                    } else if (item.permission === 'camera') {
                                        // console.log('cameraPermission')
                                        // await cameraPermission.requestPermission();
                                        if (await cameraPermission.requestPermission()) {
                                            // Alert.alert('已打开相机');
                                            ImagePicker.openCamera({
                                                width: 400,
                                                height: 400,
                                                cropping: true,
                                                cropperCircleOverlay: true,
                                                includeBase64: true,
                                            }).then((image) => {
                                                // console.log(image);
                                                hideActionsModal();
                                                setAvatar(image.path);
                                            });
                                        }
                                        // console.log('cameraPermission', cameraPermission.isGranted);
                                    } else {
                                        console.log('保存图片');
                                        // Alert.alert('已保存图片');
                                        await CameraRoll.save(avatar, {type: 'photo'});
                                    }
                                }}
                            >
                                <Text style={styles.menuItemText}>{item.title}</Text>
                            </TouchableOpacity>
                            <View style={styles.divider}/><View/>
                        </React.Fragment>
                    ))}
                </Animated.View>
                <AnimatedTouchableOpacity
                    style={[styles.closeButton, menuStyle]}
                    onPress={hideActionsModal}
                >
                    <Text style={styles.closeButtonText}>取消</Text>
                </AnimatedTouchableOpacity>
            </Animated.View>
        </>
    );
});

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        marginBottom: 20,
        paddingHorizontal: 8,
        zIndex: 200,
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 199
    },
    menuContainer: {
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        marginBottom: 20,
        overflow: 'hidden',
    },
    menuItem: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
        // marginBottom: 1,
        backgroundColor: '#FFFFFF',
        // borderBottomWidth: 1,
        // borderBottomColor: '#F3F4F6',
    },
    menuItemText: {
        fontSize: 16,
        color: '#1F2937',
        // fontWeight: '500',
    },
    closeButton: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF',
    },
    closeButtonText: {
        fontSize: 16,
        color: '#1F2937',
        // fontWeight: '500',
    },
    divider: {
        height: 1,
        backgroundColor: '#F3F4F6',
    },
});

export default AvatarActionsModal;
