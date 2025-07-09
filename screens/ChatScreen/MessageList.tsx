import React from 'react';
import {FlatList, Image, Pressable, StyleSheet, View} from 'react-native';
import RandomAvatar from '../../components/MainComponents/RandomAvatar.tsx';
import { Text } from '@ui-kitten/components';
import {formatTime} from '../../utils/formatTime.ts';

export interface ChatSpaceType {
    spaceId: string,
    type: 'friend' | 'group',
    name: string,
    avatar: string,
    introduction: string,
    latestMessage: string,
    unread: number,
    timestamp: number
}

interface MessageListProps {
    navigation: any;
}

const friends: ChatSpaceType[] = [
    {
        spaceId: 'xxx1',
        type: 'friend',
        name: '小王',
        avatar: '',
        introduction: '小王是一个好听的人',
        latestMessage: '你好，我是小王',
        unread: 0,
        timestamp: Date.now(),
    },
    {
        spaceId: 'xxx2',
        type: 'friend',
        name: '小王',
        avatar: '',
        introduction: '小王是一个好听的人',
        latestMessage: '你好，我是小王',
        unread: 0,
        timestamp: Date.now(),
    },
    {
        spaceId: 'xxx3',
        type: 'friend',
        name: '小王',
        avatar: '',
        introduction: '小王是一个好听的人',
        latestMessage: '你好，我是小王',
        unread: 0,
        timestamp: Date.now(),
    },
    {
        spaceId: 'xxx4',
        type: 'friend',
        name: '小王',
        avatar: '',
        introduction: '小王是一个好听的人',
        latestMessage: '你好，我是小王',
        unread: 0,
        timestamp: Date.now(),
    },
    {
        spaceId: 'xxx5',
        type: 'friend',
        name: '小王',
        avatar: '',
        introduction: '小王是一个好听的人',
        latestMessage: '你好，我是小王',
        unread: 0,
        timestamp: Date.now(),
    },
    {
        spaceId: 'xxx6',
        type: 'friend',
        name: '小王',
        avatar: '',
        introduction: '小王是一个好听的人',
        latestMessage: '你好，我是小王',
        unread: 0,
        timestamp: Date.now(),
    },
];

const MessageList: React.FC<MessageListProps> = ({ navigation }) => {
    const ContactItem = ({ item }: { item: ChatSpaceType }) => {
        return (
            <Pressable style={styles.contactItem} onPress={() => navigation.navigate('ChatSpace', { item })}>
                {item.avatar ?
                    <Image
                        source={{ uri: item.avatar }}
                        style={styles.avatar}
                    /> :
                    <RandomAvatar size={50}/>
                }

                <View style={styles.contactInfo}>
                    <View style={styles.nameContainer}>
                        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                        <Text style={styles.time}>{formatTime(item.timestamp, { format: 'relative' })}</Text>
                    </View>
                    {/*<Text style={styles.introduction} numberOfLines={1}>{item.introduction}</Text>*/}
                    <Text style={styles.message} numberOfLines={1}>{item.latestMessage}</Text>
                </View>
            </Pressable>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={friends}
                keyExtractor={(item) => item.spaceId}
                renderItem={({ item }) => <ContactItem item={item} />}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#FFFFFF',
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    contactInfo: {
        flex: 1,
        marginLeft: 12,
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 0,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 8,
    },
    introduction: {
        fontSize: 12,
        color: '#757575',
        marginBottom: 8,
    },
    message: {
        fontSize: 14,
        color: '#333333',
    },
    time: {
        fontSize: 12,
        color: '#757575',
    },
});

export default MessageList;
