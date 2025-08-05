import {Icon, Spinner} from '@ui-kitten/components';
import React, {forwardRef, useEffect, useImperativeHandle, useRef} from 'react';
import {
    Dimensions,
    Image,
    ImageBackground,
    PanResponder,
    StyleSheet,
    Text,
    View,
    TouchableOpacity, // 添加 TouchableOpacity 用于关闭按钮
} from 'react-native';
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import { useVerificationStore } from '@/global/sliderVerification/stores';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BACKGROUND_WIDTH = SCREEN_WIDTH - 100;

type SliderVerificationAPI =  {
    showVerification: () => Promise<void>;
    closeVerification: () => void;
}

// 使用 forwardRef 包裹组件
export const SliderVerification = forwardRef<SliderVerificationAPI>((props, ref) => {
    const sliderOffset = useSharedValue(0);
    const sliderPosition = useSharedValue(0);

    const verificationVisible = useVerificationStore(state => state.verificationVisible);
    const bgImage = useVerificationStore(state => state.bgImage);
    const puzzleImage = useVerificationStore(state => state.puzzleImage);
    const verificationImageLoading = useVerificationStore(state => state.verificationImageLoading);
    const verificationStatusLoading = useVerificationStore(state => state.verificationStatusLoading);
    const verificationStatus = useVerificationStore(state => state.verificationStatus);
    const bgAspectRatio = useVerificationStore(state => state.bgAspectRatio);
    const puzzleSizeRatio = useVerificationStore(state => state.puzzleSizeRatio);
    const puzzlePositionYRatio = useVerificationStore(state => state.puzzlePositionYRatio);
    const setVerificationStatus = useVerificationStore(state => state.setVerificationStatus);
    const setVerificationVisible = useVerificationStore(state => state.setVerificationVisible);
    const fetchVerificationImage = useVerificationStore(state => state.fetchVerificationImage);
    const fetchVerificationStatus = useVerificationStore(state => state.fetchVerificationStatus);
    const resetSliderVerification = useVerificationStore(state => state.resetSliderVerification);

    // 拼图位置X轴动画值
    const puzzlePositionX = useDerivedValue(() => {
        return sliderPosition.value * BACKGROUND_WIDTH * (1 - puzzleSizeRatio) / (BACKGROUND_WIDTH - 40);
    });

    const verificationImageLoadingRef = useRef(verificationImageLoading);
    const verificationStatusLoadingRef = useRef(verificationStatusLoading);
    const verificationStatusRef = useRef(verificationStatus);

    // 在组件中添加
    useEffect(() => {
        verificationImageLoadingRef.current = verificationImageLoading;
        verificationStatusLoadingRef.current = verificationStatusLoading;
        verificationStatusRef.current = verificationStatus;
    }, [verificationImageLoading, verificationStatusLoading, verificationStatus]);

    // 暴露给外部的方法
    const showVerification = async () => {
        setVerificationVisible(true);
        await fetchVerificationImage();
    };

    // 暴露给外部的方法
    const closeVerification = () => {
        setVerificationVisible(false);
        resetSliderVerification();
        sliderOffset.value = 0;
        sliderPosition.value = 0;
    };

    // 使用 useImperativeHandle 暴露方法给 ref
    useImperativeHandle(ref, () => ({
        showVerification,
        closeVerification,
    }));

    // 创建拖拽响应器
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gestureState) => {
                if (!verificationStatusLoadingRef.current && !verificationImageLoadingRef.current) {
                    sliderPosition.value = Math.max(0,
                        Math.min(sliderOffset.value + gestureState.dx, BACKGROUND_WIDTH - 40)
                    );
                }
            },
            onPanResponderRelease: (_, gestureState) => {
                if (!verificationStatusLoadingRef.current && !verificationImageLoadingRef.current) {
                    sliderOffset.value = sliderPosition.value;
                    fetchVerificationStatus(sliderPosition.value).then(() => {
                        const timer = setTimeout(() => {
                            if (verificationStatusRef.current === 'success') {
                                closeVerification();
                            } else {
                                runOnJS(setVerificationStatus)('default');
                                sliderPosition.value = withSpring(0, {
                                    mass: 1,
                                    stiffness: 100,
                                    damping: 50,
                                }, () => {
                                    sliderOffset.value = 0;
                                });
                            }
                            clearTimeout(timer);
                        }, 2000);
                    });
                }
            },
        })
    ).current;

    const sliderStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: sliderPosition.value }],
            backgroundColor: verificationStatus === 'default' ? '#4a95fc' :
                verificationStatus === 'success' ? '#73cdba' : '#e67c7b',
            borderColor: verificationStatus === 'default' ? '#4a95fc' :
                verificationStatus === 'success' ? '#73cdba' : '#e67c7b',
        };
    });

    const puzzleStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: puzzlePositionX.value }],
            top: BACKGROUND_WIDTH * puzzlePositionYRatio,
        };
    });

    const trackActiveStyle = useAnimatedStyle(() => {
        return {
            width: sliderPosition.value,
            borderColor: verificationStatus === 'default' ? '#4a95fc' :
                verificationStatus === 'success' ? '#73cdba' : '#e67c7b',
        };
    });

    const trackStyle = useAnimatedStyle(() => {
        return {
            width: BACKGROUND_WIDTH - sliderPosition.value,
        };
    });

    const hintTextStyle = useAnimatedStyle(() => {
        return {
            display: sliderPosition.value === 0 && !verificationStatus ? 'flex' : 'none',
        };
    });

    return (
        <>
            {/* 验证组件 */}
            {verificationVisible && (
                // 修改1: 将 Pressable 改为 View 并移除 onPress
                <View style={styles.container}>
                    <View style={styles.verificationBox}>
                        {/* 新增右上角关闭按钮 */}
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={closeVerification}
                        >
                            <Icon
                                name="close-outline"
                                fill="#666"
                                width={24}
                                height={24}
                            />
                        </TouchableOpacity>

                        <Text style={styles.verificationTitle}>{
                            verificationStatus === 'default' ? '滑动拼图完成验证' :
                                verificationStatus === 'success' ? '验证成功' : '验证失败'
                        }</Text>

                        {/* 背景图 - 使用内置图片作为占位 */}
                        <View style={[
                            styles.backgroundContainer,
                            {
                                width: BACKGROUND_WIDTH,
                                height: BACKGROUND_WIDTH * bgAspectRatio,
                            },
                        ]}>
                            {verificationImageLoading ? (
                                <Spinner size="giant"/>
                            ) : (
                                <>
                                    {bgImage && <ImageBackground
                                        source={{ uri: bgImage }}
                                        style={styles.backgroundImage}
                                        resizeMode="cover"
                                    >
                                        {/* 目标位置标记 */}
                                        <Animated.View
                                            style={[
                                                styles.puzzlePiece,
                                                puzzleStyle,
                                            ]}
                                        >
                                            {/*拼图块 - 使用内置图标*/}
                                            {puzzleImage && <Image
                                                source={{ uri: puzzleImage }}
                                                style={[
                                                    styles.puzzleImage,
                                                    {
                                                        width: BACKGROUND_WIDTH * puzzleSizeRatio,
                                                        height: BACKGROUND_WIDTH * puzzleSizeRatio,
                                                        borderRadius: BACKGROUND_WIDTH * puzzleSizeRatio / 2,
                                                    },
                                                ]}
                                            />}
                                        </Animated.View>
                                    </ImageBackground>}
                                </>
                            )}
                        </View>

                        {/* 拼图轨道 */}
                        <View style={styles.trackContainer}>
                            <Animated.View
                                style={[
                                    styles.trackActive,
                                    trackActiveStyle,
                                ]}
                            />
                            <Animated.View
                                style={[
                                    styles.track,
                                    trackStyle,
                                ]}
                            >
                                <Animated.View style={hintTextStyle}>
                                    <Text>向右拖动滑块填充拼图</Text>
                                </Animated.View>
                            </Animated.View>
                            <Animated.View
                                style={[
                                    styles.slider,
                                    sliderStyle,
                                ]}
                                {...panResponder.panHandlers}
                            >
                                { verificationStatusLoading ? (
                                    <Spinner style={{ borderColor: '#fff' }}/>
                                ) : (
                                    <Icon
                                        name={
                                            verificationStatus === 'default' ? 'arrowhead-right-outline' :
                                                verificationStatus === 'success' ? 'checkmark-outline' :
                                                    'close-outline'
                                        }
                                        fill={'#fff'}
                                        width={30}
                                        height={30}
                                    />
                                )
                                }
                            </Animated.View>
                        </View>
                    </View>
                </View>
            )}
        </>
    );
});

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    verificationBox: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
        // 添加相对定位，使关闭按钮能定位在右上角
        position: 'relative',
    },
    // 新增关闭按钮样式
    closeButton: {
        position: 'absolute',
        top: 12,
        right: 12,
        zIndex: 20,
        padding: 5, // 增加点击区域
    },
    verificationTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    backgroundContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 25,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
    },
    puzzlePiece: {
        position: 'absolute',
        zIndex: 10,
    },
    puzzleImage: {
        // borderWidth: 2,
        // borderColor: '#3498db',
    },
    trackContainer: {
        flexDirection: 'row',
        width: BACKGROUND_WIDTH,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    trackActive: {
        height: 40,
        borderTopLeftRadius: 2,
        borderBottomLeftRadius: 2,
        borderWidth: 1,
    },
    track: {
        height: 40,
        backgroundColor: '#f0f0f0',
        borderTopRightRadius: 2,
        borderBottomRightRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    slider: {
        position: 'absolute',
        left: 0,
        width: 40,
        height: 40,
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopRightRadius: 2,
        borderBottomRightRadius: 2,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    statusText: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    successText: {
        color: '#27ae60',
    },
    errorText: {
        color: '#e74c3c',
    },
    hintText: {
        marginTop: 15,
        color: '#7f8c8d',
        fontSize: 14,
    },
});

export default SliderVerification;
export type { SliderVerificationAPI };
