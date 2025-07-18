import React from 'react';
import {NavigationProps} from '../types/navigationType.ts';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import TopAvatarColumn from '../components/Main/TopAvatarColumn.tsx';
// import BottomTabPageView from '../components/Main/BottomTabPageView.tsx';
import ChatMain from './ChatScreen';
import LearnMain from './LearnScreen';
import SocializeMain from './SocializeScreen';
import { Divider } from '@ui-kitten/components';
import PanSwipeResponder from "../components/Main/PanSwipeResponder.tsx";
import { useGlobal } from "../hooks/GlobalContext.tsx";

const tabs = [
    { key: 'CHAT_SPACE', icon: 'android-messages', label: '聊天', screen: ChatMain },
    { key: 'xxx1', icon: 'head-lightbulb-outline', label: '学习', screen: LearnMain },
    { key: 'xxx2', icon: 'compass-outline', label: '发现', screen: SocializeMain },
];

const AppMain: React.FC<NavigationProps> = ({ navigation }) => {
    const { PersonCenterRef } = useGlobal();

    const handleRightSwipe = () => {
        // 这里可以执行显示侧边栏等操作
        PersonCenterRef.current.show();
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={'rgba(255,255,255,0)'} translucent={true} />
            <View style={{ height: StatusBar.currentHeight, backgroundColor: '#ffffff'}} />

            {/*<StatusBar barStyle="dark-content" backgroundColor={'rgb(255,255,255)'} translucent={false} />*/}

            <View style={{ flex: 1, position: 'relative' }}>
                <TopAvatarColumn />
                <Divider/>
                <PanSwipeResponder
                    onSwipeRight={handleRightSwipe}
                    threshold={60} // 可自定义滑动阈值
                    minVelocity={0.7} // 可自定义最小速度
                >
                    <LearnMain navigation={navigation} />
                </PanSwipeResponder>
                {/*<BottomTabPageView tabs={tabs.map(tab => ({ icon: tab.icon, label: tab.label }))}>*/}
                {/*    {tabs.map(tab => (*/}
                {/*        <tab.screen*/}
                {/*            key={tab.key}*/}
                {/*            navigation={navigation}*/}
                {/*        />*/}
                {/*    ))}*/}
                {/*</BottomTabPageView>*/}
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
