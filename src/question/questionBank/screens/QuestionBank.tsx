import React from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    ScrollView,
} from 'react-native';
import { Divider, Text, TopNavigationAction } from '@ui-kitten/components';
import * as CommonIcon from '@/icon';
import TopNavigationOpe from '@/main/components/TopNavigationOpe.tsx';
import { useQuestionStore } from '../stores/question.store.ts';
import { FilterDisplayController } from '@/note/noteLibrary/components';
import { Question, QuestionBankProps } from '../types';
import { QuestionCard } from '../components';

const ADD_BUTTON_COLOR = '#4CAF50';

const QuestionBank: React.FC<QuestionBankProps> = ({ navigation }) => {
    const renderItemAccessory = () => {
        return (
            <TopNavigationAction
                icon={CommonIcon.FileAddIcon}
                onPress={() => {
                    navigation.navigate('OpeQuestion', { type: 'create' });
                }}
            />
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={{ height: StatusBar.currentHeight, backgroundColor: '#ffffff'}} />
            <TopNavigationOpe
                title={'题目库'}
                navigation={navigation}
                renderItemAccessory={renderItemAccessory}
            />
            <Divider />

            {/* 使用封装的筛选控制器组件 */}
            <FilterDisplayController
                FilterContent={FilterContent}
                MainContent={MainContent}
                containerStyle={styles.container}
            />
        </SafeAreaView>
    );
};

// 主内容
const MainContent: React.FC = () => {
    const questions = useQuestionStore(state => state.questions);

    const renderItem = ({ item }: { item: Question }) => (
        <QuestionCard question={item} />
    );

    return (
        <FlatList
            data={questions}
            renderItem={renderItem}
            keyExtractor={(item) => item.questionId}
            contentContainerStyle={styles.listContentContainer}
            showsVerticalScrollIndicator={false}
        />
    )
};

// 筛选内容
const FilterContent: React.FC = () => {
    return (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <Text>题目名称搜索</Text>
            <Text>最近题目名称搜索</Text>
            <Text>题目介绍搜索</Text>
            <Text>最近题目介绍搜索</Text>
            <Text>标签名称搜索</Text>
            <Text>最近标签名称搜索</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F0F0F0',
    },
    container: {
        flex: 1,
        paddingTop: 16,
        // paddingHorizontal: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 16,
    },
    searchInput: {
        // flex: 1,
        borderRadius: 20,
        fontSize: 14,
        color: '#333333',
        backgroundColor: '#ffffff',
        // paddingVertical: 0,
    },
    addButton: {
        backgroundColor: ADD_BUTTON_COLOR,
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
    },
    listContentContainer: {
        paddingBottom: 16,
    },
});

export default QuestionBank;
