import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
    Icon,
    Text,
    TopNavigation, useTheme,
} from '@ui-kitten/components';
import RandomAvatar from './RandomAvatar.tsx';
interface TopNavigationAvatarProps {
    navigation: any;
}
const TopAvatarColumn: React.FC<TopNavigationAvatarProps> = ({ navigation }) => {
    const themes = useTheme();
    const avatar = null;
    const systemNotificationsUnRead: number = 1;

    const handleGoToPersonCenter = () => {
        navigation.navigate('PersonCenter');
    };

    const renderAvatar = () : React.ReactElement => (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleGoToPersonCenter}>
                {avatar ?
                    <Image
                        source={{uri: 'https://randomuser.me/api/portraits/men/47.jpg'}} // Placeholder for avatar
                        style={styles.avatar}
                    /> :
                    <RandomAvatar size={45}/>
                }
            </TouchableOpacity>
            <View style={styles.userInfo}>
                <Text style={styles.name}>{'xxx'}</Text>
                <Text style={styles.title}>{'xxx-xxx-xxx'}</Text>
            </View>
        </View>
    );

    const renderNotification = () : React.ReactElement => (
        <TouchableOpacity style={styles.notificationContainer} onPress={() => navigation.navigate('SystemNotification')}>
            <Icon name={'bell-outline'} width={33} height={33} fill={themes['color-primary-500']} />
            {systemNotificationsUnRead !== 0 && <View style={styles.notificationBadge}>
                {/*<Text style={styles.notificationCount}>*/}
                {/*    {systemNotificationsUnRead > 99 ? '99+' : systemNotificationsUnRead}*/}
                {/*</Text>*/}
            </View>}
        </TouchableOpacity>
    )

    return (
        <TopNavigation
            title={renderAvatar}
            accessoryRight={renderNotification}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#FFFFFF',
    },
    avatar: {
        width: 45,
        height: 45,
        borderRadius: 25, // Makes the image circular
    },
    userInfo: {
        flex: 1, // Takes available space
        justifyContent: 'center',
        marginLeft: 12,
    },
    name: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#333333', // Darker color for name
        marginBottom: 2,
    },
    title: {
        fontSize: 14,
        color: '#757575', // Grey color for title
    },
    notificationContainer: {
        position: 'relative', // For positioning the badge
        marginLeft: 10, // Space from user info
        padding: 5, // Optional: for easier touch if it were a button
    },
    notificationBadge: {
        position: 'absolute',
        top: 3,
        right: 8,
        backgroundColor: '#f44e4b',
        borderRadius: 12, // Make it circular
        width: 12,
        height: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1, // Optional: white border around badge
        borderColor: '#FFFFFF', // Optional: white border around badge
    },
    notificationCount: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default TopAvatarColumn;
