import React from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import { NavigationProps } from '../../../../types/navigationType.ts';
import { Divider, TopNavigationAction } from '@ui-kitten/components';
import TopNavigationOpe from '../../../../components/Main/TopNavigationOpe.tsx';
import { EditIcon } from '../../../../components/Icon';
import { useQuestionStore } from '../../questionBank/stores/question.store.ts';
import { useQuestionPaginatorStore } from '../stores';
import { PagerController } from '../components';

const QuestionPaginator: React.FC<NavigationProps> = ({ navigation, route }) => {
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
