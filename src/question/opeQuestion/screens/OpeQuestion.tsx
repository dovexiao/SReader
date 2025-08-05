import React, {useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView, StatusBar,
} from 'react-native';
import { Button, Divider } from '@ui-kitten/components';
import TopNavigationOpe from '@/main/components/TopNavigationOpe.tsx';
import {
    AnalysisEditor,
    FillInBlankEditor,
    JudgementEditor,
    MultipleChoiceEditor,
    QuestionContentEditor,
    QuestionTypeDisplay,
    QuestionTypeSelector,
    ShortAnswerEditor,
    QuestionTagsEditor,
} from '../components';
import { useOpeQuestionStore } from '../stores/opeQuestion.store.ts';
import { useQuestionStore } from '../../questionBank/stores/question.store.ts';
import { OpeQuestionProps } from '../types';

const OpeQuestion: React.FC<OpeQuestionProps> = ({ navigation, route }) => {
    const { type: opeType, questionId } = route.params;

    const question = useQuestionStore(state => state.questions.filter(q => q.questionId === questionId)[0]);
    const initialize = useOpeQuestionStore(state => state.initialize);
    const reset = useOpeQuestionStore(state => state.reset);

    useEffect(() => {
        initialize(question);
        return () => {
            reset();
        };
    }, [initialize, question, reset]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={{ height: StatusBar.currentHeight, backgroundColor: '#ffffff'}} />
            <TopNavigationOpe
                title={opeType === 'create' ? '创建新题目' : '编辑题目'}
                navigation={navigation}
                renderItemAccessory={() => <></>}
            />
            <Divider />
            <ScrollView style={styles.container}>
                {opeType === 'create' ? <QuestionTypeSelector/> :
                    opeType === 'update' ? <QuestionTypeDisplay /> :
                        <Text>显示出错</Text>}

                <QuestionContentEditor />

                <QuestionBodyEditors />

                <AnalysisEditor />

                {opeType === 'create' ? <></> :
                    opeType === 'update' ? <QuestionTagsEditor /> :
                        <Text>显示出错</Text>}

                {opeType === 'create' ? <NextStepButton navigation={navigation} /> :
                    opeType === 'update' ? <SaveStepButton navigation={navigation} /> :
                        <Text>显示出错</Text>}

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

const QuestionBodyEditors = () => {
    const selectedType = useOpeQuestionStore(state => state.questionType);

    return (
        <>
            <View style={[
                { display: selectedType !== '单选题' && selectedType !== '多选题' ? 'none' : 'flex' },
            ]}>
                <MultipleChoiceEditor />
            </View>

            <View style={[
                { display: selectedType !== '填空题' ? 'none' : 'flex' },
            ]}>
                <FillInBlankEditor />
            </View>

            <View style={[
                { display: selectedType !== '判断题' ? 'none' : 'flex' },
            ]}>
                <JudgementEditor />
            </View>

            <View style={[
                { display: selectedType !== '简答题' ? 'none' : 'flex' },
            ]}>
                <ShortAnswerEditor />
            </View>
        </>
    );
};

const NextStepButton = ({ navigation }: { navigation: any }) => {
    const isNextDisabled = useOpeQuestionStore(state => state.isOpeDisabled);

    // 获取题型对应的题干
    const getQuestionBody = useOpeQuestionStore(state => {
        switch (state.questionType) {
            case '单选题':
            case '多选题': return state.options;
            case '填空题': return state.blanks;
            case '判断题': return state.correctAnswer;
            case '简答题': return state.shortAnswer;
            default: return null;
        }
    });

    const handleNext = () => {
        const state = useOpeQuestionStore.getState();
        navigation.navigate('CreateQuestionTag', {
            question: {
                type: state.questionType,
                content: state.questionContent,
                body: getQuestionBody,
                analysis: state.questionAnalysis,
            },
        });
    };

    return (
        <Button style={styles.endButton} onPress={handleNext} disabled={isNextDisabled}>
            <Text style={styles.endButtonText}>下一步</Text>
        </Button>
    );
};

const SaveStepButton = ({ navigation }: { navigation: any }) => {
    const isSaveDisabled = useOpeQuestionStore(state => state.isOpeDisabled);
    const updateQuestion = useQuestionStore(state => state.updateQuestion);

    // 获取题型对应的题干
    const getQuestionBody = useOpeQuestionStore(state => {
        switch (state.questionType) {
            case '单选题':
            case '多选题': return state.options;
            case '填空题': return state.blanks;
            case '判断题': return state.correctAnswer;
            case '简答题': return state.shortAnswer;
            default: return null;
        }
    });

    // 处理保存
    const handleSave = () => {
        const state = useOpeQuestionStore.getState();
        const newQuestion = {
            questionId: state.questionId,
            content: state.questionContent,
            body: getQuestionBody,
            analysis: state.questionAnalysis,
            tags: state.questionTags,
            lastModified: new Date().toISOString(),
        };

        updateQuestion(newQuestion);

        navigation.goBack();
    };

    return (
        <Button style={styles.endButton} onPress={() => handleSave()} disabled={isSaveDisabled}>
            <Text style={styles.endButtonText}>保存</Text>
        </Button>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F0F0F0',
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    endButton: {
        borderRadius: 4,
        padding: 12,
        alignItems: 'center',
        marginTop: 16,
        // backgroundColor: '#3366FF',
    },
    endButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
    },
    editorContainer: {
        marginBottom: 20,
    },
    hidden: {
        display: 'none',
        height: 0, // 确保不占用布局空间
        margin: 0,
        padding: 0,
    },
});

export default OpeQuestion;
