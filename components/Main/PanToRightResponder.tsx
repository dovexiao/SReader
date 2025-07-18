import React, { useRef } from "react";
import { PanResponder, View } from "react-native";

interface PanToRightResponderProps {
    children: React.ReactNode;
    onSwipeRight?: () => void;
    threshold?: number;
    minVelocity?: number;
}

const PanToRightResponder = ({
    children,
    onSwipeRight = () => {},
    threshold = 50,
    minVelocity = 0.5,
}: PanToRightResponderProps) => {
    const panResponder = useRef(
        PanResponder.create({
            // 是否成为手势响应者
            onStartShouldSetPanResponderCapture: () => false,
            onMoveShouldSetPanResponder: (_, gestureState) => {
                // 只响应水平滑动
                const isHorizontal = Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
                const isSignificant = Math.abs(gestureState.dx) > 10; // 初始阈值避免过于敏感
                return isHorizontal && isSignificant;
            },

            // 手势移动时
            onPanResponderMove: () => {},

            // 手势释放时
            onPanResponderRelease: (_, gestureState) => {
                const { dx, vx } = gestureState;

                // 判断是否为有效的向右滑动手势
                const isRightSwipe = dx > threshold;
                const hasMinVelocity = Math.abs(vx) > minVelocity;
                const isValidSwipe = isRightSwipe || (dx > 0 && hasMinVelocity);

                if (isValidSwipe) {
                    onSwipeRight();
                }
            },

            // 手势被系统终止时
            onPanResponderTerminate: () => {},

            // 拒绝成为响应者
            onPanResponderReject: () => {},

            // 阻止系统终止手势
            onPanResponderTerminationRequest: () => false,
        })
    ).current;

    return (
        <View style={{ flex: 1 }} {...panResponder.panHandlers}>
            {children}
        </View>
    );
};

export default PanToRightResponder;
