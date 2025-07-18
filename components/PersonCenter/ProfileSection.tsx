import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';

const ProfileSection = () => {
    return (
        <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
                <Image
                    source={{
                        uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
                    }}
                    style={styles.avatar}
                />
            </View>
            <Text style={styles.name}>Dove xiao</Text>
            <Text style={styles.username}>Javascript 开发新人</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    profileSection: {
        alignItems: 'center',
        marginBottom: 40,
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 60,
        backgroundColor: '#E5E7EB',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 60,
    },
    name: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 4,
    },
    username: {
        fontSize: 16,
        color: '#6B7280',
    },
});

export default ProfileSection;
