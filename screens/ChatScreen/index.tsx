import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import TopTabColumnView from '../../components/mainComponents/TopTabColumnView.tsx';
import MessageList from './MessageList.tsx';
import FriendList from './FriendList.tsx';

interface ChatMainProps {
    navigation: any;
}

const tabs = [
    { key: 'xxx1', icon: 'message-circle-outline', label: '消息', screen: MessageList },
    { key: 'xxx2', icon: 'people-outline', label: '好友', screen: FriendList },
];


const ChatMain: React.FC<ChatMainProps> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TopTabColumnView tabs={tabs.map(tab => ({ icon: tab.icon, label: tab.label }))}>
                {tabs.map(tab => (
                    <tab.screen
                        key={tab.key}
                        navigation={navigation}
                    />
                ))}
            </TopTabColumnView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#ffffff',
        // paddingHorizontal: 10,
    },
});

export default ChatMain;
