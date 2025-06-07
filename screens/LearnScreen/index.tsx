import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import TopTabColumnView from '../../components/mainComponents/TopTabColumnView.tsx';
import NoteLibrary from './NoteLibrary.tsx';
import QuestionBank from './QuestionBank.tsx';

interface ChatMainProps {
    navigation: any;
}

const tabs = [
    { key: 'xxx1', icon: 'file-text-outline', label: '笔记', screen: NoteLibrary },
    { key: 'xxx2', icon: 'book-outline', label: '题目', screen: QuestionBank },
];


const LearnMain: React.FC<ChatMainProps> = ({ navigation }) => {
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

export default LearnMain;
