import React from 'react';
import {NavigationProps} from '../types/navigationType.ts';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    View
} from 'react-native';
import TopAvatarColumn from '../components/mainComponents/TopAvatarColumn.tsx';
import BottomTabPageView from '../components/mainComponents/BottomTabPageView.tsx';
import ChatMain from './ChatScreen';
import LearnMain from './LearnScreen';
import SocializeMain from './SocializeScreen';
import {Divider} from '@ui-kitten/components';

const tabs = [
    { key: 'CHAT_SPACE', icon: 'message-square-outline', label: '聊天', screen: ChatMain },
    { key: 'xxx1', icon: 'bulb-outline', label: '学习', screen: LearnMain },
    { key: 'xxx2', icon: 'compass-outline', label: '发现', screen: SocializeMain },
];

const AppMain: React.FC<NavigationProps> = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={'#ffffff'} />
            <View style={{ flex: 1, position: 'relative' }}>
                <TopAvatarColumn
                    navigation={navigation}
                />
                <Divider/>
                <BottomTabPageView tabs={tabs.map(tab => ({ icon: tab.icon, label: tab.label }))}>
                    {tabs.map(tab => (
                        <tab.screen
                            key={tab.key}
                            navigation={navigation}
                        />
                    ))}
                </BottomTabPageView>
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
