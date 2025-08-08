import React, { forwardRef, useImperativeHandle } from 'react';
import {
    Dimensions,
    Pressable,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Animated, {
    interpolate,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import ProfileSection from '@/global/personCenter/components/ProfileSection.tsx';
import ActionsSection from '@/global/personCenter/components/ActionsSection.tsx';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PanSwipeResponder from '@/main/components/PanSwipeResponder.tsx';

type PersonCenterAPI = {
    show: () => void;
    hide: () => void;
    getVisible: () => boolean;
};

const modelWidth = Dimensions.get('window').width * 0.9;

const PersonCenter = forwardRef<PersonCenterAPI>((_, ref) => {
    const positionX = useSharedValue<number>(-modelWidth);
    const visible = useSharedValue(false);
    const display = useDerivedValue(() => {
        if (visible.value) {
            // console.log('show');
            return 'flex';
        // } else if (positionX.value < -modelWidth / 4 * 3) {
        //     console.log('hide', positionX.value);
        //     return 'none';
        }
        return 'none';
    });

    const showPersonCenter = () => {
        // Alert.alert('show');
        visible.value = true;
        positionX.value = withSpring(0, {
            mass: 1,
            stiffness: 100,
            damping: 20,
        });
    };

    const hidePersonCenter = () => {
        positionX.value = withSpring(-modelWidth, {
            mass: 1,
            stiffness: 100,
            damping: 15,
        }, () => {
            // visible.value = false;
        });
        const timer = setTimeout(() => {
            visible.value = false;
            clearTimeout(timer);
        }, 500);
    };

    const getVisible = () => {
        return visible.value;
    };

    useImperativeHandle(ref, () => ({
        show: showPersonCenter,
        hide: hidePersonCenter,
        getVisible,
    }));

    const containerStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: positionX.value }]
    }));

    const backdropStyle = useAnimatedStyle(() => ({
        display: display.value,
        opacity: interpolate(positionX.value, [-modelWidth, 0], [0, 1]),
    }));

    return (
        <>
            {/*<StatusBar barStyle="light-content" backgroundColor={'rgba(255,255,255,0)'} translucent={true} />*/}

            {/* 半透明遮罩层 */}
            <AnimatedPressable
                style={[styles.backdrop, backdropStyle]}
                onPress={hidePersonCenter}
            />

            {/* 侧边栏主体 */}
            <Animated.View style={[styles.container, containerStyle]}>
                <LinearGradient
                    style={{ flex: 1 }}
                    colors={['#F9FAFB', '#ffffff']}
                >
                    <PanSwipeResponder
                        onSwipeLeft={hidePersonCenter}
                        threshold={60}
                        minVelocity={0.7}
                    >
                        <View style={styles.content}>
                            <View style={{ height: StatusBar.currentHeight }} />

                            <View style={{ flex: 1 }}>
                                {/* Profile Section */}
                                <ProfileSection />
                                {/* Quick Actions Section */}
                                <ActionsSection />
                            </View>

                            {/* Logout Button */}
                            <TouchableOpacity style={styles.logoutButton}>
                                <Icon name="logout" size={20} color="#EF4444" />
                                <Text style={styles.logoutText}>退出登录</Text>
                            </TouchableOpacity>
                        </View>
                    </PanSwipeResponder>
                </LinearGradient>
            </Animated.View>
        </>
    );
});

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        width: modelWidth,
        height: '100%',
        backgroundColor: '#F9FAFB',
        zIndex: 100,
        borderRightWidth: 1,
        borderColor: '#ddd'
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 99
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
export type { PersonCenterAPI };
