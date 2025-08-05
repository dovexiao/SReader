import React from 'react';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import TopAvatarColumn from '@/main/components/TopAvatarColumn.tsx';
import LearnMain from '@/main/components/LearnMain.tsx';
import { Divider } from '@ui-kitten/components';
import PanSwipeResponder from '@/main/components/PanSwipeResponder.tsx';
import { useGlobal } from '@/contexts/GlobalContext.tsx';
import { AppMainProps } from '@/main/types';

const AppMain: React.FC<AppMainProps> = ({ navigation }) => {
    const { PersonCenterRef } = useGlobal();

    const handleRightSwipe = () => {
        PersonCenterRef.current?.show();
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={'rgba(255,255,255,0)'} translucent={true} />
            <View style={{ height: StatusBar.currentHeight, backgroundColor: '#ffffff'}} />
            <View style={{ flex: 1, position: 'relative' }}>
                <TopAvatarColumn />
                <Divider/>
                <PanSwipeResponder
                    onSwipeRight={handleRightSwipe}
                    threshold={60} // 自定义滑动阈值
                    minVelocity={0.7} // 自定义最小速度
                >
                    <LearnMain />
                </PanSwipeResponder>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
});

export default AppMain;
