import React from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import { Divider, TopNavigationAction } from '@ui-kitten/components';
import TopNavigationOpe from '@/main/components/TopNavigationOpe.tsx';
import { EditIcon } from '@/icon';
import { useQuestionStore } from '@/question/questionBank/stores';
import { useQuestionPaginatorStore } from '../stores';
import { PagerController } from '../contexts';
import { QuestionPaginatorProps } from '@/question/questionPaginator/types';

const QuestionPaginator: React.FC<QuestionPaginatorProps> = ({ navigation, route }) => {
    const { questionId } = route.params;
    const questions = useQuestionStore(state => state.questions);
    const currentPage = useQuestionPaginatorStore(state => state.currentPage);

    const renderItemAccessory = () => {
        return (
            <TopNavigationAction
                icon={EditIcon}
                onPress={() => {
                    navigation.navigate('OpeQuestion', { type: 'update', questionId: questions[currentPage].questionId });
                }}
            />
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={{ height: StatusBar.currentHeight, backgroundColor: '#ffffff'}} />
            <TopNavigationOpe
                title={'题目详情'}
                navigation={navigation}
                renderItemAccessory={renderItemAccessory}
            />
            <Divider />

            <PagerController questions={questions} currentQuestionId={questionId}/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
});

export default QuestionPaginator;
