import { Text } from '@ui-kitten/components';
import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';

const AppStart = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={'#ffffff'} />
            <View>
                <Text>开机</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
});

export default AppStart;
