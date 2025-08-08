import React from 'react';
import {
    SafeAreaView, StatusBar,
    StyleSheet, View,
} from 'react-native';
import { FriendList, TopTabColumnView } from '@/center/recycleBin/components';
import TopNavigationOpe from '@/main/components/TopNavigationOpe.tsx';
import {Divider} from '@ui-kitten/components';
import { RecycleBinProps } from '@/center/recycleBin/types';

const tabs = [
    { key: 'tab1', icon: 'file-text-outline', label: '笔记', screen: FriendList },
    { key: 'tab2', icon: 'book-open-outline', label: '题目', screen: FriendList },
];

const RecycleBin: React.FC<RecycleBinProps> = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={{ height: StatusBar.currentHeight, backgroundColor: '#FFFFFF'}} />
            <TopNavigationOpe
                title={'回收站'}
                navigation={navigation}
            />
            <Divider />
            {/*<TopTabColumnView tabs={tabs.map(tab => ({ icon: tab.icon, label: tab.label }))}>*/}
            {/*    {tabs.map(tab => (*/}
            {/*        <tab.screen*/}
            {/*            key={tab.key}*/}
            {/*        />*/}
            {/*    ))}*/}
            {/*</TopTabColumnView>*/}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
});

export default RecycleBin;
