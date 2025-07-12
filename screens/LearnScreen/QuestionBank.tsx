import React from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import { NavigationProps } from '../../types/navigationType.ts';
import { Divider, Text, TopNavigationAction } from '@ui-kitten/components';
import * as CommonIcon from '../../components/Icon';
import QuestionCard from '../../components/Learn/question/QuestionCard.tsx';
// import { useGlobal } from '../../hooks/GlobalContext.tsx';
import TopNavigationOpe from '../../components/Main/TopNavigationOpe.tsx';
import {Question, useQuestionStore} from '../../stores/question.store.ts';
import {useOpeQuestionStore} from '../../stores/opeQuestion.store.ts';

// const ICON_COLOR = '#555555';
const ADD_BUTTON_COLOR = '#4CAF50';

const QuestionBank: React.FC<NavigationProps> = ({ navigation }) => {
    // const questionBank = route.params.item;

    // const { OverflowMenuRef } = useGlobal();

    const questions = useQuestionStore(state => state.questions);
    const initialize = useOpeQuestionStore(state => state.initialize);

    const renderItem = ({ item }: { item: Question }) => (
        <QuestionCard question={item} />
    );

    const renderItemAccessory = () => {
        return (
            <TopNavigationAction
                icon={CommonIcon.FileAddIcon}
                onPress={() => {
                    initialize(undefined);
                    navigation.navigate('OpeQuestion', {type: 'create'});
                }}
            />
            // <TopNavigationAction
            //     icon={CommonIcon.SettingsIcon}
            //     onPress={() => OverflowMenuRef.current?.show([{
            //         icon: CommonIcon.MoreSelectIcon,
            //         title: '题库管理',
            //         onPress: () => {
            //             console.log('修改库名');
            //         },
            //     }, {
            //         icon: CommonIcon.PeopleIcon,
            //         title: '共建管理',
            //         onPress: () => {
            //             console.log('管理共建');
            //         },
            //     }, {
            //         icon: CommonIcon.FileAddIcon,
            //         title: '创建题目',
            //         onPress: () => {
            //             navigation.navigate('CreateQuestion');
            //         },
            //     }, {
            //         icon: CommonIcon.ATIcon,
            //         title: 'aigc题目',
            //         onPress: () => {
            //             navigation.navigate('AigcQuestion');
            //         },
            //     }], { x: 5, y: -45 })}
            // />
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={'#ffffff'} />
            <TopNavigationOpe
                title={'题目库'}
                navigation={navigation}
                renderItemAccessory={renderItemAccessory}
            />
            <Divider />
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text>筛选机制[题目类型/题目内容/题目标签]在此添加</Text>
                    {/*<View style={{ flex: 1 }}>*/}
                    {/*    <Input*/}
                    {/*        value={search}*/}
                    {/*        onChangeText={(text) => setSearch(text)}*/}
                    {/*        accessoryLeft={CommonIcon.SearchIcon}*/}
                    {/*        style={styles.searchInput}*/}
                    {/*        placeholder="搜索题面/题型/创建者/标签..."*/}
                    {/*    />*/}
                    {/*</View>*/}
                </View>
                <FlatList
                    data={questions}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.questionId}
                    contentContainerStyle={styles.listContentContainer}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
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
        paddingHorizontal: 16,
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
